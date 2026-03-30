"use client";

import { ProductCard } from "./product-card";
import type { MockProduct } from "@/data/mock";

interface ProductSectionProps {
  title: string;
  products: MockProduct[];
}

export function ProductSection({ title, products }: ProductSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-artiz-primary text-center mb-10">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
