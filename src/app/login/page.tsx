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
import { LogIn, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.email("נא להזין אימייל תקין"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
});

const resetSchema = z.object({
  email: z.email("נא להזין אימייל תקין"),
});

type LoginForm = z.infer<typeof loginSchema>;
type ResetForm = z.infer<typeof resetSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [resetSent, setResetSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors, isSubmitting: isResetting },
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
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

  const onReset = async (data: ResetForm) => {
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setResetSent(true);
      } else {
        setError(result.error || "שגיאה בשליחת הבקשה");
      }
    } catch {
      setError("שגיאה בשליחת הבקשה");
    }
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
            {mode === "login" ? "כניסה לניהול" : "שחזור סיסמה"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login"
              ? "הזינו את פרטי הכניסה שלכם"
              : "הזינו את האימייל שלכם ונשלח קישור לאיפוס"}
          </p>
        </div>

        {mode === "login" ? (
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
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-artiz-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
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
              {isSubmitting ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="ml-2 h-4 w-4" />
              )}
              {isSubmitting ? "מתחבר..." : "כניסה"}
            </Button>

            <button
              type="button"
              onClick={() => { setMode("reset"); setError(""); }}
              className="w-full text-sm text-muted-foreground hover:text-artiz-primary transition-colors"
            >
              שכחתי סיסמה
            </button>
          </form>
        ) : (
          <div className="space-y-4 p-6 bg-white rounded-2xl border shadow-sm">
            {resetSent ? (
              <div className="text-center space-y-3">
                <p className="text-sm text-artiz-primary font-medium">
                  נשלח קישור לאיפוס סיסמה לאימייל שהזנת
                </p>
                <p className="text-xs text-muted-foreground">
                  בדקו גם בתיקיית הספאם
                </p>
                <button
                  type="button"
                  onClick={() => { setMode("login"); setResetSent(false); setError(""); }}
                  className="inline-flex items-center gap-2 text-sm text-artiz-primary hover:underline"
                >
                  <ArrowRight className="h-4 w-4" />
                  חזרה להתחברות
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit(onReset)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">אימייל</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="admin@artiz.co.il"
                    {...registerReset("email")}
                  />
                  {resetErrors.email && (
                    <p className="text-sm text-destructive">{resetErrors.email.message}</p>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isResetting}
                  className="w-full bg-artiz-primary hover:bg-artiz-primary/90 text-white rounded-full"
                >
                  {isResetting ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isResetting ? "שולח..." : "שלח קישור לאיפוס"}
                </Button>

                <button
                  type="button"
                  onClick={() => { setMode("login"); setError(""); }}
                  className="w-full inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-artiz-primary transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                  חזרה להתחברות
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
