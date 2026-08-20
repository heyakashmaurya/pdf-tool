"use client";

import {
    ChangeEvent,
    useState,
} from "react";

export default function BackendUploadTest() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);
        setMessage("");
    };

    const uploadFile = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        setIsUploading(true);
        setMessage("");

        try {
            const formData = new FormData();

            formData.append("file", file);

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL;

            if (!apiUrl) {
                throw new Error(
                    "NEXT_PUBLIC_API_URL is not configured.",
                );
            }

            const response = await fetch(
                `${apiUrl}/api/upload-test`,
                {
                    method: "POST",
                    body: formData,
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Upload failed.",
                );
            }

            setMessage(
                `Success: ${data.file.originalName} received by backend.`,
            );
        } catch (error) {
            console.error(error);

            setMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Backend Upload Test
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    This temporary component checks the connection
                    between Next.js and the backend.
                </p>
            </div>

            <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm"
            />

            {file && (
                <p className="text-sm text-gray-600">
                    Selected: {file.name}
                </p>
            )}

            <button
                type="button"
                onClick={uploadFile}
                disabled={!file || isUploading}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isUploading
                    ? "Uploading..."
                    : "Send to Backend"}
            </button>

            {message && (
                <div
                    role="status"
                    className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700"
                >
                    {message}
                </div>
            )}
        </div>
    );
}