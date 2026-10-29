import type { Metadata } from "next";
import type { ReactNode } from "react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./globals.css";



export const metadata: Metadata = {
  title: "Ajmal Ibrahimkhail | Website and Mobile App Developer, AI & Automation Specialist in Kabul, Afghanistan",
  description:
    "Explore Ajmal Ibrahimkhail’s portfolio of websites, mobile apps, and AI automation. Discover custom development services designed to help your business grow.",
    icons: {
      icon: [
        {
          url: "/favicon.ico",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
        },
      ],
    },

  
  };

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
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