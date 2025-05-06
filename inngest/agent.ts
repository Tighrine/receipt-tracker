import {
    anthropic,
    createNetwork,
    getDefaultRoutingAgent,
} from '@inngest/agent-kit';
import { createServer } from '@inngest/agent-kit/server';
import { inngest } from './client';
import { events } from './constants';

const agentNetwork = createNetwork({
    name: 'Receipt Agent',
    agents: [database, receiptScanner],
    defaultModel: anthropic({
        model: 'claude-3-5-sonnet-latest',
        defaultParameters: {
            max_tokens: 1000,
        },
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
    agents: [database, receiptScanner],
    networks: [agentNetwork],
});

export const extractAndSaveReceipt = inngest.createFunction(
    {
        id: 'Extract and Save Receipt',
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
