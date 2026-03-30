"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart";
import { EVENT_CATEGORIES } from "@/types";
import { useState, useEffect } from "react";

export function Header() {
  const totalItems = useCartStore((s) => s.totalItems);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Image src="/logo.svg" alt="Artiz" width={84} height={28} priority />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {EVENT_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="text-sm font-medium text-artiz-secondary hover:text-artiz-primary transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {mounted && totalItems() > 0 && (
                <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-artiz-pink text-[11px] font-bold text-white">
                  {totalItems()}
                </span>
              )}
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-artiz-primary hover:bg-muted transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                {EVENT_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="text-lg font-medium text-artiz-primary hover:text-artiz-pink transition-colors"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
