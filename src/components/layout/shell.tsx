"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { SiteFooter } from "@/components/home/site-footer";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname === "/login";
  const hideShell = isAdmin || isLogin;

  if (hideShell) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
