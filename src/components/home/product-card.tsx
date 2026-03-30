"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { MockProduct } from "@/data/mock";

interface ProductCardProps {
  product: MockProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-white transition-shadow duration-300 hover:shadow-xl">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50 text-muted-foreground transition-transform duration-500 group-hover:scale-105">
              <ShoppingCart className="h-12 w-12 opacity-20" />
            </div>
          </div>
          <div className="p-4 space-y-2">
            <p className="text-xs text-artiz-secondary">{product.subtitle}</p>
            <h3 className="font-bold text-artiz-primary leading-snug line-clamp-2 text-sm">
              {product.name}
            </h3>
            <div className="flex items-center justify-between pt-1">
              <span className="text-lg font-bold text-artiz-primary">
                &#8362;{product.price}
              </span>
              <Button
                size="sm"
                className="bg-artiz-pink hover:bg-artiz-pink/90 text-white rounded-full text-xs px-4"
              >
                לצפייה
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
