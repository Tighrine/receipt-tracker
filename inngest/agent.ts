import {
    createNetwork,
    gemini,
    getDefaultRoutingAgent,
} from '@inngest/agent-kit';
import { createServer } from '@inngest/agent-kit/server';
import { inngest } from './client';
import { events } from './constants';
import { databaseAgent } from './Agents/database';
import { receiptScanningAgent } from './Agents/receiptScanner';

const agentNetwork = createNetwork({
    name: 'Receipt Agent',
    agents: [databaseAgent, receiptScanningAgent],
    defaultModel: gemini({
        model: 'gemini-1.5-pro',
    }),

    defaultRouter: (ctx) => {
        const saveToDatabase = ctx.network.state.kv.get('saved-to-database');
        if (saveToDatabase) {
            return undefined;
        }

        return getDefaultRoutingAgent();
    },
});

export const receiptServer = createServer({
    agents: [databaseAgent, receiptScanningAgent],
    networks: [agentNetwork],
});

export const extractAndSaveReceipt = inngest.createFunction(
    {
        id: 'Extract and Save Receipt to database',
    },
    { event: events.EXTRACT_DATA_FROM_RECEIPT_AND_SAVE_TO_DATABASE },
    async ({ event }) => {
        const result = await agentNetwork.run(
            `Extract the key data from this pdf: ${event.data.pdfUrl}. Once you have the data, save it to the database with the
            receiptId: ${event.data.receiptId}. Once the receipt is successfully saved to the database, you can terminate the agent process.
            Start with the supervisor agent.`
        );

        return result.state.kv.get('receipt');
    }
);
