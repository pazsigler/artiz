"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle } from "lucide-react";

const bulkSchema = z.object({
  name: z.string().min(2, "נא להזין שם"),
  phone: z.string().min(9, "נא להזין מספר טלפון תקין"),
  interest: z.string().min(2, "ספרו לנו במה התעניינתם"),
});

type BulkForm = z.infer<typeof bulkSchema>;

export function BulkOrderForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BulkForm>({
    resolver: zodResolver(bulkSchema),
  });

  const onSubmit = async (data: BulkForm) => {
    // TODO: wire to API
    console.log("Bulk order inquiry:", data);
    setSubmitted(true);
  };

  return (
    <section className="bg-gradient-to-br from-artiz-blue-light/30 via-white to-artiz-pink/10 py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-artiz-primary mb-3">
            צריכים הזמנה בכמות גדולה?
          </h2>
          <p className="text-artiz-secondary text-base md:text-lg">
            השאירו פרטים ונחזור אליכם עם הצעה מותאמת אישית
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-10 rounded-2xl bg-white border space-y-4"
          >
            <CheckCircle className="h-14 w-14 text-artiz-green mx-auto" />
            <h3 className="text-xl font-bold text-artiz-primary">
              הפרטים התקבלו!
            </h3>
            <p className="text-artiz-secondary">
              ניצור איתכם קשר בהקדם האפשרי
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-8 rounded-2xl bg-white border shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="bulk-name">שם</Label>
                <Input
                  id="bulk-name"
                  placeholder="השם שלכם"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bulk-phone">טלפון</Label>
                <Input
                  id="bulk-phone"
                  type="tel"
                  placeholder="050-000-0000"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bulk-interest">במה התעניינתם?</Label>
              <Input
                id="bulk-interest"
                placeholder="למשל: 50 ספלים ממותגים לחברה"
                {...register("interest")}
              />
              {errors.interest && (
                <p className="text-sm text-destructive">
                  {errors.interest.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-artiz-primary hover:bg-artiz-primary/90 text-white rounded-full text-base py-6"
            >
              <Send className="ml-2 h-4 w-4" />
              שלחו פנייה
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
