"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "נא להזין שם מלא"),
  email: z.email("נא להזין כתובת אימייל תקינה"),
  phone: z.string().min(9, "נא להזין מספר טלפון תקין"),
  shippingType: z.enum(["DELIVERY", "PICKUP"]),
  address: z.string().optional(),
  city: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingType: "DELIVERY",
    },
  });

  const shippingType = watch("shippingType");

  const onSubmit = async (data: CheckoutForm) => {
    // TODO: integrate payment provider and create order
    console.log("Order:", { ...data, items, total: totalPrice() });
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-artiz-primary mb-4">
          ההזמנה התקבלה!
        </h1>
        <p className="text-artiz-secondary">
          תודה שבחרתם ב-Artiz. נשלח לכם אישור למייל בהקדם.
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-artiz-primary mb-4">
          העגלה ריקה
        </h1>
        <p className="text-artiz-secondary">אין מה לשלם עליו...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-artiz-primary mb-8">תשלום</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-artiz-primary">
            פרטים אישיים
          </h2>

          <div className="space-y-2">
            <Label htmlFor="fullName">שם מלא</Label>
            <Input id="fullName" {...register("fullName")} />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">אימייל</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">טלפון</Label>
              <Input id="phone" type="tel" {...register("phone")} />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Shipping */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-artiz-primary">משלוח</h2>

          <div className="flex gap-4">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                value="DELIVERY"
                {...register("shippingType")}
                className="peer sr-only"
              />
              <div className="p-4 border rounded-xl text-center peer-checked:border-artiz-pink peer-checked:bg-artiz-pink/5 transition-colors">
                <p className="font-medium">משלוח לבית</p>
                <p className="text-sm text-muted-foreground">לכל הארץ</p>
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                value="PICKUP"
                {...register("shippingType")}
                className="peer sr-only"
              />
              <div className="p-4 border rounded-xl text-center peer-checked:border-artiz-pink peer-checked:bg-artiz-pink/5 transition-colors">
                <p className="font-medium">איסוף עצמי</p>
                <p className="text-sm text-muted-foreground">קריית שמונה</p>
              </div>
            </label>
          </div>

          {shippingType === "DELIVERY" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">כתובת</Label>
                <Input id="address" {...register("address")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">עיר</Label>
                <Input id="city" {...register("city")} />
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Summary */}
        <div className="p-4 bg-muted rounded-xl space-y-2">
          <div className="flex justify-between">
            <span>{items.length} פריטים</span>
            <span>&#8362;{totalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-artiz-primary">
            <span>סה&quot;כ לתשלום</span>
            <span>&#8362;{totalPrice().toFixed(2)}</span>
          </div>
        </div>

        {/* Payment placeholder */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-artiz-pink hover:bg-artiz-pink/90 text-white rounded-full text-lg py-6"
        >
          בצעו הזמנה
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          שילוב עם מערכת תשלום יתווסף בקרוב
        </p>
      </form>
    </div>
  );
}
