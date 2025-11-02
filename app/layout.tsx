import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "@/app/components/Navbar";
import { CartProvider } from "@/app/about/context/CartContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Los Tralaleros Corp",
  description: "La más alta calidad en merchandasing de videojuegos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          paddingTop: "60px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CartProvider>
          <Navbar></Navbar>
          <main style={{ flex: 1 }}>{children}</main>
          <footer className="text-center py-4 text-muted border-top mt-auto">
            © 2025 Los Tralaleros Corp.
          </footer>
        </CartProvider>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
