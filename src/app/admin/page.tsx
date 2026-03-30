"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Package, ShoppingCart, DollarSign, MessageSquare } from "lucide-react";
import { dashboardStats, adminOrders, adminInquiries } from "@/data/admin-mock";

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader title="דשבורד" description="סקירה כללית של החנות" />

      <div className="p-6 space-y-8 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="סה״כ מוצרים" value={dashboardStats.totalProducts} icon={Package} color="#82acb4" />
          <StatCard title="הזמנות חדשות" value={dashboardStats.newOrders} icon={ShoppingCart} color="#f28db2" />
          <StatCard title="הכנסות" value={`₪${dashboardStats.revenue.toLocaleString()}`} icon={DollarSign} color="#b0d8a2" />
          <StatCard title="פניות חדשות" value={dashboardStats.newInquiries} icon={MessageSquare} color="#fde480" />
        </div>

        {/* Recent Orders */}
        <div className="rounded-xl border bg-white">
          <div className="px-5 py-4 border-b">
            <h2 className="font-bold text-artiz-primary">הזמנות אחרונות</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-right px-5 py-3 font-medium">מספר</th>
                  <th className="text-right px-5 py-3 font-medium">לקוח</th>
                  <th className="text-right px-5 py-3 font-medium">סכום</th>
                  <th className="text-right px-5 py-3 font-medium">סטטוס</th>
                  <th className="text-right px-5 py-3 font-medium">תאריך</th>
                </tr>
              </thead>
              <tbody>
                {adminOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 font-medium">{order.orderNumber}</td>
                    <td className="px-5 py-3">{order.customerName}</td>
                    <td className="px-5 py-3">₪{order.totalPrice}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{order.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="rounded-xl border bg-white">
          <div className="px-5 py-4 border-b">
            <h2 className="font-bold text-artiz-primary">פניות אחרונות</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-right px-5 py-3 font-medium">שם</th>
                  <th className="text-right px-5 py-3 font-medium">טלפון</th>
                  <th className="text-right px-5 py-3 font-medium">עניין</th>
                  <th className="text-right px-5 py-3 font-medium">סטטוס</th>
                  <th className="text-right px-5 py-3 font-medium">תאריך</th>
                </tr>
              </thead>
              <tbody>
                {adminInquiries.map((inq) => (
                  <tr key={inq.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 font-medium">{inq.name}</td>
                    <td className="px-5 py-3" dir="ltr">{inq.phone}</td>
                    <td className="px-5 py-3 max-w-xs truncate">{inq.interest}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={inq.status} />
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{inq.createdAt}</td>
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
