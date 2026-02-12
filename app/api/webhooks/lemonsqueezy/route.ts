/* eslint-disable camelcase */
import { createTransaction } from "@/lib/actions/transaction.action";
import { connectToDatabase } from "@/lib/database/mongoose";
import PendingOrder from "@/lib/database/models/pending-order.model";
import Transaction from "@/lib/database/models/transaction.model";
import { NextResponse } from "next/server";
import crypto from "crypto";

// GET endpoint for testing webhook reachability
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Lemon Squeezy webhook endpoint is reachable",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  console.log("=== LemonSqueezy Webhook Received ===");

  let rawBody: string;
  try {
    rawBody = await request.text();
    console.log("Webhook body length:", rawBody.length);
  } catch (err) {
    console.error("LemonSqueezy Webhook: Failed to read body", err);
    return NextResponse.json({ message: "Failed to read body" }, { status: 400 });
  }

  // Verify webhook signature
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("LemonSqueezy Webhook: LEMONSQUEEZY_WEBHOOK_SECRET not set!");
    // Still process to avoid losing orders - log warning
  }

  const signature =
    request.headers.get("x-signature") ||
    request.headers.get("X-Signature") ||
    request.headers.get("x-Signature");

  if (secret && signature) {
    const hmac = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (hmac !== signature) {
      console.error("LemonSqueezy Webhook: Signature mismatch!");
      console.error("Expected:", hmac.substring(0, 20) + "...");
      console.error("Received:", signature.substring(0, 20) + "...");
      // Return 200 to prevent retries with bad secret, but don't process
      return NextResponse.json({ message: "Invalid signature" }, { status: 200 });
    }
    console.log("Webhook signature verified ✓");
  } else {
    console.warn("Webhook: No signature or no secret - skipping verification");
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (err) {
    console.error("LemonSqueezy Webhook: Invalid JSON", err);
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const eventType = event?.meta?.event_name;
  console.log("Webhook event type:", eventType);
  console.log("Webhook meta:", JSON.stringify(event?.meta));

  if (eventType === "order_created") {
    try {
      const attributes = event.data?.attributes;
      const customData = event.meta?.custom_data;
      const orderId = String(event.data?.id || "");

      console.log("Order ID:", orderId);
      console.log("Custom data:", JSON.stringify(customData));
      console.log("Order status:", attributes?.status);
      console.log("Order total:", attributes?.total);

      // Handle both camelCase and snake_case keys
      const buyerId =
        customData?.buyer_id ||
        customData?.buyerId ||
        customData?.buyer__id ||
        "";
      const credits = Number(customData?.credits) || 0;
      const plan = customData?.plan || "";

      console.log("Parsed - buyerId:", buyerId, "credits:", credits, "plan:", plan);

      if (!buyerId) {
        console.error("No buyerId in custom_data. Full custom_data keys:", Object.keys(customData || {}));
        return NextResponse.json({ message: "No buyerId" }, { status: 200 });
      }

      if (!credits) {
        console.error("No credits in custom_data");
        return NextResponse.json({ message: "No credits" }, { status: 200 });
      }

      // Check if this order was already processed
      await connectToDatabase();
      const existingTransaction = await Transaction.findOne({ lemonSqueezyId: orderId });
      if (existingTransaction) {
        console.log("Order already processed, skipping:", orderId);
        return NextResponse.json({ message: "Already processed" }, { status: 200 });
      }

      const transaction = {
        lemonSqueezyId: orderId,
        amount: attributes?.total ? attributes.total / 100 : 0,
        plan,
        credits,
        buyerId,
        createdAt: new Date(),
      };

      console.log("Creating transaction:", JSON.stringify(transaction));
      const newTransaction = await createTransaction(transaction);
      console.log("Transaction created successfully!");

      // Mark any matching pending orders as completed
      try {
        await PendingOrder.updateMany(
          { buyerId, status: "pending" },
          { $set: { status: "completed", lemonSqueezyOrderId: orderId } }
        );
        console.log("Pending orders marked as completed");
      } catch (pendingErr) {
        console.error("Error updating pending orders (non-critical):", pendingErr);
      }

      return NextResponse.json({ message: "OK", transaction: newTransaction });
    } catch (err: any) {
      console.error("Error processing order_created:", err?.message || err);
      console.error("Full error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
      // Return 200 to acknowledge receipt even on error
      return NextResponse.json(
        { message: "Error processing", error: err?.message },
        { status: 200 }
      );
    }
  }

  console.log("Unhandled event type:", eventType);
  return NextResponse.json({ message: "Event received" }, { status: 200 });
}