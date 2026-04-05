import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Content Crafters | Premium Content & Event Management",
  description:
    "Crafting unforgettable experiences through premium content creation and event management. Let us bring your vision to life.",
  openGraph: {
    title: "Content Crafters | Premium Content & Event Management",
    description:
      "Crafting unforgettable experiences through premium content creation and event management.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
