import type { Metadata } from "next";
import {Archivo} from "next/font/google";
import "../styles/globals.css";
import React from "react";

const archivoFont = Archivo({
    subsets: ["latin"],
    variable: "--font-archivo"
});

export const metadata: Metadata = {
  title: "Test auth"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivoFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
