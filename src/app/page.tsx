"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EVENT_CATEGORIES } from "@/types";

const ACCENT_COLORS = [
  "bg-artiz-pink",
  "bg-artiz-purple",
  "bg-artiz-green-light",
  "bg-artiz-blue-light",
  "bg-artiz-green",
  "bg-artiz-sand",
  "bg-artiz-orange",
  "bg-artiz-rose",
  "bg-artiz-yellow",
  "bg-artiz-teal",
  "bg-artiz-lavender",
  "bg-artiz-peach",
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-artiz-blue-light/30 via-white to-artiz-pink/20 py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-artiz-primary leading-tight"
          >
            יוצרים מתנה מושלמת
            <br />
            <span className="text-artiz-pink">תוך 30 שניות</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-artiz-secondary max-w-md mx-auto"
          >
            התאמה אישית בלייב, תוצרת כחול לבן, חוויית קנייה פשוטה וכיפית
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Link href="/category/birthday">
              <Button
                size="lg"
                className="bg-artiz-pink hover:bg-artiz-pink/90 text-white text-lg px-8 py-6 rounded-full"
              >
                התחל ליצור מתנה
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-artiz-primary text-center mb-10">
          לאיזה אירוע אתם מחפשים מתנה?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {EVENT_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link href={`/category/${cat.slug}`}>
                <div
                  className={`${ACCENT_COLORS[i % ACCENT_COLORS.length]} rounded-2xl p-6 text-center transition-transform hover:scale-105 cursor-pointer`}
                >
                  <span className="text-4xl">{cat.icon}</span>
                  <p className="mt-3 font-semibold text-artiz-primary">
                    {cat.name}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Customization Promo */}
      <section className="bg-artiz-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            התאמה אישית בלייב
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            הקלידו את הטקסט שלכם ותראו בזמן אמת איך המתנה תיראה.
            בחרו פונט, התאימו ורכשו — הכל במקום אחד.
          </p>
          <Link href="/category/birthday">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-artiz-primary rounded-full"
            >
              גלו את המוצרים שלנו
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Placeholder */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-artiz-primary text-center mb-10">
          מוצרים מומלצים
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-6">
          מוצרים יתווספו בקרוב...
        </p>
      </section>
    </div>
  );
}
