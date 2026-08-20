"use client";

import {
    ChangeEvent,
    DragEvent,
    useRef,
    useState,
} from "react";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export default function PdfToWordTool() {
    const [file, setFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const selectFile = (selectedFile: File) => {
        setError("");

        if (selectedFile.type !== "application/pdf") {
            setError("Please select a PDF file.");
            return;
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setError("The PDF file must be smaller than 50 MB.");
            return;
        }

        setFile(selectedFile);
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
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const convertToWord = async () => {
        if (!file) {
            setError("Please select a PDF file first.");
            return;
        }

        setError("");
        setIsConverting(true);

        try {
            const formData = new FormData();

            formData.append("file", file);

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL ||
                "http://localhost:5000";

            const response = await fetch(
                `${apiUrl}/api/pdf-to-word`,
                {
                    method: "POST",
                    body: formData,
                },
            );

            if (!response.ok) {
                let message =
                    "PDF to Word conversion failed.";

                try {
                    const data = await response.json();

                    if (
                        data &&
                        typeof data.message === "string"
                    ) {
                        message = data.message;
                    }
                } catch {
                    // Backend returned a non-JSON error.
                }

                throw new Error(message);
            }

            const blob = await response.blob();

            if (blob.size === 0) {
                throw new Error(
                    "The backend returned an empty Word file.",
                );
            }

            const url = URL.createObjectURL(blob);

            const link =
                window.document.createElement("a");

            link.href = url;
            link.download = "converted-document.docx";

            window.document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);
        } catch (conversionError) {
            console.error(
                "PDF to Word conversion error:",
                conversionError,
            );

            if (conversionError instanceof TypeError) {
                setError(
                    "Could not connect to the PDF conversion server. Make sure the backend is running.",
                );
            } else if (conversionError instanceof Error) {
                setError(conversionError.message);
            } else {
                setError(
                    "Something went wrong during conversion. Please try again.",
                );
            }
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="space-y-8">
            {!file && (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition hover:border-blue-400"
                >
                    <div className="mx-auto max-w-xl">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                            📄
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            Upload a PDF
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Drag and drop your PDF here, or
                            choose a file from your device.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                            disabled={isConverting}
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

            {error && (
                <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            {file && (
                <>
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 items-center gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-50 text-2xl">
                                    📄
                                </div>

                                <div className="min-w-0">
                                    <h2
                                        className="truncate text-lg font-semibold text-gray-900"
                                        title={file.name}
                                    >
                                        {file.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        PDF ·{" "}
                                        {formatFileSize(
                                            file.size,
                                        )}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={clearFile}
                                disabled={isConverting}
                                className="text-sm font-medium text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Choose another PDF
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                        <div className="flex items-start gap-4">
                            <div className="text-2xl">
                                📝
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Convert PDF to Word
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Your PDF will be sent to the
                                    conversion server and returned
                                    as a Microsoft Word document.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={convertToWord}
                            disabled={isConverting}
                            className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
                        >
                            {isConverting
                                ? "Converting PDF..."
                                : "Convert to Word"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}