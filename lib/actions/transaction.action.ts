"use server";

import { redirect } from "next/navigation";
import {
  lemonSqueezySetup,
  createCheckout,
  listOrders,
} from "@lemonsqueezy/lemonsqueezy.js";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import Transaction from "../database/models/transaction.model";
import PendingOrder from "../database/models/pending-order.model";
import { updateCredits } from "./user.actions";

// Map plan names to Lemon Squeezy variant IDs
function getVariantId(plan: string): string {
  const variants: Record<string, string> = {
    "Pro Package": process.env.LEMONSQUEEZY_PRO_VARIANT_ID!,
    "Premium Package": process.env.LEMONSQUEEZY_PREMIUM_VARIANT_ID!,
  };
  return variants[plan] || "";
}

function setupLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) {
    throw new Error("LEMONSQUEEZY_API_KEY is not set");
  }
  lemonSqueezySetup({ apiKey });
}

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  setupLemonSqueezy();

  const variantId = getVariantId(transaction.plan);

  if (!variantId) {
    throw new Error(`No variant found for plan: ${transaction.plan}`);
  }

  const storeId = Number(process.env.LEMONSQUEEZY_STORE_ID!);

  console.log("Creating checkout:", {
    storeId,
    variantId,
    plan: transaction.plan,
    credits: transaction.credits,
    buyerId: transaction.buyerId,
  });

  // Save a pending order record before creating checkout
  try {
    await connectToDatabase();
    await PendingOrder.create({
      buyerId: transaction.buyerId,
      plan: transaction.plan,
      credits: transaction.credits,
      amount: transaction.amount,
      variantId,
      status: "pending",
    });
    console.log("Pending order saved for buyer:", transaction.buyerId);
  } catch (err) {
    console.error("Error saving pending order (non-critical):", err);
  }

  const { data, error } = await createCheckout(storeId, variantId, {
    checkoutData: {
      custom: {
        plan: transaction.plan,
        credits: String(transaction.credits),
        buyer_id: transaction.buyerId,
      },
    },
    productOptions: {
      redirectUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard?success=true`,
    },
  });

  if (error) {
    console.error("Lemon Squeezy checkout error:", JSON.stringify(error));
    throw new Error(`Lemon Squeezy checkout error: ${JSON.stringify(error)}`);
  }

  const checkoutUrl = data?.data?.attributes?.url;
  if (!checkoutUrl) {
    console.error("No checkout URL in response:", JSON.stringify(data));
    throw new Error("Failed to create checkout URL");
  }

  console.log("Checkout URL created, redirecting...");
  redirect(checkoutUrl);
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    console.log(
      "Creating transaction for buyerId:",
      transaction.buyerId,
      "credits:",
      transaction.credits
    );

    // Create a new transaction with a buyerId
    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    });

    console.log("Transaction created, now updating credits...");
    await updateCredits(transaction.buyerId, transaction.credits);
    console.log(
      "Credits updated successfully for buyerId:",
      transaction.buyerId
    );

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error: any) {
    // Handle duplicate key error (order already processed)
    if (error?.code === 11000) {
      console.log("Transaction already exists (duplicate), skipping...");
      return null;
    }
    console.error("Error creating transaction:", error);
    throw error;
  }
}

/**
 * Sync credits by calling our sync-credits API endpoint.
 * This is a fallback when webhooks don't fire (e.g., during development).
 * Called from the client after redirect from successful checkout.
 */
export async function syncCredits(buyerId: string) {
  try {
    console.log("=== syncCredits called for buyerId:", buyerId, "===");

    await connectToDatabase();

    // Check for pending orders for this buyer
    const pendingOrders = await PendingOrder.find({
      buyerId,
      status: "pending",
    }).sort({ createdAt: -1 });

    if (!pendingOrders || pendingOrders.length === 0) {
      console.log("No pending orders found for buyer:", buyerId);
      return { success: true, message: "No pending orders", creditsAdded: 0 };
    }

    console.log("Found", pendingOrders.length, "pending orders");

    // Use Lemon Squeezy API to check for completed orders
    setupLemonSqueezy();

    const storeId = Number(process.env.LEMONSQUEEZY_STORE_ID!);
    const { data: ordersData, error } = await listOrders({
      filter: { storeId },
    });

    if (error) {
      console.error("Error listing LS orders:", JSON.stringify(error));
      return {
        success: false,
        message: "Failed to fetch orders from Lemon Squeezy",
        creditsAdded: 0,
      };
    }

    const orders = ordersData?.data || [];
    console.log("LS orders count:", orders.length);

    // Debug: log all order details
    for (const order of orders) {
      const item = order.attributes?.first_order_item as any;
      console.log(
        `LS Order id=${order.id} status=${order.attributes?.status} variant=${item?.variant_id} total=${order.attributes?.total} test=${order.attributes?.test_mode}`
      );
    }

    let creditsAdded = 0;

    // Find unprocessed paid orders and match with pending orders
    for (const order of orders) {
      const orderId = String(order.id);
      const orderStatus = order.attributes?.status;

      if (orderStatus !== "paid") continue;

      // Check if already processed
      const existingTx = await Transaction.findOne({
        lemonSqueezyId: orderId,
      });
      if (existingTx) continue;

      // Get variant info
      const firstItem = order.attributes?.first_order_item as any;
      const orderVariantId = String(firstItem?.variant_id || "");

      console.log(
        `Unprocessed paid order: ${orderId}, variant: ${orderVariantId}`
      );

      // Method 1: Match by variant ID with pending orders
      for (const pending of pendingOrders) {
        if (pending.status !== "pending") continue;

        const pendingVariant = String(pending.variantId);
        console.log(
          `Comparing: order variant "${orderVariantId}" vs pending "${pendingVariant}"`
        );

        if (pendingVariant === orderVariantId) {
          console.log(`MATCH! Credits: ${pending.credits}`);
          try {
            await createTransaction({
              lemonSqueezyId: orderId,
              amount: order.attributes?.total
                ? order.attributes.total / 100
                : pending.amount,
              plan: pending.plan,
              credits: pending.credits,
              buyerId: pending.buyerId,
              createdAt: new Date(),
            });

            pending.status = "completed";
            pending.lemonSqueezyOrderId = orderId;
            await pending.save();

            creditsAdded += pending.credits;
            break;
          } catch (txErr: any) {
            if (txErr?.code === 11000) {
              pending.status = "completed";
              await pending.save();
            } else {
              console.error("Error creating transaction:", txErr?.message);
            }
          }
        }
      }

      // Method 2: If no match by stored variant, try matching by env variant IDs
      if (creditsAdded === 0) {
        const proVariant = process.env.LEMONSQUEEZY_PRO_VARIANT_ID;
        const premiumVariant = process.env.LEMONSQUEEZY_PREMIUM_VARIANT_ID;

        let matchPending = null;
        if (orderVariantId === proVariant) {
          matchPending = pendingOrders.find(
            (p: any) => p.status === "pending" && p.plan === "Pro Package"
          );
        } else if (orderVariantId === premiumVariant) {
          matchPending = pendingOrders.find(
            (p: any) => p.status === "pending" && p.plan === "Premium Package"
          );
        }

        if (matchPending) {
          console.log(`Env variant match! Credits: ${matchPending.credits}`);
          try {
            await createTransaction({
              lemonSqueezyId: orderId,
              amount: order.attributes?.total
                ? order.attributes.total / 100
                : matchPending.amount,
              plan: matchPending.plan,
              credits: matchPending.credits,
              buyerId: matchPending.buyerId,
              createdAt: new Date(),
            });

            matchPending.status = "completed";
            matchPending.lemonSqueezyOrderId = orderId;
            await matchPending.save();

            creditsAdded += matchPending.credits;
          } catch (txErr: any) {
            if (txErr?.code === 11000) {
              matchPending.status = "completed";
              await matchPending.save();
            }
          }
        }
      }

      if (creditsAdded > 0) break; // Found and processed an order
    }

    console.log("syncCredits completed. Credits added:", creditsAdded);
    return {
      success: true,
      creditsAdded,
      message:
        creditsAdded > 0
          ? `Added ${creditsAdded} credits`
          : "No new credits to add",
    };
  } catch (error) {
    console.error("Error in syncCredits:", error);
    return { success: false, message: "Error syncing credits", creditsAdded: 0 };
  }
}