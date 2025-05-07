'use server';

import { api } from "@/convex/_generated/api";
import { inngest } from "@/inngest/client";
import { events } from "@/inngest/constants";
import convex from "@/lib/convexClient";
import { currentUser } from "@clerk/nextjs/server";
import { getFileDownloadUrl } from "./getFileDownloadUrl";

export const uploadFiles = async (formData: FormData) => {
    const user = await currentUser();
    if (!user) {
        return { success: false, message: "Not Authenticated" };
    }

    try {
        const file = formData.get('file') as File;
        if (!file) {
            return { success: false, message: "No file provided" };
        }

        if(!file.type.includes('pdf') && !file.name.toLocaleLowerCase().endsWith('.pdf')) {
            return { success: false, message: "Only PDF files are allowed" };
        }
        // get the convex upload url
        const uploadUrl = await convex.mutation(api.receipts.generateUploadUrl, {});
        if (!uploadUrl) {
            return { success: false, message: "Failed to generate upload URL" };
        }
        // upload the file to convex
        const fileArrayBuffer = await file.arrayBuffer();
        const response = await fetch(uploadUrl, {
            method: "POST",
            headers: {
                "Content-Type": file.type,
            },
            body: new Uint8Array(fileArrayBuffer),
        });

        if(!response.ok) {
            return { success: false, message: `Failed to upload file: ${response.statusText}` };
        }

        const { storageId } = await response.json();
        const receiptId = await convex.mutation(api.receipts.storeReceipt, {
            userId: user.id,
            fileName: file.name,
            mimeType: file.type,
            fileId: storageId,
            size: file.size,
        });
        // get the convex download url for the file
        const fileUrl = await getFileDownloadUrl(storageId);

        //trigger inngest agent to process the file...
        await inngest.send({
            name: events.EXTRACT_DATA_FROM_RECEIPT_AND_SAVE_TO_DATABASE,
            data: {
                pdfUrl: fileUrl.downloadUrl,
                receiptId,
            }
        });

        return {
            success: true,
            data: {
                fileName: file.name,
                receiptId,
            }
        }

    } catch (error) {
        console.error('Error uploading files:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
        
    }

}