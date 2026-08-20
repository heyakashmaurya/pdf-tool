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

type PdfFile = {
    file: File;
};

export default function PdfToExcelTool() {
    const [pdfFile, setPdfFile] =
        useState<PdfFile | null>(null);

    const [isConverting, setIsConverting] =
        useState(false);

    const [error, setError] =
        useState("");

    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const loadPdfFile = (file: File) => {
        setError("");

        if (file.type !== "application/pdf") {
            setPdfFile(null);

            setError(
                "Please select a PDF file.",
            );

            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setPdfFile(null);

            setError(
                "The PDF file must be smaller than 50 MB.",
            );

            return;
        }

        setPdfFile({
            file,
        });
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const file =
            event.target.files?.[0];

        if (file) {
            loadPdfFile(file);
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
            loadPdfFile(file);
        }
    };

    const handleDragOver = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
    };

    const clearFile = () => {
        setPdfFile(null);
        setError("");
    };

    const convertToExcel = async () => {
        if (!pdfFile) {
            setError(
                "Please select a PDF file first.",
            );

            return;
        }

        setError("");
        setIsConverting(true);

        try {
            const formData = new FormData();

            formData.append(
                "file",
                pdfFile.file,
            );

            const response = await fetch(
                `${API_BASE_URL}/api/pdf-to-excel`,
                {
                    method: "POST",
                    body: formData,
                },
            );

            if (!response.ok) {
                let message =
                    "Could not convert the PDF to Excel.";

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
                    // Backend may return a non-JSON response.
                }

                throw new Error(message);
            }

            const contentType =
                response.headers.get(
                    "content-type",
                );

            const expectedContentType =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            if (
                !contentType?.includes(
                    expectedContentType,
                )
            ) {
                throw new Error(
                    "The server did not return an Excel file.",
                );
            }

            const excelBlob =
                await response.blob();

            if (excelBlob.size === 0) {
                throw new Error(
                    "The generated Excel file is empty.",
                );
            }

            const originalName =
                pdfFile.file.name.replace(
                    /\.pdf$/i,
                    "",
                );

            const downloadName =
                `${originalName}.xlsx`;

            const downloadUrl =
                URL.createObjectURL(
                    excelBlob,
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
                "PDF to Excel conversion error:",
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
                    "Something went wrong while converting the PDF.",
                );
            }
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Upload */}
            {!pdfFile && (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition hover:border-blue-400"
                >
                    <div className="mx-auto max-w-xl">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                            📊
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            Upload a PDF
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Drag and drop a PDF here,
                            or choose a file from your
                            device.
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
                            onChange={
                                handleFileChange
                            }
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

            {/* Selected PDF */}
            {pdfFile && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                                📄
                            </div>

                            <div className="min-w-0">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    PDF selected
                                </h2>

                                <p
                                    className="mt-1 truncate text-sm text-gray-600"
                                    title={
                                        pdfFile.file.name
                                    }
                                >
                                    {pdfFile.file.name}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {(
                                        pdfFile.file.size /
                                        (1024 * 1024)
                                    ).toFixed(2)}{" "}
                                    MB
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

                    {/* Conversion information */}
                    <div className="mt-6 rounded-xl bg-gray-50 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl shadow-sm">
                                📊
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    PDF → Excel
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Text and table data will
                                    be extracted into an
                                    Excel workbook.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Convert Button */}
            {pdfFile && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={convertToExcel}
                        disabled={isConverting}
                        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
                    >
                        {isConverting
                            ? "Converting to Excel..."
                            : "Convert to Excel"}
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
                        Extracting PDF data and
                        creating your Excel file...
                    </p>

                    <p className="mt-1 text-xs text-blue-600">
                        Please keep this page open until
                        the conversion finishes.
                    </p>
                </div>
            )}
        </div>
    );
}