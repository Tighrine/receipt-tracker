import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import convex from '@/lib/convexClient';
import { client } from '@/lib/schematic';
import { createAgent, createTool } from '@inngest/agent-kit';
import { openai } from 'inngest';
import { z } from 'zod';

const saveToDatabaseTool = createTool({
    name: 'Save to Database',
    description: 'Saves the given data to convex database.',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    parameters: z.object({
        fileDisplayName: z
            .string()
            .describe(
                'The readable display name of the receipt to show on the UI. If the file name is not' +
                    'human readable, use this to give more readable name.'
            ),
        receiptId: z.string().describe('The ID of the receipt to update.'),
        // Fields for extracted data
        merchantName: z.string(),
        merchantAddress: z.string(),
        merchantContact: z.string(),
        transactionDate: z.number(),
        transactionAmount: z
            .string()
            .describe(
                'The total amount of the transaction, summing all the items on the receipt.'
            ),
        currency: z.string(),
        receiptSummary: z
            .string()
            .describe(
                `A summary of the receipt, including the merchant name, address, contact, transaction date, amount and currency. 
                Include a human readable summary of the receipt. Mention both invoice and receipt number if both are present.
                Include some key details about the items on the receipt, this is a special featured summary so it should include some key 
                details about the items on the receipt with some context.`
            ),
        items: z.array(
            z.object({
                name: z.string(),
                quantity: z.number(),
                unitPrice: z.number(),
                totalPrice: z.number(),
            })
            .describe(`An array of items on the receipt. Each item should include the name, quantity, unit price and total price.`)
        ),
    }),
    handler: async (params, context) => {
        const { 
            fileDisplayName,
            receiptId,
            merchantName,
            merchantAddress,
            merchantContact,
            transactionDate,
            transactionAmount,
            currency,
            receiptSummary,
            items,
         } = params;
         const result = await context.step?.run(
            "save-receipt-to-database",
            async () => {
                try {
                    const { userId } = await convex.mutation(
                        api.receipts.updateReceiptWithExtractedData,
                        {
                            id: receiptId as Id<'receipts'>,
                            fileDisplayName,
                            merchantName,
                            merchantAddress,
                            merchantContact,
                            transactionDate,
                            transactionAmount,
                            currency,
                            receiptSummary,
                            items,
                        },
                    );

                    await client.track({
                        event: 'scan',
                        company: {
                            id: userId,
                        },
                        user: {
                            id: userId,
                        }
                    });

                    return {
                        addToDatabase: "Success",
                        receiptId,
                        fileDisplayName,
                        merchantName,
                        merchantAddress,
                        merchantContact,
                        transactionDate,
                        transactionAmount,
                        currency,
                        receiptSummary,
                        items,
                    }
                } catch (error) {
                    console.error("Error saving receipt to database:", error);
                    return {
                        addToDatabase: "Error",
                        error: error instanceof Error ? error.message : "Unknown error",
                    };
                    
                }
            }
         );

         if(result?.addToDatabase === "Success") {
            context.network.state.kv.set('saved-to-database', true);
            context.network.state.kv.set('receipt', receiptId);
         }

         return result;
    },
});

export const databaseAgent = createAgent({
    name: 'Database Agent',
    description:
        'responsible for taking key information regarding receipts and sazing it to the conzex database.',
    system: 'You are a helpful assistant that takes key information regarding receipts and sazes it to the conzex database.',
    model: openai({
        model: 'gpt-4o-mini',
        defaultParameters: {
            max_completion_tokens: 1000,
        },
    }),
    tools: [saveToDatabaseTool],
});
