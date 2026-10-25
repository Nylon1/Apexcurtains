import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./editorial.css";
import "./collections.css";
import "./colour-studio.css";
import "./site-navigation.css";
import "./web-app.css";
import { WebAppProvider } from "@/components/web-app/WebApp";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PublicPresentation from "@/components/layout/PublicPresentation";
import { SERVICE_AREAS } from "@/lib/service-area";

const SITE_URL = "https://www.apexcurtains.com";
export const viewport: Viewport = {
  themeColor: "#1b3430",
  width: "device-width",
  initialScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/web-apps/apex.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Apex Curtains",
    statusBarStyle: "default",
  },
  icons: { apple: [{ url: "/web-apps/public-180.png", sizes: "180x180" }] },
  title: {
    default:
      "Apex Curtains | Curtains for Apex, Triangular & Architectural Windows",
    template: "%s | Apex Curtains",
  },
  description:
    "Specialists in curtains for apex, triangular, gable end and architectural windows across England and Wales.",
  keywords: [
    "apex curtains",
    "triangular window curtains",
    "gable end curtains",
    "architectural window curtains",
    "curtains for shaped windows",
    "apex window curtains UK",
  ],
  openGraph: {
    title: "Apex Curtains",
    description:
      "Specialists in curtains for apex, triangular, gable end and architectural windows across England and Wales.",
    siteName: "Apex Curtains",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Curtains",
    description:
      "Specialists in curtains for apex, triangular, gable end and architectural windows across England and Wales.",
  },
};

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Apex Curtains",
      url: SITE_URL,
      logo: `${SITE_URL}/images/apex-logo-horizontal.svg`,
      telephone: "+448007720367",
      email: "hello@apexcurtains.com",
      description:
        "Specialists in curtains for apex, triangular, gable end and architectural windows across England and Wales.",
      areaServed: SERVICE_AREAS,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Apex Curtains",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
        <WebAppProvider>
          <PublicPresentation>
            <Navbar />
            {children}
            <Footer />
          </PublicPresentation>
        </WebAppProvider>
      </body>
    </html>
  );
}
