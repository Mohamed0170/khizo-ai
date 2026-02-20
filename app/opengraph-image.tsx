import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Khizo AI - AI-Powered Image Editing & Enhancement Tool";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-200px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* X Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 64 64"
            fill="none"
          >
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
            </defs>
            <line x1="8" y1="8" x2="56" y2="56" stroke="url(#g)" strokeWidth="14" strokeLinecap="round" />
            <line x1="56" y1="8" x2="8" y2="56" stroke="url(#g)" strokeWidth="14" strokeLinecap="round" />
          </svg>
        </div>

        {/* Brand Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #818CF8, #7C3AED, #6D28D9)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
            }}
          >
            Khizo AI
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            fontWeight: 500,
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          AI-Powered Image Editing & Enhancement
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Restore", "Generative Fill", "Object Remove", "Recolor", "BG Remove"].map(
            (feature) => (
              <div
                key={feature}
                style={{
                  padding: "10px 24px",
                  borderRadius: "999px",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  color: "#a5b4fc",
                  fontSize: "18px",
                  fontWeight: 500,
                  background: "rgba(99, 102, 241, 0.08)",
                  display: "flex",
                }}
              >
                {feature}
              </div>
            )
          )}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "40px",
            fontSize: "22px",
            color: "#64748b",
            fontWeight: 600,
            display: "flex",
          }}
        >
          khizo.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
