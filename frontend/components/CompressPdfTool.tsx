"use client";

import {
    ChangeEvent,
    DragEvent,
    useRef,
    useState,
} from "react";
import { PDFDocument } from "pdf-lib";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type PdfInfo = {
    file: File;
    pageCount: number;
};

type CompressionResult = {
    blob: Blob;
    quality: number;
};

function formatFileSize(bytes: number) {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getPercentageReduction(
    originalSize: number,
    compressedSize: number,
) {
    if (originalSize <= 0) {
        return 0;
    }

    const reduction =
        ((originalSize - compressedSize) / originalSize) * 100;

    return Math.max(0, reduction);
}

export default function CompressPdfTool() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [pdf, setPdf] = useState<PdfInfo | null>(null);

    const [targetSize, setTargetSize] = useState("500");
    const [targetUnit, setTargetUnit] = useState<"KB" | "MB">("KB");

    const [isReading, setIsReading] = useState(false);
    const [isCompressing, setIsCompressing] = useState(false);

    const [error, setError] = useState("");

    const [compressedSize, setCompressedSize] =
        useState<number | null>(null);

    const [compressionQuality, setCompressionQuality] =
        useState<number | null>(null);

    const [targetReached, setTargetReached] = useState(false);

    const targetBytes =
        Number(targetSize) *
        (targetUnit === "MB"
            ? 1024 * 1024
            : 1024);

    const loadPdf = async (file: File) => {
        setError("");
        setCompressedSize(null);
        setCompressionQuality(null);
        setTargetReached(false);
        setIsReading(true);

        try {
            if (file.type !== "application/pdf") {
                throw new Error(
                    "Please select a PDF file.",
                );
            }

            if (file.size > MAX_FILE_SIZE) {
                throw new Error(
                    "The PDF file must be smaller than 50 MB.",
                );
            }

            const fileBytes =
                await file.arrayBuffer();

            const pdfDocument =
                await PDFDocument.load(fileBytes);

            const pageCount =
                pdfDocument.getPageCount();

            if (pageCount === 0) {
                throw new Error(
                    "The PDF does not contain any pages.",
                );
            }

            setPdf({
                file,
                pageCount,
            });
        } catch (loadError) {
            console.error(loadError);

            setPdf(null);
            setCompressedSize(null);
            setCompressionQuality(null);

            if (loadError instanceof Error) {
                setError(loadError.message);
            } else {
                setError(
                    "Could not read the PDF file.",
                );
            }
        } finally {
            setIsReading(false);
        }
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const file =
            event.target.files?.[0];

        if (file) {
            void loadPdf(file);
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
        setCompressedSize(null);
        setCompressionQuality(null);
        setTargetReached(false);
    };

    const createCompressedPdf = async (
        quality: number,
    ): Promise<Blob> => {
        if (!pdf) {
            throw new Error(
                "Please upload a PDF first.",
            );
        }

        /*
         * PDF.js is imported dynamically because this component
         * runs in the browser.
         */
        const pdfjsLib =
            await import("pdfjs-dist");

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

        const fileBytes =
            await pdf.file.arrayBuffer();

        const sourcePdf =
            await pdfjsLib.getDocument({
                data: fileBytes,
            }).promise;

        const outputPdf =
            await PDFDocument.create();

        for (
            let pageNumber = 1;
            pageNumber <= sourcePdf.numPages;
            pageNumber++
        ) {
            const sourcePage =
                await sourcePdf.getPage(
                    pageNumber,
                );

            /*
             * Lower scale means fewer pixels and therefore
             * a smaller resulting PDF.
             */
            const scale = 1.5;

            const viewport =
                sourcePage.getViewport({
                    scale,
                });

            const canvas =
                window.document.createElement(
                    "canvas",
                );

            const context =
                canvas.getContext("2d", {
                    alpha: false,
                });

            if (!context) {
                throw new Error(
                    "Could not create the rendering canvas.",
                );
            }

            canvas.width =
                Math.ceil(viewport.width);

            canvas.height =
                Math.ceil(viewport.height);

            context.fillStyle = "#ffffff";

            context.fillRect(
                0,
                0,
                canvas.width,
                canvas.height,
            );

            // await sourcePage.render({
            //     canvasContext: context,
            //     viewport,
            // }).promise;

            await sourcePage.render({
                canvas,
                canvasContext: context,
                viewport,
            }).promise;

            const jpegBlob =
                await new Promise<Blob | null>(
                    (resolve) => {
                        canvas.toBlob(
                            resolve,
                            "image/jpeg",
                            quality,
                        );
                    },
                );

            if (!jpegBlob) {
                throw new Error(
                    `Could not render page ${pageNumber}.`,
                );
            }

            const jpegBytes =
                await jpegBlob.arrayBuffer();

            const image =
                await outputPdf.embedJpg(
                    jpegBytes,
                );

            const outputPage =
                outputPdf.addPage([
                    viewport.width / scale,
                    viewport.height / scale,
                ]);

            outputPage.drawImage(image, {
                x: 0,
                y: 0,
                width:
                    viewport.width / scale,
                height:
                    viewport.height / scale,
            });

            canvas.width = 1;
            canvas.height = 1;
        }

        const outputBytes =
            await outputPdf.save({
                useObjectStreams: true,
                addDefaultPage: false,
            });

        const outputBuffer =
            outputBytes.buffer as ArrayBuffer;

        return new Blob(
            [outputBuffer],
            {
                type: "application/pdf",
            },
        );
    };

    const compressPdf = async () => {
        if (!pdf) {
            setError(
                "Please upload a PDF first.",
            );
            return;
        }

        if (
            !Number.isFinite(targetBytes) ||
            targetBytes <= 0
        ) {
            setError(
                "Please enter a valid target file size.",
            );
            return;
        }

        if (targetBytes >= pdf.file.size) {
            setError(
                "The target size must be smaller than the original PDF size.",
            );
            return;
        }

        setError("");
        setCompressedSize(null);
        setCompressionQuality(null);
        setTargetReached(false);
        setIsCompressing(true);

        try {
            /*
             * We try several JPEG quality levels.
             *
             * Higher quality = better image quality
             * Lower quality = smaller PDF
             */
            const qualities = [
                0.9,
                0.8,
                0.7,
                0.6,
                0.5,
                0.4,
                0.3,
                0.2,
                0.15,
                0.1,
            ];

            let bestResult:
                CompressionResult | null = null;

            for (const quality of qualities) {
                const blob =
                    await createCompressedPdf(
                        quality,
                    );

                /*
                 * Keep the smallest generated PDF.
                 */
                if (
                    !bestResult ||
                    blob.size < bestResult.blob.size
                ) {
                    bestResult = {
                        blob,
                        quality,
                    };
                }

                /*
                 * Stop as soon as the target has
                 * been reached.
                 */
                if (blob.size <= targetBytes) {
                    bestResult = {
                        blob,
                        quality,
                    };

                    break;
                }
            }

            if (!bestResult) {
                throw new Error(
                    "Could not create a compressed PDF.",
                );
            }

            setCompressedSize(
                bestResult.blob.size,
            );

            setCompressionQuality(
                bestResult.quality,
            );

            const reached =
                bestResult.blob.size <= targetBytes;

            setTargetReached(reached);

            const url =
                URL.createObjectURL(
                    bestResult.blob,
                );

            const link =
                window.document.createElement(
                    "a",
                );

            link.href = url;
            link.download =
                "compressed-pdf.pdf";

            window.document.body.appendChild(
                link,
            );

            link.click();

            window.document.body.removeChild(
                link,
            );

            URL.revokeObjectURL(url);

            /*
             * Important:
             * We don't throw an error if the target cannot
             * be reached. The best available result is still
             * useful to the user.
             */
            if (!reached) {
                setError(
                    `The selected target could not be reached. The smallest result produced was ${formatFileSize(
                        bestResult.blob.size,
                    )}.`,
                );
            }
        } catch (compressionError) {
            console.error(
                compressionError,
            );

            setError(
                "Something went wrong while compressing the PDF. Please try again.",
            );
        } finally {
            setIsCompressing(false);
        }
    };

    const originalSize =
        pdf?.file.size ?? 0;

    const reductionPercentage =
        compressedSize !== null
            ? getPercentageReduction(
                originalSize,
                compressedSize,
            )
            : 0;

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
                            📦
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            Upload a PDF
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Drag and drop a PDF here, or
                            choose a file from your device.
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

            {/* PDF */}
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
                                    : "pages"}{" "}
                                ·{" "}
                                {formatFileSize(
                                    pdf.file.size,
                                )}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={clearPdf}
                            disabled={isCompressing}
                            className="text-sm font-medium text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Choose another PDF
                        </button>
                    </div>

                    {/* Target size */}
                    <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Choose target file size
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            The tool will try to create a PDF at or
                            below this size.
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <input
                                type="number"
                                min="1"
                                step="1"
                                value={targetSize}
                                onChange={(event) =>
                                    setTargetSize(
                                        event.target.value,
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
                                placeholder="500"
                            />

                            <select
                                value={targetUnit}
                                onChange={(event) =>
                                    setTargetUnit(
                                        event.target.value as
                                        | "KB"
                                        | "MB",
                                    )
                                }
                                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="KB">
                                    KB
                                </option>

                                <option value="MB">
                                    MB
                                </option>
                            </select>
                        </div>

                        <div className="mt-4 rounded-lg bg-white px-4 py-3 text-sm text-gray-600">
                            Original:{" "}
                            <strong>
                                {formatFileSize(
                                    pdf.file.size,
                                )}
                            </strong>

                            {" → "}

                            Target:{" "}
                            <strong>
                                {formatFileSize(
                                    targetBytes,
                                )}
                            </strong>
                        </div>
                    </div>

                    {/* Result */}
                    {compressedSize !== null && (
                        <div
                            className={`mt-6 rounded-xl border p-5 ${targetReached
                                    ? "border-green-200 bg-green-50"
                                    : "border-yellow-200 bg-yellow-50"
                                }`}
                        >
                            <h3 className="text-lg font-semibold text-gray-900">
                                Compression result
                            </h3>

                            <div className="mt-4 grid gap-4 sm:grid-cols-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Original
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {formatFileSize(
                                            originalSize,
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Target
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {formatFileSize(
                                            targetBytes,
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Result
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {formatFileSize(
                                            compressedSize,
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Reduction
                                    </p>

                                    <p className="mt-1 font-semibold text-green-700">
                                        {reductionPercentage.toFixed(
                                            1,
                                        )}
                                        %
                                    </p>
                                </div>
                            </div>

                            <p className="mt-4 text-sm text-gray-600">
                                {targetReached
                                    ? "Target size reached successfully."
                                    : "The closest achievable result was generated. Reaching the exact target may require stronger compression or a different target size."}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Compress button */}
            {pdf && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={compressPdf}
                        disabled={
                            isCompressing ||
                            !targetSize ||
                            targetBytes >= pdf.file.size
                        }
                        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-72"
                    >
                        {isCompressing
                            ? "Compressing PDF..."
                            : `Compress to ${targetSize || "target"} ${targetUnit}`}
                    </button>
                </div>
            )}
        </div>
    );
}