"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, ArrowRight, X, ImagePlus, Loader2, Star } from "lucide-react";
import Link from "next/link";
import { adminProducts, adminCategories } from "@/data/admin-mock";

interface UploadedImage {
  /** Local blob URL for preview, or proxied URL for saved images */
  preview: string;
  /** Vercel Blob URL for storage */
  blobUrl: string;
}

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
  const [mainImage, setMainImage] = useState<UploadedImage | null>(
    product?.image ? { preview: `/api/image?url=${encodeURIComponent(product.image)}`, blobUrl: product.image } : null
  );
  const [gallery, setGallery] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState<"main" | "gallery" | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [mainDragOver, setMainDragOver] = useState(false);
  const [galleryDragOver, setGalleryDragOver] = useState(false);
  const mainFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File): Promise<UploadedImage | null> => {
    const preview = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) {
        setUploadError(data.error);
        return null;
      }
      return { preview, blobUrl: data.urls[0] };
    } catch {
      setUploadError("שגיאה בהעלאת התמונה");
      return null;
    }
  }, []);

  const handleMainUpload = useCallback(async (files: FileList) => {
    const file = Array.from(files).find((f) => f.type.startsWith("image/"));
    if (!file) return;
    setUploading("main");
    setUploadError("");
    const result = await uploadFile(file);
    if (result) setMainImage(result);
    setUploading(null);
  }, [uploadFile]);

  const handleGalleryUpload = useCallback(async (files: FileList) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;
    setUploading("gallery");
    setUploadError("");
    for (const file of imageFiles) {
      const result = await uploadFile(file);
      if (result) setGallery((prev) => [...prev, result]);
    }
    setUploading(null);
  }, [uploadFile]);

  const removeGalleryImage = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");

    const payload = {
      ...(isNew ? {} : { id: params.id }),
      name,
      price,
      categoryId,
      status,
      stock,
      isCustomizable,
      mainImage: mainImage?.blobUrl || null,
      images: gallery.map((g) => g.blobUrl),
      previewConfig: isCustomizable
        ? { maxChars: +maxChars, fonts: fonts.split(",").map((f) => f.trim()), x: +previewX, y: +previewY, width: +previewWidth, height: +previewHeight }
        : null,
    };

    try {
      const res = await fetch("/api/admin/products", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.error) {
        setSaveError(data.error);
      } else {
        router.push("/admin/products");
      }
    } catch {
      setSaveError("שגיאה בשמירת המוצר");
    } finally {
      setSaving(false);
    }
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
          </div>

          {/* Main Image */}
          <div className="rounded-xl border bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-artiz-pink" />
              <h2 className="font-bold text-artiz-primary">תמונה ראשית</h2>
            </div>

            {mainImage ? (
              <div className="relative group w-48 aspect-square rounded-lg overflow-hidden border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mainImage.preview} alt="תמונה ראשית" className="absolute inset-0 w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setMainImage(null)}
                  className="absolute top-2 left-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  mainDragOver ? "border-artiz-primary bg-artiz-primary/5" : "border-muted-foreground/30"
                }`}
                onClick={() => mainFileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setMainDragOver(true); }}
                onDragLeave={() => setMainDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setMainDragOver(false); handleMainUpload(e.dataTransfer.files); }}
              >
                <input
                  ref={mainFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleMainUpload(e.target.files)}
                />
                {uploading === "main" ? (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="text-sm">מעלה תמונה...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-sm">העלה תמונה ראשית</span>
                    <span className="text-xs">התמונה שתוצג בכרטיס המוצר</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Gallery */}
          <div className="rounded-xl border bg-white p-6 space-y-4">
            <h2 className="font-bold text-artiz-primary">גלריית תמונות</h2>

            {gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((img, i) => (
                  <div key={img.blobUrl} className="relative group aspect-square rounded-lg overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.preview} alt={`תמונה ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 left-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                galleryDragOver ? "border-artiz-primary bg-artiz-primary/5" : "border-muted-foreground/30"
              }`}
              onClick={() => galleryFileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setGalleryDragOver(true); }}
              onDragLeave={() => setGalleryDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setGalleryDragOver(false); handleGalleryUpload(e.dataTransfer.files); }}
            >
              <input
                ref={galleryFileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)}
              />
              {uploading === "gallery" ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="text-sm">מעלה תמונות...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImagePlus className="h-8 w-8" />
                  <span className="text-sm">גרור תמונות לכאן או לחץ להעלאה</span>
                  <span className="text-xs">JPG, PNG, WebP — ניתן להעלות מספר תמונות</span>
                </div>
              )}
            </div>

            {uploadError && (
              <p className="text-sm text-destructive">{uploadError}</p>
            )}
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

          {saveError && (
            <p className="text-sm text-destructive text-center">{saveError}</p>
          )}

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="bg-artiz-primary hover:bg-artiz-primary/90 text-white">
              {saving ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Save className="ml-2 h-4 w-4" />}
              {saving ? "שומר..." : "שמור"}
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
