"use client";

import {
    ChangeEvent,
    DragEvent,
    useRef,
    useState,
} from "react";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type PdfInfo = {
    file: File;
    pageCount: number;
};

export default function PdfToPngTool() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [pdf, setPdf] = useState<PdfInfo | null>(null);
    const [isReading, setIsReading] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState("");

    const loadPdf = async (file: File) => {
        setError("");
        setIsReading(true);

        try {
            if (file.type !== "application/pdf") {
                throw new Error("Please select a PDF file.");
            }

            if (file.size > MAX_FILE_SIZE) {
                throw new Error(
                    "The PDF file must be smaller than 50 MB.",
                );
            }

            const pdfjsLib = await import("pdfjs-dist");

            pdfjsLib.GlobalWorkerOptions.workerSrc =
                `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

            const fileBytes = await file.arrayBuffer();

            const pdfDocument = await pdfjsLib.getDocument({
                data: fileBytes,
            }).promise;

            const pageCount = pdfDocument.numPages;

            if (pageCount === 0) {
                throw new Error(
                    "The PDF does not contain any pages.",
                );
            }

            setPdf({
                file,
                pageCount,
            });

            // await pdfDocument.destroy();
        } catch (loadError) {
            console.error(loadError);

            setPdf(null);

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

    const handleDrop = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();

        const file = event.dataTransfer.files?.[0];

        if (file) {
            void loadPdf(file);
        }
    };

    const handleDragOver = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
    };

    const clearPdf = () => {
        setPdf(null);
        setError("");
    };

    const convertToPng = async () => {
        if (!pdf) {
            setError("Please upload a PDF first.");
            return;
        }

        setError("");
        setIsConverting(true);

        try {
            const pdfjsLib = await import("pdfjs-dist");

            pdfjsLib.GlobalWorkerOptions.workerSrc =
                `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

            const fileBytes =
                await pdf.file.arrayBuffer();

            const pdfDocument =
                await pdfjsLib.getDocument({
                    data: fileBytes,
                }).promise;

            for (
                let pageNumber = 1;
                pageNumber <= pdfDocument.numPages;
                pageNumber++
            ) {
                const page =
                    await pdfDocument.getPage(pageNumber);

                const viewport =
                    page.getViewport({
                        scale: 2,
                    });

                const canvas =
                    window.document.createElement("canvas");

                const context =
                    canvas.getContext("2d");

                if (!context) {
                    throw new Error(
                        "Could not create the image canvas.",
                    );
                }

                canvas.width = Math.ceil(
                    viewport.width,
                );

                canvas.height = Math.ceil(
                    viewport.height,
                );

                // await page.render({
                //     canvasContext: context,
                //     viewport,
                // }).promise;

                await page.render({
                    canvas,
                    canvasContext: context,
                    viewport,
                }).promise;

                const blob =
                    await new Promise<Blob | null>(
                        (resolve) => {
                            canvas.toBlob(
                                resolve,
                                "image/png",
                            );
                        },
                    );

                if (!blob) {
                    throw new Error(
                        `Could not convert page ${pageNumber} to PNG.`,
                    );
                }

                const url =
                    URL.createObjectURL(blob);

                const link =
                    window.document.createElement("a");

                link.href = url;

                link.download =
                    `page-${pageNumber}.png`;

                window.document.body.appendChild(
                    link,
                );

                link.click();

                window.document.body.removeChild(
                    link,
                );

                URL.revokeObjectURL(url);
            }

            // await pdfDocument.destroy();
        } catch (conversionError) {
            console.error(conversionError);

            setError(
                "Something went wrong while converting the PDF. Please try again.",
            );
        } finally {
            setIsConverting(false);
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
                            📄
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            Upload a PDF
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Drag and drop a PDF here, or choose
                            a file from your device.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                            disabled={isReading}
                            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isReading
                                ? "Reading PDF..."
                                : "Choose PDF"}
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

            {/* PDF information */}
            {pdf && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <h2 className="text-xl font-semibold text-gray-900">
                                PDF ready
                            </h2>

                            <p
                                className="mt-1 truncate text-sm text-gray-500"
                                title={pdf.file.name}
                            >
                                {pdf.file.name}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                {pdf.pageCount}{" "}
                                {pdf.pageCount === 1
                                    ? "page"
                                    : "pages"}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={clearPdf}
                            disabled={isConverting}
                            className="text-sm font-medium text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Choose another PDF
                        </button>
                    </div>

                    <div className="mt-6 rounded-xl bg-gray-50 p-5">
                        <p className="text-sm text-gray-600">
                            Every PDF page will be converted into
                            a separate PNG image.
                        </p>
                    </div>
                </div>
            )}

            {/* Convert button */}
            {pdf && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={convertToPng}
                        disabled={isConverting}
                        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
                    >
                        {isConverting
                            ? "Converting PDF..."
                            : "Convert PDF to PNG"}
                    </button>
                </div>
            )}
        </div>
    );
}