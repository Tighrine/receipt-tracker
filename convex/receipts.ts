import { v } from 'convex/values';
import { query, mutation } from './_generated/server';

export const generateUploadUrl = mutation({
    args:{},
    handler: async ({ storage }) => {
        // Generate a URL for uploading a file to the storage bucket
        return await storage.generateUploadUrl();
    }
});

export const storeReceipt = mutation({
    args: {
        userId: v.string(),
        fileName: v.string(),
        fileId: v.id("_storage"),
        size: v.number(),
        mimeType: v.string(),
    },
    handler: async ({ db }, args) => {
        // Store the receipt metadata in the database
        return await db.insert("receipts", {
            ...args,
            uploadedAt: Date.now(),
            status: "pending",
            fileDisplayName: '',
            items: []
        });
    }
});

export const getReceipts = query({
    args: {
        userId: v.string(),
    },
    handler: async ({ db }, { userId }) => {
        // Fetch receipts for the given user
        return await db
                    .query("receipts")
                    .filter(q => q.eq(q.field("userId"), userId))
                    .order("desc")
                    .collect();
    }
});

export const getReceipt = query ({
    args: {
        id: v.id("receipts"),
    },
    handler: async ({ db, auth }, { id }) => {
        // Fetch a single receipt by ID
        const receipt = await db.get(id);

        if (!receipt) {
            throw new Error("Receipt not found");
        }

        const identity = await auth.getUserIdentity();
        if(!identity) {
            throw new Error("Not authenticated");
        }
        // Check if the receipt belongs to the authenticated user
        if (receipt.userId !== identity?.subject) {
            throw new Error("You do not have permission to access this receipt");
        }
    }
});

export const getReceiptDownloadUrl = query({
    args: {
        fileId: v.id("_storage"),
    },
    handler: async ({ storage }, { fileId }) => {
        // Generate a download URL for the receipt file
        return await storage.getUrl(fileId);
    }
});

export const updateReceiptStatus = mutation({
    args: {
        id: v.id("receipts"),
        status: v.union(v.literal("pending"), v.literal("processed"), v.literal("error")),
    },
    handler: async ({ db, auth }, { id, status }) => {
        // Fetch the receipt by ID
        const receipt = await db.get(id);
        if (!receipt) {
            throw new Error("Receipt not found");
        }
        // Check if the status is valid
        if (!["pending", "processed", "error"].includes(status)) {
            throw new Error("Invalid status");
        }
        // Check if the status is already set to the same value
        if (receipt.status === status) {
            return true;
        }

        const identity = await auth.getUserIdentity();
        if(!identity) {
            throw new Error("Not authenticated");
        }

        // Check if the receipt belongs to the authenticated user
        if (receipt.userId !== identity?.subject) {
            throw new Error("You do not have permission to access this receipt");
        }

        // Update the status of a receipt
        await db.patch(id, { status });
        return true;
    }
});

export const deleteReceipt = mutation({
    args: {
        id: v.id("receipts"),
    },
    handler: async ({ db, auth, storage }, { id }) => {
        // Fetch the receipt by ID
        const receipt = await db.get(id);
        if (!receipt) {
            throw new Error("Receipt not found");
        }

        const identity = await auth.getUserIdentity();
        if(!identity) {
            throw new Error("Not authenticated");
        }

        // Check if the receipt belongs to the authenticated user
        if (receipt.userId !== identity?.subject) {
            throw new Error("You do not have permission to access this receipt");
        }
        // Delete the file from the storage bucket
        await storage.delete(receipt.fileId);
        // Delete the receipt from the database
        await db.delete(id);
    }
});

export const updateReceiptWithExtractedData = mutation({
    args: {
        id: v.id("receipts"),
        fileDisplayName: v.optional(v.string()), 
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
            })
        ),
    },
    handler: async ({ db, auth }, args) => {
        // Fetch the receipt by ID
        const receipt = await db.get(args.id);
        if (!receipt) {
            throw new Error("Receipt not found");
        }
        const identity = await auth.getUserIdentity();
        if(!identity) {
            throw new Error("Not authenticated");
        }
        // Check if the receipt belongs to the authenticated user
        if (receipt.userId !== identity?.subject) {
            throw new Error("You do not have permission to access this receipt");
        }
        // Update the receipt with extracted data
        const { id, ...updateData } = args;
        await db.patch(id, {...updateData, status: "processed"});
        return { userId: receipt.userId };
    },
});