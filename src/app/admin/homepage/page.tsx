"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GripVertical, Pencil, Plus } from "lucide-react";
import { adminHeroSlides } from "@/data/admin-mock";

export default function AdminHomepagePage() {
  const [slides, setSlides] = useState(adminHeroSlides);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingSlide = slides.find((s) => s.id === editingId);

  return (
    <>
      <AdminHeader title="ניהול דף הבית" description="שקופיות Hero ומוצרים מוצגים" />

      <div className="p-6 space-y-8 overflow-y-auto">
        {/* Hero Slides */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-artiz-primary">שקופיות Hero</h2>
            <Button size="sm" className="bg-artiz-primary hover:bg-artiz-primary/90 text-white">
              <Plus className="ml-2 h-4 w-4" />
              שקופית חדשה
            </Button>
          </div>

          <div className="space-y-2">
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                className="flex items-center gap-3 p-4 rounded-xl border bg-white"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground shrink-0 cursor-grab" />
                <span className="text-sm text-muted-foreground w-6">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{slide.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{slide.subtitle}</p>
                </div>
                <StatusBadge status={slide.active ? "active" : "draft"} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setEditingId(slide.id === editingId ? null : slide.id)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>

          {/* Edit form */}
          {editingSlide && (
            <div className="rounded-xl border bg-white p-6 space-y-4">
              <h3 className="font-bold text-artiz-primary">
                עריכת שקופית: {editingSlide.title}
              </h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>כותרת</Label>
                  <Input defaultValue={editingSlide.title} />
                </div>
                <div className="space-y-2">
                  <Label>כותרת משנה</Label>
                  <Input defaultValue={editingSlide.subtitle} />
                </div>
                <div className="space-y-2">
                  <Label>טקסט כפתור</Label>
                  <Input defaultValue={editingSlide.buttonText} />
                </div>
                <div className="space-y-2">
                  <Label>קישור כפתור</Label>
                  <Input defaultValue={editingSlide.buttonLink} dir="ltr" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>תמונה</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground text-sm">
                  גרור תמונה או לחץ להעלאה
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="bg-artiz-primary hover:bg-artiz-primary/90 text-white">
                  שמור
                </Button>
                <Button variant="outline" onClick={() => setEditingId(null)}>
                  ביטול
                </Button>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Featured Products */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-artiz-primary">מוצרים מוצגים בדף הבית</h2>
          <p className="text-sm text-muted-foreground">
            בחרו מוצרים שיוצגו בסקשנים &quot;הנמכרים ביותר&quot; ו&quot;חדש באתר&quot;.
            יחובר למערכת ניהול מוצרים בהמשך.
          </p>
          <div className="border-2 border-dashed rounded-xl p-10 text-center text-muted-foreground">
            ניהול מוצרים מוצגים — יחובר ל-API
          </div>
        </div>
      </div>
    </>
  );
}
