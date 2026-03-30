"use client";

import { HeroSlider } from "@/components/home/hero-slider";
import { CategoryCircles } from "@/components/home/category-circles";
import { ProductSection } from "@/components/home/product-section";
import { BulkOrderForm } from "@/components/home/bulk-order-form";
import { heroSlides, categories, bestSellers, newProducts } from "@/data/mock";

export default function HomePage() {
  return (
    <div>
      <HeroSlider slides={heroSlides} />
      <CategoryCircles categories={categories} />
      <ProductSection title="הנמכרים ביותר" products={bestSellers} />
      <ProductSection title="חדש באתר" products={newProducts} />
      <BulkOrderForm />
    </div>
  );
}
