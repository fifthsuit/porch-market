import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Porch Market — The market comes to you",
  description:
    "Fresh farmers market produce delivered to your door. Subscribe for weekly boxes or shop single items from local Northshore and Greater New Orleans vendors.",
  openGraph: {
    title: "Porch Market — The market comes to you",
    description:
      "Fresh farmers market produce delivered to your door from local Northshore and NOLA vendors.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Porch Market",
    description: "Fresh farmers market produce delivered to your door.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
