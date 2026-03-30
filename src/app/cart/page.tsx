"use client";

import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [coupon, setCoupon] = useState("");

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-artiz-primary mb-4">
          העגלה ריקה
        </h1>
        <p className="text-artiz-secondary mb-8">
          עדיין לא הוספתם מוצרים לעגלה
        </p>
        <Link href="/">
          <Button className="bg-artiz-pink hover:bg-artiz-pink/90 text-white rounded-full">
            המשיכו לקנות
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-artiz-primary mb-8">העגלה שלי</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border rounded-xl bg-white"
            >
              {/* Preview thumbnail */}
              <div className="w-24 h-24 shrink-0 rounded-lg bg-muted overflow-hidden">
                {item.product.images[0] ? (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    תמונה
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-artiz-primary truncate">
                  {item.product.name}
                </h3>

                {item.customizationData && (
                  <p className="text-sm text-artiz-secondary mt-1">
                    טקסט: &quot;{item.customizationData.text}&quot;
                    {item.customizationData.font &&
                      ` | פונט: ${item.customizationData.font}`}
                  </p>
                )}

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-artiz-primary">
                      &#8362;{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="p-6 border rounded-xl bg-white space-y-4">
            <h2 className="text-xl font-bold text-artiz-primary">סיכום הזמנה</h2>
            <Separator />

            <div className="flex justify-between text-artiz-secondary">
              <span>סכום ביניים</span>
              <span>&#8362;{totalPrice().toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-artiz-secondary">
              <span>משלוח</span>
              <span>חינם</span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold text-artiz-primary">
              <span>סה&quot;כ</span>
              <span>&#8362;{totalPrice().toFixed(2)}</span>
            </div>

            {/* Coupon */}
            <div className="flex gap-2">
              <Input
                placeholder="קוד קופון"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button variant="outline">החל</Button>
            </div>

            <Link href="/checkout" className="block">
              <Button className="w-full bg-artiz-pink hover:bg-artiz-pink/90 text-white rounded-full text-lg py-6">
                לתשלום
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
