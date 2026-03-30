"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EVENT_CATEGORIES } from "@/types";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";

type FilterType = "all" | "customizable" | "regular";
type SortType = "default" | "price-asc" | "price-desc";

// Placeholder products for demo
const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "ספל מותאם אישית",
    description: "ספל קרמי עם הדפסה אישית",
    price: 79,
    isCustomizable: true,
    customizationType: "text",
    images: [],
    categoryId: "birthday",
    previewConfig: {
      position: { x: 25, y: 30 },
      width: 50,
      height: 40,
      maxChars: 30,
      fontOptions: ["Rubik", "David Libre", "Heebo"],
      defaultFont: "Rubik",
      textColor: "#384850",
      alignment: "center",
    },
  },
  {
    id: "2",
    name: "מחזיק מפתחות חרוט",
    description: "מחזיק מפתחות מעץ עם חריטה אישית",
    price: 49,
    isCustomizable: true,
    customizationType: "text",
    images: [],
    categoryId: "birthday",
    previewConfig: {
      position: { x: 20, y: 35 },
      width: 60,
      height: 30,
      maxChars: 20,
      fontOptions: ["Rubik", "David Libre"],
      defaultFont: "Rubik",
      textColor: "#384850",
      alignment: "center",
    },
  },
  {
    id: "3",
    name: "נר ריחני",
    description: "נר סויה ריחני באריזת מתנה",
    price: 89,
    isCustomizable: false,
    images: [],
    categoryId: "birthday",
  },
  {
    id: "4",
    name: "מגנט למקרר",
    description: "מגנט מעוצב עם טקסט אישי",
    price: 35,
    isCustomizable: true,
    customizationType: "text",
    images: [],
    categoryId: "birthday",
    previewConfig: {
      position: { x: 15, y: 25 },
      width: 70,
      height: 50,
      maxChars: 25,
      fontOptions: ["Rubik", "Heebo"],
      defaultFont: "Rubik",
      textColor: "#384850",
      alignment: "center",
    },
  },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = EVENT_CATEGORIES.find((c) => c.slug === slug);

  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("default");

  const filtered = DEMO_PRODUCTS.filter((p) => {
    if (filter === "customizable") return p.isCustomizable;
    if (filter === "regular") return !p.isCustomizable;
    return true;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-artiz-primary">
          {category ? `${category.icon} ${category.name}` : "קטגוריה"}
        </h1>
        <p className="text-artiz-secondary mt-2">
          {filtered.length} מוצרים
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex gap-2">
          {(
            [
              { value: "all", label: "הכל" },
              { value: "customizable", label: "מותאם אישית" },
              { value: "regular", label: "רגיל" },
            ] as const
          ).map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value)}
              className={
                filter === f.value
                  ? "bg-artiz-primary"
                  : ""
              }
            >
              {f.label}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 mr-auto">
          {(
            [
              { value: "default", label: "ברירת מחדל" },
              { value: "price-asc", label: "מחיר: נמוך לגבוה" },
              { value: "price-desc", label: "מחיר: גבוה לנמוך" },
            ] as const
          ).map((s) => (
            <Badge
              key={s.value}
              variant={sort === s.value ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSort(s.value)}
            >
              {s.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-16">
          לא נמצאו מוצרים בקטגוריה זו
        </p>
      )}
    </div>
  );
}
