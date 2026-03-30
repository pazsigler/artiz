"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <>
      <AdminHeader title="הגדרות" description="הגדרות כלליות של החנות" />

      <div className="p-6 overflow-y-auto">
        <div className="max-w-2xl space-y-6">
          {/* Store Info */}
          <div className="rounded-xl border bg-white p-6 space-y-5">
            <h2 className="font-bold text-artiz-primary">פרטי החנות</h2>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>שם החנות</Label>
                <Input defaultValue="Artiz" />
              </div>
              <div className="space-y-2">
                <Label>אימייל</Label>
                <Input defaultValue="info@artiz.co.il" type="email" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>טלפון</Label>
                <Input defaultValue="04-1234567" type="tel" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>כתובת איסוף</Label>
                <Input defaultValue="קריית שמונה" />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-xl border bg-white p-6 space-y-5">
            <h2 className="font-bold text-artiz-primary">משלוח</h2>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>עלות משלוח (₪)</Label>
                <Input type="number" defaultValue="0" />
              </div>
              <div className="space-y-2">
                <Label>משלוח חינם מסכום (₪)</Label>
                <Input type="number" defaultValue="0" />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">אפשר איסוף עצמי</span>
            </label>
          </div>

          {/* Social */}
          <div className="rounded-xl border bg-white p-6 space-y-5">
            <h2 className="font-bold text-artiz-primary">רשתות חברתיות</h2>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Instagram</Label>
                <Input placeholder="https://instagram.com/artiz" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>TikTok</Label>
                <Input placeholder="https://tiktok.com/@artiz" dir="ltr" />
              </div>
            </div>
          </div>

          <Button className="bg-artiz-primary hover:bg-artiz-primary/90 text-white">
            <Save className="ml-2 h-4 w-4" />
            שמור הגדרות
          </Button>
        </div>
      </div>
    </>
  );
}
