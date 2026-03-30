import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/shell";

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
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
