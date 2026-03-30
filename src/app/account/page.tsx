"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.email("נא להזין אימייל תקין"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    // TODO: integrate Supabase auth
    console.log("Login:", data);
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-artiz-primary mb-8">
          החשבון שלי
        </h1>

        <div className="space-y-6">
          <div className="p-6 border rounded-xl bg-white">
            <h2 className="text-xl font-semibold text-artiz-primary mb-4">
              היסטוריית הזמנות
            </h2>
            <p className="text-artiz-secondary">אין הזמנות עדיין</p>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsLoggedIn(false)}
            className="text-destructive"
          >
            התנתקות
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-3xl font-bold text-artiz-primary text-center mb-8">
        התחברות
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-6 border rounded-xl bg-white"
      >
        <div className="space-y-2">
          <Label htmlFor="email">אימייל</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">סיסמה</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-artiz-pink hover:bg-artiz-pink/90 text-white rounded-full"
        >
          התחברות
        </Button>

        <Separator />

        <p className="text-center text-sm text-muted-foreground">
          אין לכם חשבון?{" "}
          <button type="button" className="text-artiz-pink font-medium">
            הרשמה
          </button>
        </p>
      </form>
    </div>
  );
}
