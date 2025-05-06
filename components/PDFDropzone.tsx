'use client';
import React, { useCallback } from 'react';
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
} from '@dnd-kit/core';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useSchematicEntitlement } from '@schematichq/schematic-react';
import { uploadFiles } from '@/actions/uploadFiles';
import { AlertCircle, CheckCircle, CloudUpload } from 'lucide-react';
import { Button } from '@/components/ui/button';

function PDFDropzone() {
    const [isDraggingOver, setIsDraggingOver] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);
    const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const sensors = useSensors(useSensor(PointerSensor));
    const { user, isSignedIn: isUserSignedIn } = useUser();
    const router = useRouter();

    const {
        value: isFeatureEnabled,
        featureUsageExceeded,
        featureAllocation,
    } = useSchematicEntitlement('scans');

    const canUpload = isUserSignedIn && isFeatureEnabled;

    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            if (!canUpload) {
                return;
            }
            event.preventDefault();
            setIsDraggingOver(true);
        },
        [canUpload]
    );

    const handleDragLeave = useCallback(() => {
        if (!canUpload) {
            return;
        }
        setIsDraggingOver(false);
    }, [canUpload]);

    const handleUpload = useCallback(
        async (files: FileList) => {
            if (!canUpload) {
                return;
            }

            if (!user) {
                alert('Please sign in to upload files.');
                return;
            }

            const fileArray = Array.from(files);
            const pdfFiles = fileArray.filter(
                (file) => file.type === 'application/pdf'
            );
            if (pdfFiles.length === 0) {
                alert('Please upload only PDF files.');
                return;
            }

            setIsUploading(true);

            try {
                const uploadedFilesNames: string[] = [];
                for (const file of pdfFiles) {
                    const formData = new FormData();
                    formData.append('file', file);

                    const result = await uploadFiles(formData);
                    if (!result.success) {
                        alert(
                            `Error uploading file ${file.name}: ${result.error}`
                        );
                        return;
                    }
                    uploadedFilesNames.push(result!.data!.fileName);
                }
                //add the uploaded files to the state
                setUploadedFiles((prev) => [...prev, ...uploadedFilesNames]);
                // clear the uploaded files after 5 seconds
                setTimeout(() => setUploadedFiles([]), 5000);
                router.push('/receipts');
            } catch (error) {
                console.error('Error uploading files:', error);
                alert(
                    `Error uploading files, error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`
                );
            } finally {
                setIsUploading(false);
            }
        },
        [user, canUpload, router]
    );

    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDraggingOver(false);

            const files = event.dataTransfer.files;
            if (files?.length > 0) {
                handleUpload(files);
            }
        },
        [handleUpload]
    );

    const handleFileInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!canUpload) {
                return;
            }
            if (!user) {
                alert('Please sign in to upload files.');
                return;
            }
            event.preventDefault();
            const files = event.target.files;
            if (files && files.length > 0) {
                handleUpload(files);
            }
        },
        [canUpload, user, handleUpload]
    );

    console.log('uploadFiles: ', uploadedFiles);

    return (
        <DndContext sensors={sensors}>
            <div className="w-full max-w-md mx-auto">
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
                        isDraggingOver ? 'border-blue-500 bg-blue-50' : ''
                    } ${canUpload ? '' : 'opacity-70 cursor-not-allowed'}`}
                >
                    {isUploading ? (
                        <div className="flex items-center flex-col">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                            <span className="ml-2">Uploading...</span>
                        </div>
                    ) : !isUserSignedIn ? (
                        <>
                            <CloudUpload className="w-12 h-12 mx-auto text-gray-400" />
                            <p className="text-lg font-semibold">
                                Please sign in to upload files
                            </p>
                        </>
                    ) : (
                        <div className="text-center">
                            <CloudUpload className="w-12 h-12 mx-auto text-gray-400" />
                            <p className="text-lg font-semibold">
                                Drag and drop your PDF files here, or click to
                                select a files
                            </p>
                            <input
                                type="file"
                                accept="application/pdf"
                                multiple
                                onChange={handleFileInputChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                            <Button
                                onClick={() => {
                                    if (fileInputRef.current) {
                                        fileInputRef.current.click();
                                    }
                                }}
                                disabled={!canUpload}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded 
                                            hover:bg-blue-600 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isFeatureEnabled
                                    ? 'Select files'
                                    : 'Upgrade to upload'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {featureUsageExceeded ? (
                <div className="mt-4">
                    <div className="flex items-center p-3 border border-red-200 rounded-md bg-red-50 text-red-600">
                        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                        <span className="text-sm">
                            You have exceeded your limit of {featureAllocation}{' '}
                            scans. Please upgrade to continue.
                        </span>
                    </div>
                </div>
            ) : null}

            {uploadedFiles.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-medium">Uploaded Files:</h3>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                        {uploadedFiles.map((fileName, index) => (
                            <li key={index} className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                {fileName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </DndContext>
    );
}

export default PDFDropzone;
