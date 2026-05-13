import { ImageResponse } from "next/og";

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
        }}
      >
        {/* Yin-yang built from SVG-equivalent shapes (no emoji font needed) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: "2px solid #1a1a1a",
            marginBottom: 40,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 90,
              height: 90,
              borderRadius: "50%",
              background:
                "linear-gradient(90deg, #1a1a1a 50%, #ffffff 50%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 22,
                display: "flex",
                width: 45,
                height: 45,
                borderRadius: "50%",
                background: "#1a1a1a",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 22,
                display: "flex",
                width: 45,
                height: 45,
                borderRadius: "50%",
                background: "#ffffff",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 18,
                left: 33,
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ffffff",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 18,
                left: 33,
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#1a1a1a",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 14,
            color: "#b89351",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          FIVE ELEMENTS — BAZI
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 500,
            lineHeight: 1.05,
            textAlign: "center",
            maxWidth: 1000,
            color: "#1a1a1a",
          }}
        >
          Discover your Four Pillars of Destiny
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#707070",
            marginTop: 36,
          }}
        >
          Free Chinese astrology — in plain English — fivebazi.com
        </div>
      </div>
    ),
    { ...size },
  );
}
