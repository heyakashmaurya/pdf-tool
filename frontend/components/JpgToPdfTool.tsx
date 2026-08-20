"use client";

import {
    ChangeEvent,
    DragEvent,
    useRef,
    useState,
} from "react";
import { PDFDocument } from "pdf-lib";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type ImageFile = {
    file: File;
    previewUrl: string;
};

export default function JpgToPdfTool() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [images, setImages] = useState<ImageFile[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState("");

    const isSupportedImage = (file: File) => {
        return (
            file.type === "image/jpeg" ||
            file.type === "image/jpg"
        );
    };

    const addFiles = (files: File[]) => {
        setError("");

        const validFiles: ImageFile[] = [];

        for (const file of files) {
            if (!isSupportedImage(file)) {
                setError(
                    "Please select JPG or JPEG image files only.",
                );
                continue;
            }

            if (file.size > MAX_FILE_SIZE) {
                setError(
                    `${file.name} is larger than the 50 MB limit.`,
                );
                continue;
            }

            validFiles.push({
                file,
                previewUrl: URL.createObjectURL(file),
            });
        }

        if (validFiles.length > 0) {
            setImages((current) => [
                ...current,
                ...validFiles,
            ]);
        }
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const files = Array.from(event.target.files ?? []);

        addFiles(files);

        event.target.value = "";
    };

    const handleDrop = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();

        const files = Array.from(
            event.dataTransfer.files,
        );

        addFiles(files);
    };

    const handleDragOver = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
    };

    const removeImage = (index: number) => {
        setImages((current) => {
            const image = current[index];

            if (image) {
                URL.revokeObjectURL(image.previewUrl);
            }

            return current.filter(
                (_, imageIndex) => imageIndex !== index,
            );
        });

        setError("");
    };

    const clearImages = () => {
        images.forEach((image) => {
            URL.revokeObjectURL(image.previewUrl);
        });

        setImages([]);
        setError("");
    };

    const createPdf = async () => {
        if (images.length === 0) {
            setError("Please add at least one JPG image.");
            return;
        }

        setError("");
        setIsCreating(true);

        try {
            const pdfDocument = await PDFDocument.create();

            for (const image of images) {
                const imageBytes =
                    await image.file.arrayBuffer();

                const embeddedImage =
                    await pdfDocument.embedJpg(
                        imageBytes,
                    );

                const imageWidth =
                    embeddedImage.width;

                const imageHeight =
                    embeddedImage.height;

                const page = pdfDocument.addPage([
                    imageWidth,
                    imageHeight,
                ]);

                page.drawImage(embeddedImage, {
                    x: 0,
                    y: 0,
                    width: imageWidth,
                    height: imageHeight,
                });
            }

            const outputBytes =
                await pdfDocument.save();

            const blob = new Blob(
                [outputBytes.buffer as ArrayBuffer],
                {
                    type: "application/pdf",
                },
            );

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;
            link.download = "jpg-to-pdf.pdf";

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
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition hover:border-blue-400"
            >
                <div className="mx-auto max-w-xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                        🖼️
                    </div>

                    <h2 className="mt-5 text-xl font-semibold text-gray-900">
                        Add JPG images
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Drag and drop JPG images here, or choose
                        files from your device.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Choose JPG Images
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,.jpg,.jpeg"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <p className="mt-4 text-xs text-gray-400">
                        JPG / JPEG files · Maximum 50 MB per image
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

            {/* Images */}
            {images.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Images ready
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {images.length}{" "}
                                {images.length === 1
                                    ? "image"
                                    : "images"}{" "}
                                will be converted into one PDF.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={clearImages}
                            className="text-sm font-medium text-red-600 transition hover:text-red-700"
                        >
                            Clear all
                        </button>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {images.map((image, index) => (
                            <div
                                key={`${image.file.name}-${index}`}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                            >
                                <div className="aspect-square bg-white">
                                    <img
                                        src={image.previewUrl}
                                        alt={`JPG image ${index + 1}`}
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <div className="p-3">
                                    <p
                                        className="truncate text-sm font-medium text-gray-900"
                                        title={image.file.name}
                                    >
                                        {image.file.name}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Page {index + 1}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeImage(index)
                                        }
                                        className="mt-3 text-xs font-medium text-red-600 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Create PDF */}
            {images.length > 0 && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={createPdf}
                        disabled={isCreating}
                        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
                    >
                        {isCreating
                            ? "Creating PDF..."
                            : "Convert JPG to PDF"}
                    </button>
                </div>
            )}
        </div>
    );
}