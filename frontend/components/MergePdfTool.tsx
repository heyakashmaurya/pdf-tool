"use client";

import {
    ChangeEvent,
    DragEvent,
    useCallback,
    useRef,
    useState,
} from "react";
import { PDFDocument } from "pdf-lib";

type PdfItem = {
    id: string;
    file: File;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB per PDF

export default function MergePdfTool() {
    const [files, setFiles] = useState<PdfItem[]>([]);
    const [isMerging, setIsMerging] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const addFiles = useCallback((selectedFiles: File[]) => {
        setError("");

        const validFiles: PdfItem[] = [];

        for (const file of selectedFiles) {
            if (file.type !== "application/pdf") {
                setError("Only PDF files are supported.");
                continue;
            }

            if (file.size > MAX_FILE_SIZE) {
                setError(
                    `${file.name} is larger than 50 MB and was skipped.`,
                );
                continue;
            }

            validFiles.push({
                id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
                file,
            });
        }

        setFiles((current) => [...current, ...validFiles]);
    }, []);

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const selectedFiles = Array.from(event.target.files ?? []);

        if (selectedFiles.length > 0) {
            addFiles(selectedFiles);
        }

        event.target.value = "";
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const droppedFiles = Array.from(event.dataTransfer.files);

        if (droppedFiles.length > 0) {
            addFiles(droppedFiles);
        }
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const removeFile = (id: string) => {
        setFiles((current) =>
            current.filter((item) => item.id !== id),
        );

        setError("");
    };

    const moveFile = (
        index: number,
        direction: "up" | "down",
    ) => {
        setFiles((current) => {
            const newFiles = [...current];

            const newIndex =
                direction === "up" ? index - 1 : index + 1;

            if (newIndex < 0 || newIndex >= newFiles.length) {
                return current;
            }

            [newFiles[index], newFiles[newIndex]] = [
                newFiles[newIndex],
                newFiles[index],
            ];

            return newFiles;
        });
    };

    const clearFiles = () => {
        setFiles([]);
        setError("");
    };

    const mergePdfs = async () => {
        if (files.length < 2) {
            setError("Please select at least two PDF files to merge.");
            return;
        }

        setError("");
        setIsMerging(true);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const item of files) {
                const fileBytes = await item.file.arrayBuffer();

                const sourcePdf = await PDFDocument.load(fileBytes);

                const copiedPages = await mergedPdf.copyPages(
                    sourcePdf,
                    sourcePdf.getPageIndices(),
                );

                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page);
                });
            }

            //   const mergedPdfBytes = await mergedPdf.save();

            //   const blob = new Blob([mergedPdfBytes], {
            //     type: "application/pdf",
            //   });

            const mergedPdfBytes = await mergedPdf.save();

            const blob = new Blob(
                [mergedPdfBytes.buffer as ArrayBuffer],
                {
                    type: "application/pdf",
                },
            );

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "merged-pdf.pdf";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch (mergeError) {
            console.error(mergeError);

            setError(
                "Something went wrong while merging the PDF files. Make sure the files are valid PDF documents and try again.",
            );
        } finally {
            setIsMerging(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Upload Area */}
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
                        Upload PDF files
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Drag and drop your PDF files here, or choose files from
                        your device.
                    </p>

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Choose PDF Files
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <p className="mt-4 text-xs text-gray-400">
                        PDF files · Maximum 50 MB per file
                    </p>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            {/* Selected Files */}
            {files.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Selected PDF files
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {files.length}{" "}
                                {files.length === 1 ? "file" : "files"} selected
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={clearFiles}
                            className="text-sm font-medium text-red-600 transition hover:text-red-700"
                        >
                            Clear all
                        </button>
                    </div>

                    <div className="mt-6 space-y-3">
                        {files.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
                            >
                                {/* Number */}
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-700">
                                    {index + 1}
                                </div>

                                {/* File information */}
                                <div className="min-w-0 flex-1">
                                    <p
                                        className="truncate text-sm font-medium text-gray-900"
                                        title={item.file.name}
                                    >
                                        {item.file.name}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {(item.file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>

                                {/* Controls */}
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => moveFile(index, "up")}
                                        disabled={index === 0}
                                        className="rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        ↑
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => moveFile(index, "down")}
                                        disabled={index === files.length - 1}
                                        className="rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        ↓
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => removeFile(item.id)}
                                        className="rounded-md border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Merge Button */}
            {files.length > 0 && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={mergePdfs}
                        disabled={files.length < 2 || isMerging}
                        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
                    >
                        {isMerging
                            ? "Merging PDFs..."
                            : "Merge PDF Files"}
                    </button>
                </div>
            )}

            {/* Help text */}
            {files.length === 1 && (
                <p className="text-center text-sm text-gray-500">
                    Add at least one more PDF file to merge.
                </p>
            )}
        </div>
    );
}