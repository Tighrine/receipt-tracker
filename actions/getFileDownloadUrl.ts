import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import convex from "@/lib/convexClient";


export const getFileDownloadUrl = async (fileId: Id<"_storage">) => {
    try {
        const downloadUrl = await convex.query(api.receipts.getReceiptDownloadUrl, { fileId });
        if (!downloadUrl) {
            throw new Error("Failed to get file download URL");
        }
        return { success: true, downloadUrl };
    } catch (error) {
        console.error('Error getting file download URL:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
        
    }
}