'use client';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './ui/table';
import { useRouter } from 'next/navigation';
import { ChevronRight, FileText } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';

const ReceiptList = () => {
    const { user } = useUser();
    const receipts = useQuery(api.receipts.getReceipts, {
        userId: user?.id ?? '',
    });
    const router = useRouter();

    if (!user) {
        return (
            <div className="w-full p-8 text-center">
                <p className="text-gray-600">
                    Please sign in to view your receipts
                </p>
            </div>
        );
    }

    if (!receipts) {
        return (
            <div className="flex items-center flex-col">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <span className="ml-2">Loading receipts...</span>
            </div>
        );
    }
    if (receipts.length === 0) {
        return (
            <div className="w-full text-center  p-8 border border-gray-200 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                    No receipts have been uploaded yet.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Your receipts</h2>
            <div className="bg-white overflow-hidden border border-gray-200 rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]"></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[40px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {receipts.map((receipt) => (
                            <TableRow
                                key={receipt._id}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() =>
                                    router.push(`/receipts/${receipt._id}`)
                                }
                            >
                                <TableCell className="w-[40px]">
                                    <FileText className="w-5 h-5 text-red-500" />
                                </TableCell>
                                <TableCell>{receipt.fileName}</TableCell>
                                <TableCell>
                                    {new Date(
                                        receipt.uploadedAt
                                    ).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {formatFileSize(receipt.size)}
                                </TableCell>
                                <TableCell>
                                    {receipt.transactionAmount
                                        ? `${receipt.transactionAmount} ${receipt.currency ?? ''}`
                                        : '-'}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            receipt.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : receipt.status === 'processed'
                                                  ? 'bg-green-100 text-green-800'
                                                  : receipt.status === 'error'
                                                    ? 'bg-red-100 text-red-800'
                                                    : ''
                                        }`}
                                    >
                                        {receipt.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            receipt.status.slice(1)}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ReceiptList;
