import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "PDF Tools - Free Online PDF Tools";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "white",
                    color: "#111827",
                    padding: "60px",
                }}
            >
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 800,
                        display: "flex",
                    }}
                >
                    PDF Tools
                </div>

                <div
                    style={{
                        marginTop: 24,
                        fontSize: 36,
                        color: "#4B5563",
                        display: "flex",
                    }}
                >
                    Free online PDF tools
                </div>

                <div
                    style={{
                        marginTop: 32,
                        fontSize: 26,
                        color: "#2563EB",
                        display: "flex",
                    }}
                >
                    Merge • Split • Rotate • Convert • Edit
                </div>
            </div>
        ),
        size
    );
}