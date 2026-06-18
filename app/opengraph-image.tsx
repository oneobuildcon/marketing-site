import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "One O Buildcon – Construction Company in Pune";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          background: "linear-gradient(135deg, #0b1f3a 0%, #061327 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 150,
            height: 150,
            borderRadius: 9999,
            background: "#000000",
            marginBottom: 36,
            fontSize: 64,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -4,
          }}
        >
          ONE
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, color: "#ffffff", letterSpacing: -2 }}>
          One O Buildcon
        </div>
        <div style={{ fontSize: 36, color: "#e08a1e", marginTop: 16, fontWeight: 600 }}>
          Construction Company in Pune
        </div>
        <div style={{ fontSize: 26, color: "#ffffff", opacity: 0.7, marginTop: 28 }}>
          Bungalows · Row Houses · Residential Buildings · Farmhouses
        </div>
      </div>
    ),
    { ...size }
  );
}
