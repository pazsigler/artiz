import { Badge } from "@/components/ui/badge";

const orderStatusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "ממתינה", className: "bg-amber-100 text-amber-800" },
  confirmed: { label: "אושרה", className: "bg-blue-100 text-blue-800" },
  processing: { label: "בטיפול", className: "bg-purple-100 text-purple-800" },
  shipped: { label: "נשלחה", className: "bg-cyan-100 text-cyan-800" },
  delivered: { label: "נמסרה", className: "bg-green-100 text-green-800" },
  cancelled: { label: "בוטלה", className: "bg-red-100 text-red-800" },
  new: { label: "חדש", className: "bg-artiz-pink/15 text-artiz-pink" },
  contacted: { label: "נוצר קשר", className: "bg-blue-100 text-blue-800" },
  closed: { label: "סגור", className: "bg-gray-100 text-gray-600" },
  active: { label: "פעיל", className: "bg-green-100 text-green-800" },
  draft: { label: "טיוטה", className: "bg-amber-100 text-amber-800" },
  archived: { label: "ארכיון", className: "bg-gray-100 text-gray-600" },
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = orderStatusMap[status] || { label: status, className: "bg-gray-100 text-gray-600" };
  return (
    <Badge variant="secondary" className={`${config.className} font-medium text-xs`}>
      {config.label}
    </Badge>
  );
}
