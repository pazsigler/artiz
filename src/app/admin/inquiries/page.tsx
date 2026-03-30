"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { adminInquiries } from "@/data/admin-mock";

export default function AdminInquiriesPage() {
  return (
    <>
      <AdminHeader title="פניות" description={`${adminInquiries.length} פניות`} />

      <div className="p-6 overflow-y-auto">
        <div className="rounded-xl border bg-white overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-right px-5 py-3 font-medium">שם</th>
                <th className="text-right px-5 py-3 font-medium">טלפון</th>
                <th className="text-right px-5 py-3 font-medium">עניין</th>
                <th className="text-right px-5 py-3 font-medium">סטטוס</th>
                <th className="text-right px-5 py-3 font-medium">תאריך</th>
                <th className="text-right px-5 py-3 font-medium">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {adminInquiries.map((inq) => (
                <tr key={inq.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium">{inq.name}</td>
                  <td className="px-5 py-3" dir="ltr">{inq.phone}</td>
                  <td className="px-5 py-3 max-w-xs">{inq.interest}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{inq.createdAt}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      {inq.status === "new" && (
                        <Button size="sm" variant="outline" className="text-xs">
                          סמן כנוצר קשר
                        </Button>
                      )}
                      {inq.status === "contacted" && (
                        <Button size="sm" variant="outline" className="text-xs">
                          סגור פנייה
                        </Button>
                      )}
                    </div>
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
