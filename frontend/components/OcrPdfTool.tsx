"use client";

import {
    ChangeEvent,
    DragEvent,
    useRef,
    useState,
} from "react";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function OcrPdfTool() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (selectedFile: File) => {
        if (selectedFile.type !== "application/pdf") {
            throw new Error("Please select a PDF file.");
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            throw new Error("The PDF file must be smaller than 50 MB.");
        }
    };

    const selectFile = (selectedFile: File) => {
        try {
            validateFile(selectedFile);

            setFile(selectedFile);
            setError("");
            setSuccess("");
        } catch (fileError) {
            setFile(null);

            if (fileError instanceof Error) {
                setError(fileError.message);
            } else {
                setError("Could not select the PDF file.");
            }
        }
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            selectFile(selectedFile);
        }

        event.target.value = "";
    };

    const handleDrop = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();

        const droppedFile = event.dataTransfer.files?.[0];

        if (droppedFile) {
            selectFile(droppedFile);
        }
    };

    const handleDragOver = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
    };

    const clearFile = () => {
        setFile(null);
        setError("");
        setSuccess("");
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const processPdf = async () => {
        if (!file) {
            setError("Please select a PDF file first.");
            return;
        }

        setError("");
        setSuccess("");
        setIsProcessing(true);

        try {
            const formData = new FormData();

            formData.append("file", file);

            const response = await fetch(
                `${API_URL}/api/ocr-pdf`,
                {
                    method: "POST",
                    body: formData,
                },
            );

            if (!response.ok) {
                let message =
                    "OCR processing failed. Please try again.";

                try {
                    const data = await response.json();

                    if (data?.message) {
                        message = data.message;
                    }
                } catch {
                    // Response wasn't JSON.
                }

                throw new Error(message);
            }

            const blob = await response.blob();

            if (blob.size === 0) {
                throw new Error(
                    "The backend returned an empty PDF.",
                );
            }

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "ocr-pdf.pdf";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);

            setSuccess(
                "OCR completed successfully. Your searchable PDF has been downloaded.",
            );
        } catch (processingError) {
            console.error("OCR PDF error:", processingError);

            if (processingError instanceof Error) {
                setError(processingError.message);
            } else {
                setError(
                    "Something went wrong while processing the PDF.",
                );
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Upload */}
            {!file && (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition hover:border-blue-400"
                >
                    <div className="mx-auto max-w-xl">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                            🔎
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            Upload a PDF
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Drag and drop your PDF here, or choose a
                            file from your device.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                            disabled={isProcessing}
                            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Choose PDF
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        <p className="mt-4 text-xs text-gray-400">
                            PDF files · Maximum 50 MB
                        </p>
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            {/* Success */}
            {success && (
                <div
                    role="status"
                    className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                    {success}
                </div>
            )}

            {/* Selected PDF */}
            {file && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-50 text-2xl">
                                📄
                            </div>

                            <div className="min-w-0">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    PDF selected
                                </h2>

                                <p
                                    className="mt-1 truncate text-sm text-gray-500"
                                    title={file.name}
                                >
                                    {file.name}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={clearFile}
                            disabled={isProcessing}
                            className="text-sm font-medium text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Choose another PDF
                        </button>
                    </div>

                    {/* Info */}
                    <div className="mt-6 rounded-xl bg-gray-50 p-5">
                        <h3 className="font-semibold text-gray-900">
                            What OCR does
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            OCR analyzes text inside scanned PDF pages
                            and creates a searchable PDF that you can
                            search, copy, and select.
                        </p>
                    </div>

                    {/* Processing */}
                    {isProcessing && (
                        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />

                                <div>
                                    <p className="text-sm font-semibold text-blue-900">
                                        Processing PDF...
                                    </p>

                                    <p className="mt-1 text-xs text-blue-700">
                                        OCR may take some time for large
                                        or multi-page documents.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Process Button */}
            {file && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={processPdf}
                        disabled={isProcessing}
                        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-72"
                    >
                        {isProcessing
                            ? "Creating Searchable PDF..."
                            : "OCR PDF"}
                    </button>
                </div>
            )}
        </div>
    );
}