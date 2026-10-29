import type { Metadata } from "next";
import type { ReactNode } from "react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./globals.css";



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
      className="h-full antialiased"
    >
      <head>
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />

      </head>
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