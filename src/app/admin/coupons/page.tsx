"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { adminCoupons } from "@/data/admin-mock";

export default function AdminCouponsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AdminHeader title="קופונים" description={`${adminCoupons.length} קופונים`} />

      <div className="p-6 space-y-4 overflow-y-auto">
        <div className="flex justify-end">
          <Button onClick={() => setDialogOpen(true)} className="bg-artiz-primary hover:bg-artiz-primary/90 text-white">
            <Plus className="ml-2 h-4 w-4" />
            קופון חדש
          </Button>
        </div>

        <div className="rounded-xl border bg-white overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-right px-5 py-3 font-medium">קוד</th>
                <th className="text-right px-5 py-3 font-medium">הנחה</th>
                <th className="text-right px-5 py-3 font-medium">שימושים</th>
                <th className="text-right px-5 py-3 font-medium">תוקף</th>
                <th className="text-right px-5 py-3 font-medium">סטטוס</th>
                <th className="text-right px-5 py-3 font-medium">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {adminCoupons.map((coupon) => (
                <tr key={coupon.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono font-medium">{coupon.code}</td>
                  <td className="px-5 py-3">
                    {coupon.isPercent ? `${coupon.discount}%` : `₪${coupon.discount}`}
                  </td>
                  <td className="px-5 py-3">{coupon.usageCount}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {coupon.expiresAt || "ללא הגבלה"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        coupon.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {coupon.active ? "פעיל" : "לא פעיל"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
          <DialogTitle className="font-bold text-artiz-primary">קופון חדש</DialogTitle>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>קוד קופון</Label>
              <Input placeholder="WELCOME10" dir="ltr" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>הנחה</Label>
                <Input type="number" placeholder="10" />
              </div>
              <div className="space-y-2">
                <Label>סוג</Label>
                <select className="w-full rounded-md border px-3 py-2 text-sm">
                  <option value="percent">אחוזים (%)</option>
                  <option value="fixed">סכום קבוע (₪)</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>תאריך תפוגה (אופציונלי)</Label>
              <Input type="date" dir="ltr" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button className="bg-artiz-primary hover:bg-artiz-primary/90 text-white">
                צור קופון
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
