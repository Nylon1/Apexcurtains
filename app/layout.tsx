import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apexcurtains.com"),
  title: {
    default: "Apex Curtains | Curtains for Apex, Triangular & Architectural Windows",
    template: "%s | Apex Curtains",
  },
  description:
    "Specialists in curtains for apex, triangular, gable end and architectural windows across the UK.",
  keywords: [
    "apex curtains",
    "triangular window curtains",
    "gable end curtains",
    "architectural window curtains",
    "curtains for shaped windows",
    "apex window curtains UK",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Apex Curtains",
    description:
      "Specialists in curtains for apex, triangular, gable end and architectural windows across the UK.",
    url: "https://apexcurtains.com",
    siteName: "Apex Curtains",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Curtains",
    description:
      "Specialists in curtains for apex, triangular, gable end and architectural windows across the UK.",
  },
};

export default function RootLayout ({
  
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Apex Curtains",
      url: "https://apexcurtains.com",
      description:
        "Specialists in curtains for apex, triangular, gable end and architectural windows across the UK.",
      areaServed: "GB",
    }),
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Apex Curtains",
      url: "https://apexcurtains.com",
      description:
        "Specialists in curtains for apex, triangular, gable end and architectural windows across the UK, including coastal homes and sea-facing properties.",
     areaServed: [
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "City", name: "London" },
  { "@type": "City", name: "Manchester" },
  { "@type": "City", name: "Brighton" },
  { "@type": "City", name: "Bournemouth" },
  { "@type": "City", name: "Oxford" },
  { "@type": "City", name: "Cambridge" }
],

      serviceType: [
        "Apex window curtains",
        "Triangular window curtains",
        "Gable end curtains",
        "Curtains for coastal homes",
        "Curtains for sea-facing windows",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
      },
    }),
  }}
/>
        <Navbar />

        <main>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}