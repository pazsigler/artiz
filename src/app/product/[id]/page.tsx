"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LivePreview } from "@/components/product/live-preview";
import { CustomizationPanel } from "@/components/product/customization-panel";
import { useCartStore } from "@/store/cart";
import { useCustomizationStore } from "@/store/customization";
import { ShoppingCart, Check } from "lucide-react";
import type { Product, PreviewConfig } from "@/types";

// Demo product — will be fetched from DB in production
const DEMO_PRODUCT: Product = {
  id: "1",
  name: "ספל מותאם אישית",
  description:
    "ספל קרמי איכותי עם הדפסה אישית. מושלם למתנה ליום הולדת, לזוגיות או סתם להפתיע מישהו שאתם אוהבים. הדפסה עמידה במדיח כלים.",
  price: 79,
  isCustomizable: true,
  customizationType: "text",
  images: ["/placeholder-mug.jpg"],
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
};

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [added, setAdded] = useState(false);

  // In production, fetch product by productId
  const product = DEMO_PRODUCT;

  const addItem = useCartStore((s) => s.addItem);
  const customizationStore = useCustomizationStore();

  const handleAddToCart = () => {
    if (product.isCustomizable) {
      const data = customizationStore.getData();
      addItem(product, 1, data);
      customizationStore.reset();
    } else {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const canAdd = !product.isCustomizable || customizationStore.text.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image / Preview */}
        <div>
          {product.isCustomizable && product.previewConfig ? (
            <LivePreview
              productImage={product.images[0] || "/placeholder-mug.jpg"}
              config={product.previewConfig as PreviewConfig}
            />
          ) : (
            <div className="aspect-square overflow-hidden rounded-xl border bg-muted">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  תמונת מוצר
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Details + Customization */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-artiz-primary">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-artiz-pink mt-2">
              &#8362;{product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-artiz-secondary leading-relaxed">
            {product.description}
          </p>

          <Separator />

          {/* Customization Engine */}
          {product.isCustomizable && product.previewConfig && (
            <>
              <CustomizationPanel
                config={product.previewConfig as PreviewConfig}
              />
              <Separator />
            </>
          )}

          {/* Add to Cart */}
          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={!canAdd}
            className={`w-full rounded-full text-lg py-6 ${
              added
                ? "bg-artiz-green hover:bg-artiz-green"
                : "bg-artiz-pink hover:bg-artiz-pink/90"
            } text-white`}
          >
            {added ? (
              <>
                <Check className="ml-2 h-5 w-5" />
                נוסף לעגלה!
              </>
            ) : (
              <>
                <ShoppingCart className="ml-2 h-5 w-5" />
                הוסף לעגלה
              </>
            )}
          </Button>

          {product.isCustomizable && !customizationStore.text && (
            <p className="text-sm text-muted-foreground text-center">
              יש להזין טקסט לפני הוספה לעגלה
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
