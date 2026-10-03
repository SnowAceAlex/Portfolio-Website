import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f8f9fd",
          color: "#2b63cc",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, fontFamily: "monospace" }}>VINH BUI · SNOW ACE</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 400, letterSpacing: -2, lineHeight: 1.04 }}>
          <span>Full-stack developer,</span>
          <span style={{ fontStyle: "italic" }}>taking the scenic route.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 120, height: 0, borderTop: "3px dashed #2b63cc" }} />
          <div style={{ fontSize: 26, fontFamily: "monospace" }}>Final-year CS student at IU, VNU-HCMC</div>
        </div>
      </div>
    ),
    size,
  );
}
