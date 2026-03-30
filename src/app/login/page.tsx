"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

const loginSchema = z.object({
  email: z.email("נא להזין אימייל תקין"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      router.push("/admin");
      return;
    }

    setError(result.error || "אימייל או סיסמה שגויים");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="Artiz"
            width={100}
            height={34}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-artiz-primary">
            כניסה לניהול
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            הזינו את פרטי הכניסה שלכם
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-6 bg-white rounded-2xl border shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="login-email">אימייל</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="admin@artiz.co.il"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">סיסמה</Label>
            <Input
              id="login-password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-artiz-primary hover:bg-artiz-primary/90 text-white rounded-full"
          >
            <LogIn className="ml-2 h-4 w-4" />
            כניסה
          </Button>
        </form>
      </div>
    </div>
  );
}
