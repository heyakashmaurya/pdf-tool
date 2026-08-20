"use client";

import {
    ChangeEvent,
    DragEvent,
    useRef,
    useState,
} from "react";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

type WordFile = {
    file: File;
};

export default function WordToPdfTool() {
    const [wordFile, setWordFile] =
        useState<WordFile | null>(null);

    const [isConverting, setIsConverting] =
        useState(false);

    const [error, setError] =
        useState("");

    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const isValidWordFile = (file: File) => {
        const extension = file.name
            .split(".")
            .pop()
            ?.toLowerCase();

        return (
            extension === "doc" ||
            extension === "docx"
        );
    };

    const loadWordFile = (file: File) => {
        setError("");

        if (!isValidWordFile(file)) {
            setWordFile(null);

            setError(
                "Please select a DOC or DOCX Word document.",
            );

            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setWordFile(null);

            setError(
                "The Word document must be smaller than 50 MB.",
            );

            return;
        }

        setWordFile({
            file,
        });
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const file =
            event.target.files?.[0];

        if (file) {
            loadWordFile(file);
        }

        event.target.value = "";
    };

    const handleDrop = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();

        const file =
            event.dataTransfer.files?.[0];

        if (file) {
            loadWordFile(file);
        }
    };

    const handleDragOver = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
    };

    const clearFile = () => {
        setWordFile(null);
        setError("");
    };

    const convertToPdf = async () => {
        if (!wordFile) {
            setError(
                "Please select a Word document first.",
            );

            return;
        }

        setError("");
        setIsConverting(true);

        try {
            const formData = new FormData();

            formData.append(
                "file",
                wordFile.file,
            );

            const response = await fetch(
                `${API_BASE_URL}/api/word-to-pdf`,
                {
                    method: "POST",
                    body: formData,
                },
            );

            if (!response.ok) {
                let message =
                    "Could not convert the Word document to PDF.";

                try {
                    const errorData =
                        await response.json();

                    if (
                        errorData &&
                        typeof errorData.message ===
                            "string"
                    ) {
                        message =
                            errorData.message;
                    }
                } catch {
                    // Backend may return a non-JSON error.
                }

                throw new Error(message);
            }

            const contentType =
                response.headers.get(
                    "content-type",
                );

            if (
                !contentType?.includes(
                    "application/pdf",
                )
            ) {
                throw new Error(
                    "The server did not return a PDF file.",
                );
            }

            const pdfBlob =
                await response.blob();

            if (pdfBlob.size === 0) {
                throw new Error(
                    "The generated PDF is empty.",
                );
            }

            const originalName =
                wordFile.file.name.replace(
                    /\.(docx?|DOCX?)$/,
                    "",
                );

            const downloadName =
                `${originalName}.pdf`;

            const downloadUrl =
                URL.createObjectURL(
                    pdfBlob,
                );

            const downloadLink =
                window.document.createElement(
                    "a",
                );

            downloadLink.href =
                downloadUrl;

            downloadLink.download =
                downloadName;

            window.document.body.appendChild(
                downloadLink,
            );

            downloadLink.click();

            window.document.body.removeChild(
                downloadLink,
            );

            URL.revokeObjectURL(
                downloadUrl,
            );
        } catch (conversionError) {
            console.error(
                "Word to PDF conversion error:",
                conversionError,
            );

            if (
                conversionError instanceof Error
            ) {
                setError(
                    conversionError.message,
                );
            } else {
                setError(
                    "Something went wrong while converting the Word document.",
                );
            }
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Upload */}
            {!wordFile && (
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
                            Upload a Word document
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Drag and drop a DOC or DOCX
                            file here, or choose a
                            file from your device.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                            disabled={
                                isConverting
                            }
                            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Choose Word File
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={
                                handleFileChange
                            }
                            className="hidden"
                        />

                        <p className="mt-4 text-xs text-gray-400">
                            DOC and DOCX files ·
                            Maximum 50 MB
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

            {/* Selected file */}
            {wordFile && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                                📝
                            </div>

                            <div className="min-w-0">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Word document
                                </h2>

                                <p
                                    className="mt-1 truncate text-sm text-gray-600"
                                    title={
                                        wordFile.file
                                            .name
                                    }
                                >
                                    {
                                        wordFile
                                            .file
                                            .name
                                    }
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {(
                                        wordFile
                                            .file
                                            .size /
                                        (1024 * 1024)
                                    ).toFixed(2)}{" "}
                                    MB
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={
                                clearFile
                            }
                            disabled={
                                isConverting
                            }
                            className="text-sm font-medium text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Choose another file
                        </button>
                    </div>

                    {/* Conversion info */}
                    <div className="mt-6 rounded-xl bg-gray-50 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl shadow-sm">
                                📄
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    Word → PDF
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Your document will
                                    be converted on the
                                    server.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Convert button */}
            {wordFile && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={
                            convertToPdf
                        }
                        disabled={
                            isConverting
                        }
                        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
                    >
                        {isConverting
                            ? "Converting to PDF..."
                            : "Convert to PDF"}
                    </button>
                </div>
            )}

            {/* Processing message */}
            {isConverting && (
                <div
                    className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-center"
                    role="status"
                    aria-live="polite"
                >
                    <p className="text-sm font-medium text-blue-800">
                        Converting your Word
                        document to PDF...
                    </p>

                    <p className="mt-1 text-xs text-blue-600">
                        Please keep this page open
                        until the conversion
                        finishes.
                    </p>
                </div>
            )}
        </div>
    );
}