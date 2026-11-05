import { ImageResponse } from "next/og";
export const alt = "Zhejian Zheng — Agents, systems, and engineering notes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
 return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#050b0f", color: "#ecf7f8", padding: 80 }}><div style={{ fontSize: 28, color: "#6ce7f5" }}>ZHEJIAN ZHENG / ENGINEERING NOTES</div><div style={{ display: "flex", flexDirection: "column", fontSize: 84, letterSpacing: -4 }}>Systems that recover.<br />Interfaces that explain.</div><div style={{ fontSize: 26 }}>Agents · Backend systems · Product interfaces</div></div>, size);
}
