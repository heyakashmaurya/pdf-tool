"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { jsPDF } from "jspdf";

type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
};

type PageSize = "a4" | "letter";

type Orientation = "portrait" | "landscape";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB per image

export default function ImageToPdfTool() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] =
    useState<Orientation>("portrait");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const createImageItems = useCallback(
    (files: File[]) => {
      setError("");

      const validFiles: File[] = [];

      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          setError("Only image files are supported.");
          continue;
        }

        if (
          file.type !== "image/jpeg" &&
          file.type !== "image/png"
        ) {
          setError("Please upload JPG or PNG images only.");
          continue;
        }

        if (file.size > MAX_FILE_SIZE) {
          setError(
            `${file.name} is larger than 20 MB and was skipped.`,
          );
          continue;
        }

        validFiles.push(file);
      }

      const newItems: ImageItem[] = validFiles.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setImages((current) => [...current, ...newItems]);
    },
    [],
  );

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length > 0) {
      createImageItems(files);
    }

    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);

    if (files.length > 0) {
      createImageItems(files);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeImage = (id: string) => {
    setImages((current) => {
      const imageToRemove = current.find(
        (image) => image.id === id,
      );

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return current.filter((image) => image.id !== id);
    });

    setError("");
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    setImages((current) => {
      const newImages = [...current];

      const newIndex =
        direction === "left" ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= newImages.length) {
        return current;
      }

      [newImages[index], newImages[newIndex]] = [
        newImages[newIndex],
        newImages[index],
      ];

      return newImages;
    });
  };

  const clearImages = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.previewUrl);
    });

    setImages([]);
    setError("");
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Could not read the image."));
        }
      };

      reader.onerror = () => {
        reject(new Error("Could not read the image."));
      };

      reader.readAsDataURL(file);
    });
  };

  const generatePdf = async () => {
    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: pageSize,
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      for (let index = 0; index < images.length; index++) {
        if (index > 0) {
          pdf.addPage(pageSize, orientation);
        }

        const imageData = await fileToDataUrl(images[index].file);

        const image = new Image();

        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () =>
            reject(new Error("Could not load an image."));
          image.src = imageData;
        });

        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        if (!imageWidth || !imageHeight) {
          throw new Error(
            `Could not determine the dimensions of ${images[index].file.name}.`,
          );
        }

        const widthRatio = availableWidth / imageWidth;
        const heightRatio = availableHeight / imageHeight;

        const scale = Math.min(widthRatio, heightRatio);

        const renderedWidth = imageWidth * scale;
        const renderedHeight = imageHeight * scale;

        const x =
          (pageWidth - renderedWidth) / 2;

        const y =
          (pageHeight - renderedHeight) / 2;

        const imageFormat =
          images[index].file.type === "image/png"
            ? "PNG"
            : "JPEG";

        pdf.addImage(
          imageData,
          imageFormat,
          x,
          y,
          renderedWidth,
          renderedHeight,
          undefined,
          "FAST",
        );
      }

      pdf.save("images-to-pdf.pdf");
    } catch (generationError) {
      console.error(generationError);

      setError(
        "Something went wrong while creating the PDF. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
    };
  }, [images]);

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
            🖼️
          </div>

          <h2 className="mt-5 text-xl font-semibold text-gray-900">
            Upload your images
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Drag and drop JPG or PNG images here, or choose files
            from your device.
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Choose Images
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          <p className="mt-4 text-xs text-gray-400">
            JPG and PNG · Maximum 20 MB per image
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
                Your images
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {images.length}{" "}
                {images.length === 1 ? "image" : "images"} selected
              </p>
            </div>

            <button
              type="button"
              onClick={clearImages}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Clear all
            </button>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
              >
                <div className="relative aspect-[4/3] bg-gray-100">
                  <img
                    src={image.previewUrl}
                    alt={`Uploaded image ${index + 1}`}
                    className="h-full w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    aria-label={`Remove image ${index + 1}`}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-red-50 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>

                <div className="p-4">
                  <p
                    className="truncate text-sm font-medium text-gray-900"
                    title={image.file.name}
                  >
                    {index + 1}. {image.file.name}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => moveImage(index, "left")}
                      disabled={index === 0}
                      className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Move left
                    </button>

                    <button
                      type="button"
                      onClick={() => moveImage(index, "right")}
                      disabled={index === images.length - 1}
                      className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Move right →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF Settings */}
      {images.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            PDF settings
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {/* Page Size */}
            <div>
              <label
                htmlFor="page-size"
                className="block text-sm font-medium text-gray-700"
              >
                Page size
              </label>

              <select
                id="page-size"
                value={pageSize}
                onChange={(event) =>
                  setPageSize(event.target.value as PageSize)
                }
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
              </select>
            </div>

            {/* Orientation */}
            <div>
              <label
                htmlFor="orientation"
                className="block text-sm font-medium text-gray-700"
              >
                Orientation
              </label>

              <select
                id="orientation"
                value={orientation}
                onChange={(event) =>
                  setOrientation(
                    event.target.value as Orientation,
                  )
                }
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Generate */}
      {images.length > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={generatePdf}
            disabled={isGenerating}
            className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
          >
            {isGenerating
              ? "Creating PDF..."
              : "Convert Images to PDF"}
          </button>
        </div>
      )}
    </div>
  );
}