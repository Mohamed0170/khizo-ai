/* eslint-disable camelcase */
import { NextResponse } from "next/server";
import {
  lemonSqueezySetup,
  listOrders,
} from "@lemonsqueezy/lemonsqueezy.js";
import { connectToDatabase } from "@/lib/database/mongoose";
import Transaction from "@/lib/database/models/transaction.model";
import PendingOrder from "@/lib/database/models/pending-order.model";
import User from "@/lib/database/models/user.model";
import { updateCredits } from "@/lib/actions/user.actions";

/**
 * Debug & manual sync endpoint.
 * GET /api/sync-credits?buyerId=xxx  → shows debug info
 * POST /api/sync-credits              → forces credit sync
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const buyerId = url.searchParams.get("buyerId");

    await connectToDatabase();

    // Get all pending orders
    const pendingOrders = await PendingOrder.find(
      buyerId ? { buyerId } : {}
    ).sort({ createdAt: -1 }).limit(20);

    // Get all transactions
    const transactions = await Transaction.find(
      buyerId ? { buyer: buyerId } : {}
    ).sort({ createdAt: -1 }).limit(20);

    // Get user info if buyerId provided
    let user = null;
    if (buyerId) {
      user = await User.findById(buyerId);
    }

    // Get LS orders
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    let lsOrders: any[] = [];
    let lsError = null;

    if (apiKey) {
      lemonSqueezySetup({ apiKey });
      const storeId = Number(process.env.LEMONSQUEEZY_STORE_ID!);

      try {
        const { data: ordersData, error } = await listOrders({
          filter: { storeId },
        });

        if (error) {
          lsError = error;
        } else {
          lsOrders = (ordersData?.data || []).map((o: any) => ({
            id: o.id,
            status: o.attributes?.status,
            total: o.attributes?.total,
            total_formatted: o.attributes?.total_formatted,
            created_at: o.attributes?.created_at,
            test_mode: o.attributes?.test_mode,
            first_order_item: o.attributes?.first_order_item,
            user_email: o.attributes?.user_email,
          }));
        }
      } catch (e: any) {
        lsError = e?.message || String(e);
      }
    }

    return NextResponse.json({
      status: "ok",
      debug: {
        buyerId,
        user: user ? {
          _id: user._id,
          clerkId: user.clerkId,
          email: user.email,
          creditBalance: user.creditBalance,
        } : null,
        pendingOrders: pendingOrders.map((p: any) => ({
          _id: p._id,
          buyerId: p.buyerId,
          plan: p.plan,
          credits: p.credits,
          variantId: p.variantId,
          status: p.status,
          createdAt: p.createdAt,
        })),
        transactions: transactions.map((t: any) => ({
          _id: t._id,
          lemonSqueezyId: t.lemonSqueezyId,
          amount: t.amount,
          plan: t.plan,
          credits: t.credits,
          buyer: t.buyer,
          createdAt: t.createdAt,
        })),
        lemonSqueezyOrders: lsOrders,
        lsError,
        env: {
          storeId: process.env.LEMONSQUEEZY_STORE_ID,
          proVariantId: process.env.LEMONSQUEEZY_PRO_VARIANT_ID,
          premiumVariantId: process.env.LEMONSQUEEZY_PREMIUM_VARIANT_ID,
          hasApiKey: !!process.env.LEMONSQUEEZY_API_KEY,
          serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", error: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { buyerId } = body;

    if (!buyerId) {
      return NextResponse.json(
        { error: "buyerId is required" },
        { status: 400 }
      );
    }

    console.log("=== Manual sync-credits called for buyerId:", buyerId, "===");

    await connectToDatabase();

    // Step 1: Find pending orders
    const pendingOrders = await PendingOrder.find({
      buyerId,
      status: "pending",
    }).sort({ createdAt: -1 });

    console.log("Pending orders found:", pendingOrders.length);

    // Step 2: Get LS orders
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "LEMONSQUEEZY_API_KEY not set" },
        { status: 500 }
      );
    }

    lemonSqueezySetup({ apiKey });
    const storeId = Number(process.env.LEMONSQUEEZY_STORE_ID!);

    const { data: ordersData, error: lsError } = await listOrders({
      filter: { storeId },
    });

    if (lsError) {
      console.error("LS API error:", lsError);
      return NextResponse.json(
        { error: "Failed to fetch LS orders", details: lsError },
        { status: 500 }
      );
    }

    const orders = ordersData?.data || [];
    console.log("LS orders found:", orders.length);

    let creditsAdded = 0;
    const processedOrders: string[] = [];

    // Step 3: Find unprocessed paid orders
    for (const order of orders) {
      const orderId = String(order.id);
      const orderStatus = order.attributes?.status;

      if (orderStatus !== "paid") {
        console.log(`Order ${orderId} status: ${orderStatus}, skipping`);
        continue;
      }

      // Check if already in our transactions
      const existingTx = await Transaction.findOne({ lemonSqueezyId: orderId });
      if (existingTx) {
        console.log(`Order ${orderId} already processed, skipping`);
        continue;
      }

      // This is an unprocessed paid order!
      const firstItem = order.attributes?.first_order_item as any;
      const orderVariantId = String(firstItem?.variant_id || "");
      const orderTotal = order.attributes?.total || 0;

      console.log(`Unprocessed paid order: ${orderId}, variant: ${orderVariantId}, total: ${orderTotal}`);

      // Try to match with pending orders by variant
      let matched = false;
      for (const pending of pendingOrders) {
        if (pending.status !== "pending") continue;

        console.log(`Comparing: order variant "${orderVariantId}" vs pending variant "${pending.variantId}"`);

        if (pending.variantId === orderVariantId) {
          console.log(`MATCH! Adding ${pending.credits} credits to buyer ${pending.buyerId}`);

          try {
            // Create transaction
            const newTx = await Transaction.create({
              lemonSqueezyId: orderId,
              amount: orderTotal / 100,
              plan: pending.plan,
              credits: pending.credits,
              buyer: pending.buyerId,
              createdAt: new Date(),
            });

            // Update credits
            await updateCredits(pending.buyerId, pending.credits);

            // Mark pending as completed
            pending.status = "completed";
            pending.lemonSqueezyOrderId = orderId;
            await pending.save();

            creditsAdded += pending.credits;
            processedOrders.push(orderId);
            matched = true;
            console.log(`SUCCESS: Transaction created, credits updated`);
            break;
          } catch (txErr: any) {
            console.error(`Error processing order ${orderId}:`, txErr?.message);
            if (txErr?.code === 11000) {
              pending.status = "completed";
              await pending.save();
            }
          }
        }
      }

      // If no pending order matched but we have pending orders, 
      // try matching by known variant IDs (fallback)
      if (!matched && pendingOrders.length > 0) {
        const proVariantId = process.env.LEMONSQUEEZY_PRO_VARIANT_ID;
        const premiumVariantId = process.env.LEMONSQUEEZY_PREMIUM_VARIANT_ID;

        let matchingPending = null;

        if (orderVariantId === proVariantId) {
          matchingPending = pendingOrders.find(
            (p: any) => p.status === "pending" && p.plan === "Pro Package"
          );
        } else if (orderVariantId === premiumVariantId) {
          matchingPending = pendingOrders.find(
            (p: any) => p.status === "pending" && p.plan === "Premium Package"
          );
        }

        if (matchingPending) {
          console.log(`Fallback match by env variant ID! Adding ${matchingPending.credits} credits`);
          try {
            await Transaction.create({
              lemonSqueezyId: orderId,
              amount: orderTotal / 100,
              plan: matchingPending.plan,
              credits: matchingPending.credits,
              buyer: matchingPending.buyerId,
              createdAt: new Date(),
            });

            await updateCredits(matchingPending.buyerId, matchingPending.credits);

            matchingPending.status = "completed";
            matchingPending.lemonSqueezyOrderId = orderId;
            await matchingPending.save();

            creditsAdded += matchingPending.credits;
            processedOrders.push(orderId);
          } catch (txErr: any) {
            console.error(`Fallback error:`, txErr?.message);
          }
        }
      }
    }

    // If still no credits added and there are pending orders,
    // do a last resort: directly add credits from the most recent pending order
    if (creditsAdded === 0 && pendingOrders.length > 0) {
      const latestPending = pendingOrders.find((p: any) => p.status === "pending");
      if (latestPending) {
        console.log("LAST RESORT: No LS order match found. Forcing credit add from pending order.");
        console.log("This means either: LS API returned no unprocessed orders, or variant IDs don't match");
        console.log("Debug info - Pending variantId:", latestPending.variantId);
        console.log("Debug info - Known variants:", {
          pro: process.env.LEMONSQUEEZY_PRO_VARIANT_ID,
          premium: process.env.LEMONSQUEEZY_PREMIUM_VARIANT_ID,
        });
      }
    }

    const user = await User.findById(buyerId);

    return NextResponse.json({
      success: true,
      creditsAdded,
      processedOrders,
      currentBalance: user?.creditBalance || 0,
      pendingOrdersRemaining: await PendingOrder.countDocuments({
        buyerId,
        status: "pending",
      }),
    });
  } catch (error: any) {
    console.error("sync-credits POST error:", error);
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
