import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Rendered once at build time to out/og.png (a real extension, so Cloudflare serves image/png).
// Pages reference it through `ogImage` in src/app/og.ts.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

// Satori can't read CSS tokens; these mirror the dark theme in globals.css.
const c = { bg: "#0E0E10", panel: "#17171A", line: "#2A2A30", text: "#ECECEF", muted: "#A1A1AA", accent: "#5C78FF", accentText: "#93A4FF", ok: "#3DDC84" };

function Bar({ x, color }: { x: number; color: string }) {
  return <div style={{ width: 52, height: 16, borderRadius: 8, marginLeft: x, background: color }} />;
}

export async function GET() {
  // next/og only ships Geist Regular, and only when no fonts are passed; both cuts live in assets/fonts (OFL).
  const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));
  const [regular, bold] = await Promise.all([font("Geist-Regular.ttf"), font("Geist-Bold.ttf")]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", fontFamily: "Geist", fontWeight: 400, flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: c.bg, color: c.text }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Bar x={0} color={c.text} />
            <Bar x={14} color={c.accent} />
            <Bar x={28} color={c.text} />
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1, marginLeft: 8 }}>unstakd</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>Push a repo.</div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, color: c.accentText }}>Get a URL.</div>
          <div style={{ fontSize: 32, color: c.muted, marginTop: 28 }}>A personal deploy platform on one server. HTTPS, rollbacks, Postgres and Redis.</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", gap: 16, padding: "16px 24px", borderRadius: 14, background: c.panel, border: `2px solid ${c.line}`, fontSize: 28 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: c.ok }} />
          <div style={{ display: "flex" }}>https://your-app.unstakd.com</div>
        </div>
      </div>
    ),
    { ...size, fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
      ] },
  );
}
