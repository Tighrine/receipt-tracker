import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  receipts: defineTable({
    userId: v.string(), // clerk user id
    fileName: v.string(),
    fileDisplayName: v.string(),
    fileId: v.id("_storage"),
    size: v.number(),
    mimeType: v.string(),
    uploadedAt: v.number(), // stock timestamp because we can't stock dates with convex
    status: v.union(v.literal("pending"), v.literal("processed"), v.literal("error")),

    // Fields for extracted data
    merchantName: v.optional(v.string()),
    merchantAddress: v.optional(v.string()),
    merchantContact: v.optional(v.string()),
    transactionDate: v.optional(v.number()),
    transactionAmount: v.optional(v.string()),
    currency: v.optional(v.string()),
    receiptSummary: v.optional(v.string()),
    items: v.array(
      v.object({
        name: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
        totalPrice: v.number(),
      })),
  }),
});
