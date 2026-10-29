import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
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
  title: "Ajmal Ibrahimkhail | Portfolio",
  description:
    "Explore Ajmal Ibrahimkhail's portfolio, projects, services, and experience.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col bg-page font-sans text-body"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-lg bg-brand-dark
                     text-white focus:not-sr-only focus:fixed
                     focus:left-4 focus:top-4 focus:px-4 focus:py-3"
        >
          Skip to content
        </a>

        <Header />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}