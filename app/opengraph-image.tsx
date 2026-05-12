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
          background: "#ffffff",
          color: "#1a1a1a",
          padding: 80,
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Yin-yang mark in ink ring */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "1.5px solid #1a1a1a",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              color: "#1a1a1a",
            }}
          >
            ☯
          </div>
        </div>

        <div
          style={{
            fontSize: 22,
            letterSpacing: 14,
            color: "#b89351",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          五行 · BaZi
        </div>

        <div
          style={{
            fontSize: 92,
            fontWeight: 500,
            lineHeight: 1.02,
            textAlign: "center",
            maxWidth: 1000,
            letterSpacing: "-0.02em",
            color: "#1a1a1a",
          }}
        >
          Discover your{" "}
          <span style={{ fontStyle: "italic", color: "#b89351" }}>
            Four Pillars
          </span>{" "}
          of Destiny
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#707070",
            marginTop: 36,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: 0,
          }}
        >
          Free Chinese astrology · in plain English · fivebazi.com
        </div>
      </div>
    ),
    { ...size },
  );
}
