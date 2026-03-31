"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: string;
  isCustomizable: boolean;
  category: { name: string } | null;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "ACTIVE" | "DRAFT" | "ARCHIVED">("all");

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products
    .filter((p) => filter === "all" || p.status === filter)
    .filter((p) => p.name.includes(search) || p.category?.name.includes(search));

  const handleDelete = async (id: string) => {
    if (!confirm("למחוק את המוצר?")) return;
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <AdminHeader title="מוצרים" description={`${products.length} מוצרים`} />

      <div className="p-6 space-y-4 overflow-y-auto">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="חיפוש מוצר..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-9 w-64"
              />
            </div>
            <div className="flex gap-1">
              {(["all", "ACTIVE", "DRAFT", "ARCHIVED"] as const).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  onClick={() => setFilter(f)}
                  className={filter === f ? "bg-artiz-primary" : ""}
                >
                  {{ all: "הכל", ACTIVE: "פעיל", DRAFT: "טיוטה", ARCHIVED: "ארכיון" }[f]}
                </Button>
              ))}
            </div>
          </div>

          <Link href="/admin/products/new">
            <Button className="bg-artiz-primary hover:bg-artiz-primary/90 text-white">
              <Plus className="ml-2 h-4 w-4" />
              מוצר חדש
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="rounded-xl border bg-white overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-right px-5 py-3 font-medium">מוצר</th>
                  <th className="text-right px-5 py-3 font-medium">קטגוריה</th>
                  <th className="text-right px-5 py-3 font-medium">מחיר</th>
                  <th className="text-right px-5 py-3 font-medium">מלאי</th>
                  <th className="text-right px-5 py-3 font-medium">סטטוס</th>
                  <th className="text-right px-5 py-3 font-medium">התאמה אישית</th>
                  <th className="text-right px-5 py-3 font-medium">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 font-medium">{product.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{product.category?.name || "—"}</td>
                    <td className="px-5 py-3">₪{product.price}</td>
                    <td className="px-5 py-3">{product.stock}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={product.status.toLowerCase() as "active" | "draft" | "archived"} />
                    </td>
                    <td className="px-5 py-3">
                      {product.isCustomizable ? (
                        <span className="text-artiz-pink text-xs font-medium">כן</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">לא</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <Link href={`/admin/products/${product.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-10">לא נמצאו מוצרים</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
