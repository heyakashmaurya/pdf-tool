"use client";

import {
    ChangeEvent,
    DragEvent,
    useRef,
    useState,
} from "react";
import {
    PDFDocument,
    StandardFonts,
    rgb,
} from "pdf-lib";

type Position =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

type PdfFile = {
    file: File;
    pageCount: number;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export default function AddPageNumbersTool() {
    const [pdf, setPdf] = useState<PdfFile | null>(null);

    const [position, setPosition] =
        useState<Position>("bottom-center");

    const [startingNumber, setStartingNumber] = useState("1");

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

    const clearPdf = () => {
        setPdf(null);
        setError("");
    };

    const getPosition = (
        pageWidth: number,
        pageHeight: number,
        textWidth: number,
        textHeight: number,
    ) => {
        const margin = 24;

        switch (position) {
            case "top-left":
                return {
                    x: margin,
                    y: pageHeight - margin - textHeight,
                };

            case "top-center":
                return {
                    x: (pageWidth - textWidth) / 2,
                    y: pageHeight - margin - textHeight,
                };

            case "top-right":
                return {
                    x: pageWidth - margin - textWidth,
                    y: pageHeight - margin - textHeight,
                };

            case "bottom-left":
                return {
                    x: margin,
                    y: margin,
                };

            case "bottom-right":
                return {
                    x: pageWidth - margin - textWidth,
                    y: margin,
                };

            case "bottom-center":
            default:
                return {
                    x: (pageWidth - textWidth) / 2,
                    y: margin,
                };
        }
    };

    const addPageNumbers = async () => {
        if (!pdf) {
            setError("Please upload a PDF first.");
            return;
        }

        const parsedStartingNumber = Number(startingNumber);

        if (
            !Number.isInteger(parsedStartingNumber) ||
            parsedStartingNumber < 1
        ) {
            setError(
                "Starting page number must be a whole number greater than or equal to 1.",
            );
            return;
        }

        setError("");
        setIsCreating(true);

        try {
            const fileBytes = await pdf.file.arrayBuffer();

            //   const document = await PDFDocument.load(fileBytes);

            //   const font = await document.embedFont(
            //     StandardFonts.Helvetica,
            //   );

            //   const pages = document.getPages();

            const pdfDocument = await PDFDocument.load(fileBytes);

            const font = await pdfDocument.embedFont(
                StandardFonts.Helvetica,
            );

            const pages = pdfDocument.getPages();

            pages.forEach((page, index) => {
                const pageNumber =
                    parsedStartingNumber + index;

                const text = String(pageNumber);

                const fontSize = 10;

                const textWidth = font.widthOfTextAtSize(
                    text,
                    fontSize,
                );

                const textHeight = font.heightAtSize(
                    fontSize,
                );

                const { width, height } = page.getSize();

                const { x, y } = getPosition(
                    width,
                    height,
                    textWidth,
                    textHeight,
                );

                page.drawText(text, {
                    x,
                    y,
                    size: fontSize,
                    font,
                    color: rgb(0.25, 0.25, 0.25),
                });
            });

            // const outputBytes = await document.save();
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
            link.download = "numbered-pdf.pdf";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch (createError) {
            console.error(createError);

            setError(
                "Something went wrong while adding page numbers. Please try again.",
            );
        } finally {
            setIsCreating(false);
        }
    };

    const positionOptions: {
        value: Position;
        label: string;
    }[] = [
            {
                value: "top-left",
                label: "Top Left",
            },
            {
                value: "top-center",
                label: "Top Center",
            },
            {
                value: "top-right",
                label: "Top Right",
            },
            {
                value: "bottom-left",
                label: "Bottom Left",
            },
            {
                value: "bottom-center",
                label: "Bottom Center",
            },
            {
                value: "bottom-right",
                label: "Bottom Right",
            },
        ];

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
                            🔢
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
                            className="text-sm font-medium text-red-600 transition hover:text-red-700"
                        >
                            Choose another PDF
                        </button>
                    </div>
                </div>
            )}

            {/* Settings */}
            {pdf && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Page number settings
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Choose where the page numbers should appear and
                        which number the document should start from.
                    </p>

                    {/* Position */}
                    <div className="mt-6">
                        <label className="text-sm font-semibold text-gray-900">
                            Position
                        </label>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {positionOptions.map((option) => {
                                const selected =
                                    position === option.value;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() =>
                                            setPosition(option.value)
                                        }
                                        className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition ${selected
                                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Starting number */}
                    <div className="mt-6 max-w-xs">
                        <label
                            htmlFor="starting-number"
                            className="text-sm font-semibold text-gray-900"
                        >
                            Starting number
                        </label>

                        <input
                            id="starting-number"
                            type="number"
                            min="1"
                            step="1"
                            value={startingNumber}
                            onChange={(event) =>
                                setStartingNumber(event.target.value)
                            }
                            className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <p className="mt-2 text-xs text-gray-500">
                            Example: entering 5 will number the pages
                            5, 6, 7, 8...
                        </p>
                    </div>

                    {/* Preview */}
                    <div className="mt-8">
                        <p className="text-sm font-semibold text-gray-900">
                            Preview
                        </p>

                        <div className="mt-3 flex justify-center rounded-xl bg-gray-100 p-8">
                            <div className="relative flex h-56 w-40 items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm">
                                <div className="text-xs text-gray-300">
                                    PDF PAGE
                                </div>

                                <span
                                    className={`absolute text-xs font-medium text-gray-700 ${position === "top-left"
                                            ? "left-3 top-3"
                                            : position === "top-center"
                                                ? "left-1/2 top-3 -translate-x-1/2"
                                                : position === "top-right"
                                                    ? "right-3 top-3"
                                                    : position === "bottom-left"
                                                        ? "bottom-3 left-3"
                                                        : position === "bottom-right"
                                                            ? "bottom-3 right-3"
                                                            : "bottom-3 left-1/2 -translate-x-1/2"
                                        }`}
                                >
                                    {startingNumber || "1"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Generate */}
            {pdf && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={addPageNumbers}
                        disabled={isCreating}
                        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
                    >
                        {isCreating
                            ? "Adding Page Numbers..."
                            : "Add Page Numbers"}
                    </button>
                </div>
            )}
        </div>
    );
}