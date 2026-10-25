import type { Metadata, Viewport } from "next";
import AdminAppBar from "@/components/web-app/AdminAppBar";

export const metadata: Metadata = {
  title: "Apex Admin",
  manifest: "/web-apps/admin.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Apex Admin",
    statusBarStyle: "default",
  },
  icons: { apple: [{ url: "/web-apps/admin-180.png", sizes: "180x180" }] },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
export const viewport: Viewport = {
  themeColor: "#1b3430",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="apx-admin-shell">
      <AdminAppBar />
      {children}
    </div>
  );
}
