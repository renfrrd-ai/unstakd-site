import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], weight: ["400", "500"] });

const description =
  "Unstakd is a deploy platform you run on your own server. Push to GitHub and your app is live at https://<app>.unstakd.com with HTTPS, rollbacks and one-click Postgres and Redis.";

export const metadata: Metadata = {
  metadataBase: new URL("https://unstakd.com"),
  title: { default: "Unstakd · Push a repo, get a URL", template: "%s · Unstakd" },
  description,
  openGraph: { title: "Unstakd · Push a repo, get a URL", description, url: "/", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E0E10" },
    { media: "(prefers-color-scheme: light)", color: "#F7F7F5" },
  ],
};

// Runs before paint: stored choice, else the system setting.
const themeScript = `(() => {
  let t = null;
  try { t = localStorage.getItem("theme"); } catch {}
  if (t !== "light" && t !== "dark") t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = t;
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
