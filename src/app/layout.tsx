import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { SiteFooter } from "@/components/home/site-footer";

export const metadata: Metadata = {
  title: "Artiz — מתנות בהתאמה אישית",
  description: "יוצרים מתנה מושלמת תוך 30 שניות. תוצרת כחול לבן עם תצוגה חיה לפני רכישה.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
