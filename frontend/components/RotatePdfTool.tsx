"use client";

import {
    ChangeEvent,
    DragEvent,
    useRef,
    useState,
} from "react";
import { PDFDocument, degrees } from "pdf-lib";

type Rotation = 90 | 180 | 270;

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export default function RotatePdfTool() {
    const [file, setFile] = useState<File | null>(null);
    const [pageCount, setPageCount] = useState(0);
    const [rotation, setRotation] = useState<Rotation>(90);
    const [isReading, setIsReading] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadPdf = async (selectedFile: File) => {
        setError("");
        setIsReading(true);

        try {
            if (selectedFile.type !== "application/pdf") {
                throw new Error("Please select a PDF file.");
            }

            if (selectedFile.size > MAX_FILE_SIZE) {
                throw new Error("The PDF file must be smaller than 50 MB.");
            }

            const fileBytes = await selectedFile.arrayBuffer();

            const pdf = await PDFDocument.load(fileBytes);

            const totalPages = pdf.getPageCount();

            if (totalPages === 0) {
                throw new Error("The PDF does not contain any pages.");
            }

            setFile(selectedFile);
            setPageCount(totalPages);
        } catch (loadError) {
            console.error(loadError);

            setFile(null);
            setPageCount(0);

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
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            void loadPdf(selectedFile);
        }

        event.target.value = "";
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const selectedFile = event.dataTransfer.files?.[0];

        if (selectedFile) {
            void loadPdf(selectedFile);
        }
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const clearFile = () => {
        setFile(null);
        setPageCount(0);
        setError("");
    };

    const rotatePdf = async () => {
        if (!file) {
            setError("Please upload a PDF first.");
            return;
        }

        setError("");
        setIsRotating(true);

        try {
            const fileBytes = await file.arrayBuffer();

            const pdf = await PDFDocument.load(fileBytes);

            const pages = pdf.getPages();

            pages.forEach((page) => {
                const currentRotation = page.getRotation().angle;

                page.setRotation(
                    degrees(currentRotation + rotation),
                );
            });

            const outputBytes = await pdf.save();

            const blob = new Blob(
                [outputBytes.buffer as ArrayBuffer],
                {
                    type: "application/pdf",
                },
            );

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "rotated-pdf.pdf";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch (rotateError) {
            console.error(rotateError);

            setError(
                "Something went wrong while rotating the PDF. Please try again.",
            );
        } finally {
            setIsRotating(false);
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
                            🔄
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

            {/* PDF Information */}
            {file && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <h2 className="text-xl font-semibold text-gray-900">
                                PDF ready
                            </h2>

                            <p
                                className="mt-1 truncate text-sm text-gray-500"
                                title={file.name}
                            >
                                {file.name}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                {pageCount}{" "}
                                {pageCount === 1 ? "page" : "pages"}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={clearFile}
                            className="text-sm font-medium text-red-600 transition hover:text-red-700"
                        >
                            Choose another PDF
                        </button>
                    </div>
                </div>
            )}

            {/* Rotation Options */}
            {file && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Rotation
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Choose how much you want to rotate every page.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <button
                            type="button"
                            onClick={() => setRotation(90)}
                            className={`rounded-xl border-2 p-5 text-center transition ${rotation === 90
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                        >
                            <div className="text-3xl">↻</div>

                            <p
                                className={`mt-3 text-sm font-semibold ${rotation === 90
                                        ? "text-blue-700"
                                        : "text-gray-900"
                                    }`}
                            >
                                90°
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Clockwise
                            </p>
                        </button>

                        <button
                            type="button"
                            onClick={() => setRotation(180)}
                            className={`rounded-xl border-2 p-5 text-center transition ${rotation === 180
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                        >
                            <div className="text-3xl">⟳</div>

                            <p
                                className={`mt-3 text-sm font-semibold ${rotation === 180
                                        ? "text-blue-700"
                                        : "text-gray-900"
                                    }`}
                            >
                                180°
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Upside down
                            </p>
                        </button>

                        <button
                            type="button"
                            onClick={() => setRotation(270)}
                            className={`rounded-xl border-2 p-5 text-center transition ${rotation === 270
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                        >
                            <div className="text-3xl">↺</div>

                            <p
                                className={`mt-3 text-sm font-semibold ${rotation === 270
                                        ? "text-blue-700"
                                        : "text-gray-900"
                                    }`}
                            >
                                270°
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Counterclockwise
                            </p>
                        </button>
                    </div>
                </div>
            )}

            {/* Rotate Button */}
            {file && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={rotatePdf}
                        disabled={isRotating}
                        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
                    >
                        {isRotating
                            ? "Rotating PDF..."
                            : `Rotate PDF ${rotation}°`}
                    </button>
                </div>
            )}
        </div>
    );
}