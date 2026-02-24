import type { Metadata } from "next";
import { IBM_Plex_Mono, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

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
        {children}
      </body>
    </html>
  );
}
