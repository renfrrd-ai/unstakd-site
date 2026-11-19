import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

const description =
  "Unstakd is a deploy platform you run on your own server. Push to GitHub and your app is live at https://<app>.unstakd.com with HTTPS, rollbacks and one-click Postgres and Redis.";

export const metadata: Metadata = {
  metadataBase: new URL("https://unstakd.com"),
  title: "Unstakd · Push a repo, get a URL",
  description,
  openGraph: { title: "Unstakd · Push a repo, get a URL", description, url: "/", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0D0C" },
    { media: "(prefers-color-scheme: light)", color: "#F6F7F6" },
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
