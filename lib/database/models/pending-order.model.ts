import { Schema, model, models } from "mongoose";

const PendingOrderSchema = new Schema({
  buyerId: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  variantId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  lemonSqueezyOrderId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-expire pending orders after 24 hours
PendingOrderSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const PendingOrder =
  (models.PendingOrder ||
    model("PendingOrder", PendingOrderSchema)) as any;

export default PendingOrder;
