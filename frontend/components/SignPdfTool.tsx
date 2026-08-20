"use client";

import {
    ChangeEvent,
    PointerEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { PDFDocument } from "pdf-lib";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type PdfInfo = {
    file: File;
    pageCount: number;
};

export default function SignPdfTool() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [pdf, setPdf] = useState<PdfInfo | null>(null);
    const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(
        null,
    );

    const [selectedPage, setSelectedPage] = useState(1);
    const [signatureSize, setSignatureSize] = useState(180);

    const [isReading, setIsReading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);

    const [error, setError] = useState("");

    /*
     * Prepare the signature canvas.
     */
    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext("2d");

        if (!context) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "#111827";
    }, []);

    const getCanvasPosition = (
        event: PointerEvent<HTMLCanvasElement>,
    ) => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return null;
        }

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY,
        };
    };

    const startDrawing = (
        event: PointerEvent<HTMLCanvasElement>,
    ) => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext("2d");

        if (!context) {
            return;
        }

        const position = getCanvasPosition(event);

        if (!position) {
            return;
        }

        event.preventDefault();

        canvas.setPointerCapture(event.pointerId);

        context.beginPath();
        context.moveTo(position.x, position.y);

        setIsDrawing(true);
        setError("");
    };

    const draw = (
        event: PointerEvent<HTMLCanvasElement>,
    ) => {
        if (!isDrawing) {
            return;
        }

        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext("2d");

        if (!context) {
            return;
        }

        const position = getCanvasPosition(event);

        if (!position) {
            return;
        }

        event.preventDefault();

        context.lineTo(position.x, position.y);
        context.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) {
            return;
        }

        setIsDrawing(false);

        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const dataUrl = canvas.toDataURL("image/png");

        setSignatureDataUrl(dataUrl);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext("2d");

        if (!context) {
            return;
        }

        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height,
        );

        setSignatureDataUrl(null);
        setError("");
    };

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

            const fileBytes = await file.arrayBuffer();

            const document = await PDFDocument.load(fileBytes);

            const pageCount = document.getPageCount();

            if (pageCount === 0) {
                throw new Error(
                    "The PDF does not contain any pages.",
                );
            }

            setPdf({
                file,
                pageCount,
            });

            setSelectedPage(1);
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

    const clearPdf = () => {
        setPdf(null);
        setSelectedPage(1);
        setError("");
    };

    const createSignedPdf = async () => {
        if (!pdf) {
            setError("Please upload a PDF first.");
            return;
        }

        if (!signatureDataUrl) {
            setError("Please draw your signature first.");
            return;
        }

        setError("");
        setIsCreating(true);

        try {
            const fileBytes = await pdf.file.arrayBuffer();

            // const document = await PDFDocument.load(fileBytes);
            const pdfDocument = await PDFDocument.load(fileBytes);

            // const pages = document.getPages();
            const pages = pdfDocument.getPages();

            const page = pages[selectedPage - 1];

            if (!page) {
                throw new Error(
                    "The selected PDF page could not be found.",
                );
            }

            /*
             * Convert the canvas signature into PNG bytes.
             */
            const response = await fetch(signatureDataUrl);
            const signatureBytes = await response.arrayBuffer();

            const signatureImage = await pdfDocument.embedPng(
                signatureBytes,
            );

            const pageWidth = page.getWidth();
            const pageHeight = page.getHeight();

            /*
             * Keep the signature inside the page.
             */
            const width = Math.min(
                signatureSize,
                pageWidth * 0.45,
            );

            const imageRatio =
                signatureImage.height /
                signatureImage.width;

            const height = width * imageRatio;

            const margin = 36;

            const x = Math.max(
                margin,
                pageWidth - width - margin,
            );

            const y = margin;

            page.drawImage(signatureImage, {
                x,
                y,
                width,
                height,
            });

            const outputBytes = await pdfDocument.save();

            const blob = new Blob(
                [outputBytes.buffer as ArrayBuffer],
                {
                    type: "application/pdf",
                },
            );

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "signed-pdf.pdf";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch (createError) {
            console.error(createError);

            setError(
                "Something went wrong while creating the signed PDF. Please try again.",
            );
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Upload */}
            {!pdf && (
                <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition hover:border-blue-400">
                    <div className="mx-auto max-w-xl">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                            ✍️
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            Upload a PDF
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Drag and drop is not required. Choose a PDF
                            from your device to get started.
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

            {/* Signing interface */}
            {pdf && (
                <div className="space-y-6">
                    {/* PDF information */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Sign your PDF
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
                                    total
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
                    </div>

                    {/* Signature drawing */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Draw your signature
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Use your mouse, trackpad, or touchscreen
                                to draw your signature.
                            </p>
                        </div>

                        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                            <canvas
                                ref={canvasRef}
                                width={700}
                                height={250}
                                onPointerDown={startDrawing}
                                onPointerMove={draw}
                                onPointerUp={stopDrawing}
                                onPointerCancel={stopDrawing}
                                onPointerLeave={stopDrawing}
                                className="block h-auto w-full touch-none cursor-crosshair bg-white"
                            />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={clearSignature}
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Clear signature
                            </button>
                        </div>

                        {signatureDataUrl && (
                            <p className="mt-4 text-sm text-green-600">
                                ✓ Signature ready
                            </p>
                        )}
                    </div>

                    {/* Placement controls */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Signature placement
                        </h2>

                        <div className="mt-6 grid gap-6 sm:grid-cols-2">
                            {/* Page */}
                            <div>
                                <label
                                    htmlFor="signature-page"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Page
                                </label>

                                <select
                                    id="signature-page"
                                    value={selectedPage}
                                    onChange={(event) =>
                                        setSelectedPage(
                                            Number(event.target.value),
                                        )
                                    }
                                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    {Array.from(
                                        {
                                            length: pdf.pageCount,
                                        },
                                        (_, index) => (
                                            <option
                                                key={index}
                                                value={index + 1}
                                            >
                                                Page {index + 1}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>

                            {/* Size */}
                            <div>
                                <label
                                    htmlFor="signature-size"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Signature size
                                </label>

                                <div className="mt-2 flex items-center gap-4">
                                    <input
                                        id="signature-size"
                                        type="range"
                                        min="80"
                                        max="400"
                                        step="10"
                                        value={signatureSize}
                                        onChange={(event) =>
                                            setSignatureSize(
                                                Number(
                                                    event.target.value,
                                                ),
                                            )
                                        }
                                        className="w-full"
                                    />

                                    <span className="w-16 text-right text-sm text-gray-600">
                                        {signatureSize}px
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
                            The signature will be placed near the bottom-right
                            corner of the selected page.
                        </div>
                    </div>

                    {/* Create button */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={createSignedPdf}
                            disabled={
                                !signatureDataUrl ||
                                isCreating
                            }
                            className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
                        >
                            {isCreating
                                ? "Creating Signed PDF..."
                                : "Sign PDF & Download"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}