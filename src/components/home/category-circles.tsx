"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Gift,
  GraduationCap,
  Star,
  Pen,
  Scissors,
  Package,
  PartyPopper,
  Heart,
} from "lucide-react";
import type { Category } from "@/data/mock";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Gift,
  GraduationCap,
  Star,
  Pen,
  Scissors,
  Package,
  PartyPopper,
  Heart,
};

interface CategoryCirclesProps {
  categories: Category[];
}

export function CategoryCircles({ categories }: CategoryCirclesProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-artiz-primary text-center mb-10">
        קטגוריות
      </h2>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
        {categories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Gift;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <Link
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-3"
              >
                <div
                  className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}25`, border: `2px solid ${cat.color}` }}
                >
                  <Icon
                    className="h-6 w-6 md:h-7 md:w-7 transition-colors"
                    style={{ color: cat.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-xs md:text-sm font-bold text-artiz-primary text-center leading-tight">
                  {cat.title}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
