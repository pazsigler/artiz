"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { adminCategories } from "@/data/admin-mock";

export default function AdminCategoriesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const openNew = () => {
    setEditId(null);
    setName("");
    setSlug("");
    setDialogOpen(true);
  };

  const openEdit = (id: string) => {
    const cat = adminCategories.find((c) => c.id === id);
    if (!cat) return;
    setEditId(id);
    setName(cat.name);
    setSlug(cat.slug);
    setDialogOpen(true);
  };

  const handleSave = () => {
    console.log(editId ? "Update category:" : "Create category:", { name, slug });
    setDialogOpen(false);
  };

  return (
    <>
      <AdminHeader title="קטגוריות" description={`${adminCategories.length} קטגוריות`} />

      <div className="p-6 space-y-4 overflow-y-auto">
        <div className="flex justify-end">
          <Button onClick={openNew} className="bg-artiz-primary hover:bg-artiz-primary/90 text-white">
            <Plus className="ml-2 h-4 w-4" />
            קטגוריה חדשה
          </Button>
        </div>

        <div className="rounded-xl border bg-white overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-right px-5 py-3 font-medium">שם</th>
                <th className="text-right px-5 py-3 font-medium">Slug</th>
                <th className="text-right px-5 py-3 font-medium">מוצרים</th>
                <th className="text-right px-5 py-3 font-medium">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {adminCategories.map((cat) => (
                <tr key={cat.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium">{cat.name}</td>
                  <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{cat.slug}</td>
                  <td className="px-5 py-3">{cat.productCount}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(cat.id)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle className="font-bold text-artiz-primary">
            {editId ? "עריכת קטגוריה" : "קטגוריה חדשה"}
          </DialogTitle>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>שם הקטגוריה</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="שם הקטגוריה" />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="category-slug" dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label>תמונה</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground text-sm">
                גרור תמונה או לחץ להעלאה
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} className="bg-artiz-primary hover:bg-artiz-primary/90 text-white">
                שמור
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                ביטול
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
