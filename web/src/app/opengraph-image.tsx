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
          background: "#f3f5f8",
          color: "#0f1217",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, color: "#566170" }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>
          <span>Full-stack developer,</span>
          <span style={{ color: "#566170" }}>taking the scenic route.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 120, height: 8, borderRadius: 8, background: "#2b63cc" }} />
          <div style={{ fontSize: 26, color: "#566170" }}>Final-year CS student at IU, VNU-HCMC</div>
        </div>
      </div>
    ),
    size,
  );
}
