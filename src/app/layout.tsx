import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SearchBox from '@/app/components/SearchBox/SearchBox'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buscador de productos, Mercado libre.",
  description: "Busca, enuentra y compra el producto que necesitas, Mercado libre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClass = `${geistSans.variable} ${geistMono.variable} antialiased`;
  return (
    <html lang="es">
      <body className={bodyClass} suppressHydrationWarning>
        <SearchBox />
        {children}
      </body>
    </html>
  );
}
