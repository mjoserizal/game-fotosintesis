import type { Metadata, Viewport } from "next";
import { Baloo_2, Fredoka, Nunito } from "next/font/google";
import { GameProviders } from "@/components/providers/GameProviders";
import "./globals.css";

const heading = Baloo_2({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Proses Fotosintesis",
  description: "Game edukasi interaktif untuk mempelajari proses fotosintesis.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16a34a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${heading.variable} ${body.variable}`}>
      <body className={fredoka.variable}>
        <GameProviders>{children}</GameProviders>
      </body>
    </html>
  );
}
