"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, ArrowRight, X, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { adminProducts, adminCategories } from "@/data/admin-mock";

export default function AdminProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === "new";
  const product = isNew ? null : adminProducts.find((p) => p.id === params.id);

  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [status, setStatus] = useState(product?.status || "draft");
  const [stock, setStock] = useState(product?.stock?.toString() || "0");
  const [isCustomizable, setIsCustomizable] = useState(product?.isCustomizable || false);

  // Customization fields
  const [maxChars, setMaxChars] = useState("30");
  const [fonts, setFonts] = useState("Einstein, Rubik, Heebo");
  const [previewX, setPreviewX] = useState("25");
  const [previewY, setPreviewY] = useState("30");
  const [previewWidth, setPreviewWidth] = useState("50");
  const [previewHeight, setPreviewHeight] = useState("40");

  // Image upload state
  const [images, setImages] = useState<string[]>(product?.image ? [product.image] : []);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    imageFiles.forEach((f) => formData.append("files", f));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.urls) {
        setImages((prev) => [...prev, ...data.urls]);
      }
    } catch {
      console.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }, []);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // TODO: wire to API
    console.log("Save product:", { name, price, categoryId, status, stock, isCustomizable });
    router.push("/admin/products");
  };

  return (
    <>
      <AdminHeader
        title={isNew ? "מוצר חדש" : `עריכת: ${product?.name || ""}`}
        description={isNew ? "צור מוצר חדש" : "עדכן פרטי מוצר"}
      />

      <div className="p-6 overflow-y-auto">
        <div className="max-w-2xl space-y-6">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-artiz-primary"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה למוצרים
          </Link>

          <div className="rounded-xl border bg-white p-6 space-y-5">
            <h2 className="font-bold text-artiz-primary">פרטי מוצר</h2>

            <div className="space-y-2">
              <Label>שם המוצר</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="שם המוצר" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>מחיר (₪)</Label>
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>מלאי</Label>
                <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>קטגוריה</Label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value="">בחר קטגוריה</option>
                  {adminCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>סטטוס</Label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "active" | "draft" | "archived")}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value="draft">טיוטה</option>
                  <option value="active">פעיל</option>
                  <option value="archived">ארכיון</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>תמונות</Label>

              {/* Thumbnails */}
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((src, i) => (
                    <div key={src} className="relative group aspect-square rounded-lg overflow-hidden border">
                      <Image src={src} alt={`תמונה ${i + 1}`} fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 left-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Drop zone */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  dragOver ? "border-artiz-primary bg-artiz-primary/5" : "border-muted-foreground/30"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  uploadFiles(e.dataTransfer.files);
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && uploadFiles(e.target.files)}
                />
                {uploading ? (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="text-sm">מעלה תמונות...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-sm">גרור תמונות לכאן או לחץ להעלאה</span>
                    <span className="text-xs">JPG, PNG, WebP</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customization */}
          <div className="rounded-xl border bg-white p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-artiz-primary">התאמה אישית</h2>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCustomizable}
                  onChange={(e) => setIsCustomizable(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">מוצר מותאם אישית</span>
              </label>
            </div>

            {isCustomizable && (
              <>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>מקסימום תווים</Label>
                    <Input type="number" value={maxChars} onChange={(e) => setMaxChars(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>פונטים (מופרדים בפסיק)</Label>
                    <Input value={fonts} onChange={(e) => setFonts(e.target.value)} />
                  </div>
                </div>

                <h3 className="font-bold text-sm text-artiz-primary mt-4">Preview Config</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>X (%)</Label>
                    <Input type="number" value={previewX} onChange={(e) => setPreviewX(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Y (%)</Label>
                    <Input type="number" value={previewY} onChange={(e) => setPreviewY(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>רוחב (%)</Label>
                    <Input type="number" value={previewWidth} onChange={(e) => setPreviewWidth(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>גובה (%)</Label>
                    <Input type="number" value={previewHeight} onChange={(e) => setPreviewHeight(e.target.value)} />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="bg-artiz-primary hover:bg-artiz-primary/90 text-white">
              <Save className="ml-2 h-4 w-4" />
              שמור
            </Button>
            <Link href="/admin/products">
              <Button variant="outline">ביטול</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
