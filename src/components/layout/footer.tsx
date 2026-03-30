import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-artiz-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src="/logo.svg" alt="Artiz" width={80} height={28} className="brightness-0 invert mb-4 py-1" />
            <p className="text-white/70 text-sm leading-relaxed">
              מתנות בהתאמה אישית, תוצרת כחול לבן.
              <br />
              יוצרים מתנה מושלמת תוך 30 שניות.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">ניווט</h4>
            <nav className="flex flex-col gap-2 text-sm text-white/70">
              <Link href="/category/birthday" className="hover:text-white transition-colors">
                יום הולדת
              </Link>
              <Link href="/category/love" className="hover:text-white transition-colors">
                אהבה
              </Link>
              <Link href="/category/baby" className="hover:text-white transition-colors">
                לידה
              </Link>
              <Link href="/category/holidays" className="hover:text-white transition-colors">
                חגים
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">שירות לקוחות</h4>
            <nav className="flex flex-col gap-2 text-sm text-white/70">
              <Link href="/account" className="hover:text-white transition-colors">
                החשבון שלי
              </Link>
              <p>איסוף עצמי: קריית שמונה</p>
              <p>משלוח לכל הארץ</p>
            </nav>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <p className="text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} Artiz. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
