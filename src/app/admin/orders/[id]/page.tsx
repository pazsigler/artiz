"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { adminOrders } from "@/data/admin-mock";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const order = adminOrders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <>
        <AdminHeader title="הזמנה לא נמצאה" />
        <div className="p-6">
          <Link href="/admin/orders" className="text-sm text-muted-foreground hover:text-artiz-primary">
            חזרה להזמנות
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader title={`הזמנה ${order.orderNumber}`} description={order.createdAt} />

      <div className="p-6 overflow-y-auto">
        <div className="max-w-3xl space-y-6">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-artiz-primary"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה להזמנות
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order info */}
            <div className="rounded-xl border bg-white p-5 space-y-3">
              <h2 className="font-bold text-artiz-primary">פרטי הזמנה</h2>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">מספר הזמנה</span>
                  <span className="font-medium">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">סטטוס</span>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">סה״כ</span>
                  <span className="font-bold">₪{order.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">משלוח</span>
                  <span>{order.shippingType === "delivery" ? "משלוח לבית" : "איסוף עצמי"}</span>
                </div>
              </div>
            </div>

            {/* Customer info */}
            <div className="rounded-xl border bg-white p-5 space-y-3">
              <h2 className="font-bold text-artiz-primary">פרטי לקוח</h2>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">שם</span>
                  <span>{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">אימייל</span>
                  <span dir="ltr">{order.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">טלפון</span>
                  <span dir="ltr">{order.customerPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="rounded-xl border bg-white">
            <div className="px-5 py-4 border-b">
              <h2 className="font-bold text-artiz-primary">פריטים</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-right px-5 py-3 font-medium">מוצר</th>
                  <th className="text-right px-5 py-3 font-medium">כמות</th>
                  <th className="text-right px-5 py-3 font-medium">מחיר</th>
                  <th className="text-right px-5 py-3 font-medium">התאמה אישית</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="px-5 py-3 font-medium">{item.productName}</td>
                    <td className="px-5 py-3">{item.quantity}</td>
                    <td className="px-5 py-3">₪{item.price}</td>
                    <td className="px-5 py-3">
                      {item.customizationData ? (
                        <div className="text-xs space-y-1">
                          <p>
                            <span className="text-muted-foreground">טקסט: </span>
                            <span className="font-medium">&quot;{item.customizationData.text}&quot;</span>
                          </p>
                          <p>
                            <span className="text-muted-foreground">פונט: </span>
                            <span>{item.customizationData.font}</span>
                          </p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
