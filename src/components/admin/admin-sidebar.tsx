"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  MessageSquare,
  Home,
  Tag,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "דשבורד", icon: LayoutDashboard },
  { href: "/admin/products", label: "מוצרים", icon: Package },
  { href: "/admin/categories", label: "קטגוריות", icon: FolderOpen },
  { href: "/admin/orders", label: "הזמנות", icon: ShoppingCart },
  { href: "/admin/inquiries", label: "פניות", icon: MessageSquare },
  { href: "/admin/homepage", label: "דף הבית", icon: Home },
  { href: "/admin/coupons", label: "קופונים", icon: Tag },
  { href: "/admin/settings", label: "הגדרות", icon: Settings },
];

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-60 shrink-0 border-l bg-white flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b">
        <Image src="/logo.svg" alt="Artiz" width={80} height={28} />
        <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-artiz-primary text-white"
                  : "text-artiz-secondary hover:bg-muted hover:text-artiz-primary"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t">
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
          }}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-artiz-secondary hover:bg-muted hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>יציאה</span>
        </button>
      </div>
    </aside>
  );
}
