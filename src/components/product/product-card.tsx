import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-muted">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              אין תמונה
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-artiz-primary line-clamp-2">
              {product.name}
            </h3>
            {product.isCustomizable && (
              <Badge variant="secondary" className="shrink-0 bg-artiz-pink/10 text-artiz-pink">
                התאמה אישית
              </Badge>
            )}
          </div>
          <p className="text-lg font-bold text-artiz-primary">
            &#8362;{product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
