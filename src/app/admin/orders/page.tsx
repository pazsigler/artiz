"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";
import { adminOrders } from "@/data/admin-mock";

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = adminOrders
    .filter((o) => statusFilter === "all" || o.status === statusFilter)
    .filter((o) => o.orderNumber.includes(search) || o.customerName.includes(search));

  return (
    <>
      <AdminHeader title="הזמנות" description={`${adminOrders.length} הזמנות`} />

      <div className="p-6 space-y-4 overflow-y-auto">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="חיפוש לפי מספר הזמנה או לקוח..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9 w-72"
            />
          </div>
          <div className="flex gap-1">
            {["all", "pending", "confirmed", "processing", "shipped", "delivered"].map((s) => (
              <Button
                key={s}
                size="sm"
                variant={statusFilter === s ? "default" : "outline"}
                onClick={() => setStatusFilter(s)}
                className={statusFilter === s ? "bg-artiz-primary" : ""}
              >
                {{ all: "הכל", pending: "ממתינה", confirmed: "אושרה", processing: "בטיפול", shipped: "נשלחה", delivered: "נמסרה" }[s]}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-right px-5 py-3 font-medium">מספר</th>
                <th className="text-right px-5 py-3 font-medium">לקוח</th>
                <th className="text-right px-5 py-3 font-medium">פריטים</th>
                <th className="text-right px-5 py-3 font-medium">סכום</th>
                <th className="text-right px-5 py-3 font-medium">משלוח</th>
                <th className="text-right px-5 py-3 font-medium">סטטוס</th>
                <th className="text-right px-5 py-3 font-medium">תאריך</th>
                <th className="text-right px-5 py-3 font-medium">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium">{order.orderNumber}</td>
                  <td className="px-5 py-3">{order.customerName}</td>
                  <td className="px-5 py-3">{order.itemCount}</td>
                  <td className="px-5 py-3">₪{order.totalPrice}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {order.shippingType === "delivery" ? "משלוח" : "איסוף"}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{order.createdAt}</td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
