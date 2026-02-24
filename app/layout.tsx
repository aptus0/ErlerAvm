import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Sora } from "next/font/google";
import "./globals.css";

import { WebVitalsReporter } from "@/components/performance/WebVitalsReporter";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const THEME_INIT_SCRIPT = `
(() => {
  try {
    const key = "erler-theme";
    const stored = window.localStorage.getItem(key);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "dark" || stored === "light" ? stored : (prefersDark ? "dark" : "light");
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("data-theme", theme);
  } catch {}
})();
`;

export const metadata: Metadata = {
  title: {
    default: "ERLER AVM",
    template: "%s | ERLER AVM",
  },
  description: "ERLER AVM e-ticaret altyapisi - Next.js App Router V1",
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: "/logo/erler-logo.png",
    shortcut: "/logo/erler-logo.png",
    apple: "/logo/erler-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${sora.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <WebVitalsReporter />
        {children}
      </body>
    </html>
  );
}
