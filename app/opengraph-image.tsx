import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FiveBaZi — Free Chinese Astrology Calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          background:
            "linear-gradient(135deg, #1f4146 0%, #2b5358 50%, #1f4146 100%)",
          color: "#faf6ee",
          padding: 80,
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Bagua mark (simplified) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "2px solid rgba(250,246,238,0.4)",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: "2px solid #faf6ee",
              position: "relative",
              fontSize: 60,
              fontWeight: 400,
              color: "#faf6ee",
            }}
          >
            ☯
          </div>
        </div>

        <div
          style={{
            fontSize: 28,
            letterSpacing: 14,
            color: "#b8995a",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          五行 · BaZi
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: 500,
            lineHeight: 1.05,
            textAlign: "center",
            maxWidth: 1000,
          }}
        >
          Discover your{" "}
          <span style={{ color: "#d4be88" }}>Four Pillars</span> of Destiny
        </div>

        <div
          style={{
            fontSize: 28,
            color: "rgba(250,246,238,0.75)",
            marginTop: 32,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Free Chinese astrology · in plain English · fivebazi.com
        </div>
      </div>
    ),
    { ...size },
  );
}
