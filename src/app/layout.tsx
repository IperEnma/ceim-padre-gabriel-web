import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CEIM_LOGO_SRC } from "@/lib/ceim-logo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'C.E.I.M. "Padre Gabriel Figueras Llagostera"',
  description:
    "Centro de Educación Inicial Municipal en Porlamar, Nueva Esparta. Historia, misión, visión, feriados, galería y contacto.",
  icons: {
    icon: CEIM_LOGO_SRC,
    shortcut: CEIM_LOGO_SRC,
    apple: CEIM_LOGO_SRC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
