import { ImageResponse } from "next/og";

export const alt = "Fonte Prime — O próximo passo começa na fonte.";
export const size = { width: 1200, height: 630 };
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
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(circle at 75% 20%, #0f3d36 0%, #081316 60%)",
          color: "#F5FAF8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 48 48" fill="none">
            <rect x="1" y="1" width="46" height="46" rx="13" fill="#0E2024" stroke="#19F5A5" strokeOpacity="0.4" />
            <path
              d="M15 37V15.5a4.5 4.5 0 0 1 4.5-4.5H28a8 8 0 0 1 0 16h-5"
              stroke="#19F5A5"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M15 20h5.5" stroke="#19F5A5" strokeWidth="3.4" strokeLinecap="round" />
            <circle cx="22" cy="27" r="2.6" fill="#C5FF58" />
            <circle cx="15" cy="37" r="2.6" fill="#19F5A5" />
          </svg>
          <div style={{ fontSize: 40, letterSpacing: 8, fontWeight: 700 }}>FONTE PRIME</div>
        </div>
        <div style={{ marginTop: 56, fontSize: 76, fontWeight: 700, lineHeight: 1.05, display: "flex", flexWrap: "wrap" }}>
          O próximo passo começa&nbsp;<span style={{ color: "#19F5A5" }}>na fonte.</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#91AAA5" }}>
          Acesso a oportunidades no mercado de iPhones
        </div>
      </div>
    ),
    size,
  );
}
