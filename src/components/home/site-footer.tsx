"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { footerNavLinks, footerCategoryLinks } from "@/data/mock";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: wire to API
      console.log("Newsletter signup:", email);
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-artiz-primary text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + description */}
          <div className="space-y-4">
            <Image
              src="/logo.svg"
              alt="Artiz"
              width={80}
              height={28}
              className="brightness-0 invert py-1"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              מתנות ומוצרים בעיצוב אישי.
              <br />
              חריטות לייזר, יודאיקה, מארזים ועוד.
            </p>
          </div>

          {/* Site navigation */}
          <div>
            <h4 className="font-bold text-sm mb-4">ניווט באתר</h4>
            <nav className="flex flex-col gap-2.5">
              {footerNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Top categories */}
          <div>
            <h4 className="font-bold text-sm mb-4">קטגוריות מובילות</h4>
            <nav className="flex flex-col gap-2.5">
              {footerCategoryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social + Newsletter */}
          <div className="space-y-6">
            {/* Social links */}
            <div>
              <h4 className="font-bold text-sm mb-4">עקבו אחרינו</h4>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-sm mb-3">הרשמה לניוזלטר</h4>
              {subscribed ? (
                <p className="text-sm text-artiz-green">נרשמתם בהצלחה!</p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="האימייל שלכם"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm"
                    required
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-artiz-pink hover:bg-artiz-pink/90 text-white rounded-lg shrink-0"
                  >
                    הרשמה
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <p className="text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Artiz. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
