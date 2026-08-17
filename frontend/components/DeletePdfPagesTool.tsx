"use client";

import {
    ChangeEvent,
    DragEvent,
    useRef,
    useState,
} from "react";
import { PDFDocument } from "pdf-lib";

type PdfFile = {
    file: File;
    pageCount: number;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export default function DeletePdfPagesTool() {
    const [pdf, setPdf] = useState<PdfFile | null>(null);
    const [pagesToDelete, setPagesToDelete] = useState<Set<number>>(
        new Set(),
    );
    const [isReading, setIsReading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadPdf = async (file: File) => {
        setError("");
        setIsReading(true);

        try {
            if (file.type !== "application/pdf") {
                throw new Error("Please select a PDF file.");
            }

            if (file.size > MAX_FILE_SIZE) {
                throw new Error("The PDF file must be smaller than 50 MB.");
            }

            const fileBytes = await file.arrayBuffer();
            const document = await PDFDocument.load(fileBytes);

            const pageCount = document.getPageCount();

            if (pageCount === 0) {
                throw new Error("The PDF does not contain any pages.");
            }

            setPdf({
                file,
                pageCount,
            });

            setPagesToDelete(new Set());
        } catch (loadError) {
            console.error(loadError);

            setPdf(null);
            setPagesToDelete(new Set());

            if (loadError instanceof Error) {
                setError(loadError.message);
            } else {
                setError("Could not read the PDF file.");
            }
        } finally {
            setIsReading(false);
        }
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            void loadPdf(file);
        }

        event.target.value = "";
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files?.[0];

        if (file) {
            void loadPdf(file);
        }
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const togglePage = (pageIndex: number) => {
        setPagesToDelete((current) => {
            const next = new Set(current);

            if (next.has(pageIndex)) {
                next.delete(pageIndex);
            } else {
                next.add(pageIndex);
            }

            return next;
        });
    };

    const selectAll = () => {
        if (!pdf) {
            return;
        }

        setPagesToDelete(
            new Set(
                Array.from(
                    { length: pdf.pageCount },
                    (_, index) => index,
                ),
            ),
        );
    };

    const clearSelection = () => {
        setPagesToDelete(new Set());
    };

    const clearPdf = () => {
        setPdf(null);
        setPagesToDelete(new Set());
        setError("");
    };

    const pagesRemaining = pdf
        ? pdf.pageCount - pagesToDelete.size
        : 0;

    const createPdf = async () => {
        if (!pdf) {
            setError("Please upload a PDF first.");
            return;
        }

        if (pagesToDelete.size === 0) {
            setError("Please select at least one page to delete.");
            return;
        }

        if (pagesRemaining === 0) {
            setError(
                "You cannot delete every page. Keep at least one page in the PDF.",
            );
            return;
        }

        setError("");
        setIsCreating(true);

        try {
            const fileBytes = await pdf.file.arrayBuffer();

            const sourcePdf = await PDFDocument.load(fileBytes);
            const outputPdf = await PDFDocument.create();

            const pagesToKeep = Array.from(
                { length: pdf.pageCount },
                (_, index) => index,
            ).filter((index) => !pagesToDelete.has(index));

            const copiedPages = await outputPdf.copyPages(
                sourcePdf,
                pagesToKeep,
            );

            copiedPages.forEach((page) => {
                outputPdf.addPage(page);
            });

            const outputBytes = await outputPdf.save();



            const blob = new Blob(
                [outputBytes.buffer as ArrayBuffer],
                {
                    type: "application/pdf",
                },
            );

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "edited-pdf.pdf";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch (createError) {
            console.error(createError);

            setError(
                "Something went wrong while creating the PDF. Please try again.",
            );
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Upload */}
            {!pdf && (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition hover:border-blue-400"
                >
                    <div className="mx-auto max-w-xl">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                            🗑️
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            Upload a PDF
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Drag and drop a PDF here, or choose a file from your
                            device.
                        </p>

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isReading}
                            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isReading ? "Reading PDF..." : "Choose PDF"}
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

            {/* PDF */}
            {pdf && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Select pages to delete
                            </h2>

                            <p
                                className="mt-1 truncate text-sm text-gray-500"
                                title={pdf.file.name}
                            >
                                {pdf.file.name}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                {pdf.pageCount}{" "}
                                {pdf.pageCount === 1 ? "page" : "pages"} total
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={clearPdf}
                            className="text-sm font-medium text-red-600 transition hover:text-red-700"
                        >
                            Choose another PDF
                        </button>
                    </div>

                    {/* Controls */}
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={selectAll}
                            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Select all
                        </button>

                        <button
                            type="button"
                            onClick={clearSelection}
                            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Clear selection
                        </button>
                    </div>

                    {/* Page Grid */}
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {Array.from(
                            { length: pdf.pageCount },
                            (_, index) => {
                                const markedForDeletion =
                                    pagesToDelete.has(index);

                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => togglePage(index)}
                                        aria-pressed={markedForDeletion}
                                        className={`relative rounded-xl border-2 p-6 text-center transition ${markedForDeletion
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200 bg-gray-50 hover:border-gray-300"
                                            }`}
                                    >
                                        <div
                                            className={`mx-auto flex h-16 w-12 items-center justify-center rounded border text-2xl shadow-sm ${markedForDeletion
                                                    ? "border-red-300 bg-white"
                                                    : "border-gray-300 bg-white"
                                                }`}
                                        >
                                            {markedForDeletion ? "🗑️" : "📄"}
                                        </div>

                                        <p
                                            className={`mt-3 text-sm font-semibold ${markedForDeletion
                                                    ? "text-red-700"
                                                    : "text-gray-700"
                                                }`}
                                        >
                                            Page {index + 1}
                                        </p>

                                        <p
                                            className={`mt-1 text-xs ${markedForDeletion
                                                    ? "text-red-600"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {markedForDeletion
                                                ? "Will be deleted"
                                                : "Keep"}
                                        </p>

                                        {markedForDeletion && (
                                            <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                                ×
                                            </div>
                                        )}
                                    </button>
                                );
                            },
                        )}
                    </div>

                    {/* Summary */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-lg bg-gray-50 px-4 py-3">
                            <p className="text-xs text-gray-500">
                                Total pages
                            </p>

                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {pdf.pageCount}
                            </p>
                        </div>

                        <div className="rounded-lg bg-red-50 px-4 py-3">
                            <p className="text-xs text-red-600">
                                Pages to delete
                            </p>

                            <p className="mt-1 text-lg font-semibold text-red-700">
                                {pagesToDelete.size}
                            </p>
                        </div>

                        <div className="rounded-lg bg-green-50 px-4 py-3">
                            <p className="text-xs text-green-600">
                                Pages remaining
                            </p>

                            <p className="mt-1 text-lg font-semibold text-green-700">
                                {pagesRemaining}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Button */}
            {pdf && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={createPdf}
                        disabled={
                            pagesToDelete.size === 0 ||
                            pagesRemaining === 0 ||
                            isCreating
                        }
                        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
                    >
                        {isCreating
                            ? "Creating PDF..."
                            : "Delete Selected Pages"}
                    </button>
                </div>
            )}
        </div>
    );
}