// ==================== Admin Mock Data ====================

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryId: string;
  status: "active" | "draft" | "archived";
  isCustomizable: boolean;
  stock: number;
  image: string;
  createdAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  image: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  totalPrice: number;
  itemCount: number;
  shippingType: "delivery" | "pickup";
  createdAt: string;
  items: AdminOrderItem[];
}

export interface AdminOrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  customizationData?: {
    text: string;
    font: string;
  };
}

export interface AdminInquiry {
  id: string;
  name: string;
  phone: string;
  interest: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  discount: number;
  isPercent: boolean;
  active: boolean;
  usageCount: number;
  expiresAt: string | null;
}

export interface AdminHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  active: boolean;
  order: number;
}

// ==================== Mock Data ====================

export const adminProducts: AdminProduct[] = [
  { id: "p1", name: "מזוזה מעוצבת בחיתוך לייזר", price: 89, category: "יודאיקה", categoryId: "c3", status: "active", isCustomizable: true, stock: 45, image: "", createdAt: "2026-03-15" },
  { id: "p2", name: "ספל עם חריטה אישית", price: 79, category: "חריטות לייזר", categoryId: "c4", status: "active", isCustomizable: true, stock: 120, image: "", createdAt: "2026-03-10" },
  { id: "p3", name: "מארז שוקולד ממותג", price: 149, category: "מארזים", categoryId: "c6", status: "active", isCustomizable: false, stock: 30, image: "", createdAt: "2026-03-08" },
  { id: "p4", name: "בלוני הליום עם כיתוב", price: 59, category: "בלונים", categoryId: "c7", status: "active", isCustomizable: true, stock: 200, image: "", createdAt: "2026-03-05" },
  { id: "p5", name: "מחזיק מפתחות חרוט", price: 45, category: "מתנות אישיות", categoryId: "c8", status: "active", isCustomizable: true, stock: 85, image: "", createdAt: "2026-03-01" },
  { id: "p6", name: "לוח ברכות מעוצב", price: 120, category: "מתנות למורים", categoryId: "c2", status: "draft", isCustomizable: false, stock: 15, image: "", createdAt: "2026-02-28" },
  { id: "p7", name: "חנוכייה מודרנית", price: 199, category: "יודאיקה", categoryId: "c3", status: "active", isCustomizable: false, stock: 22, image: "", createdAt: "2026-02-20" },
  { id: "p8", name: "תיק בד ממותג", price: 95, category: "מתנות לחגים", categoryId: "c1", status: "archived", isCustomizable: true, stock: 0, image: "", createdAt: "2026-02-15" },
];

export const adminCategories: AdminCategory[] = [
  { id: "c1", name: "מתנות לחגים", slug: "holidays", productCount: 12, image: "" },
  { id: "c2", name: "מתנות למורים", slug: "teachers", productCount: 8, image: "" },
  { id: "c3", name: "יודאיקה", slug: "judaica", productCount: 15, image: "" },
  { id: "c4", name: "חריטות לייזר", slug: "engraving", productCount: 20, image: "" },
  { id: "c5", name: "חיתוכי לייזר", slug: "laser-cut", productCount: 10, image: "" },
  { id: "c6", name: "מארזים", slug: "packages", productCount: 6, image: "" },
  { id: "c7", name: "בלונים", slug: "balloons", productCount: 9, image: "" },
  { id: "c8", name: "מתנות אישיות", slug: "personal", productCount: 18, image: "" },
];

export const adminOrders: AdminOrder[] = [
  {
    id: "o1", orderNumber: "ART-1001", customerName: "יוסי כהן", customerEmail: "yossi@example.com", customerPhone: "050-1234567",
    status: "pending", totalPrice: 247, itemCount: 3, shippingType: "delivery", createdAt: "2026-03-28",
    items: [
      { id: "oi1", productName: "ספל עם חריטה אישית", quantity: 2, price: 79, customizationData: { text: "ליוסי באהבה", font: "Einstein" } },
      { id: "oi2", productName: "מזוזה מעוצבת", quantity: 1, price: 89 },
    ],
  },
  {
    id: "o2", orderNumber: "ART-1002", customerName: "מיכל לוי", customerEmail: "michal@example.com", customerPhone: "052-9876543",
    status: "confirmed", totalPrice: 149, itemCount: 1, shippingType: "pickup", createdAt: "2026-03-27",
    items: [
      { id: "oi3", productName: "מארז שוקולד ממותג", quantity: 1, price: 149 },
    ],
  },
  {
    id: "o3", orderNumber: "ART-1003", customerName: "דנה אברהם", customerEmail: "dana@example.com", customerPhone: "054-5551234",
    status: "processing", totalPrice: 318, itemCount: 2, shippingType: "delivery", createdAt: "2026-03-26",
    items: [
      { id: "oi4", productName: "בלוני הליום עם כיתוב", quantity: 2, price: 59, customizationData: { text: "מזל טוב!", font: "Einstein" } },
      { id: "oi5", productName: "חנוכייה מודרנית", quantity: 1, price: 199 },
    ],
  },
  {
    id: "o4", orderNumber: "ART-1004", customerName: "אבי שמש", customerEmail: "avi@example.com", customerPhone: "050-7778899",
    status: "shipped", totalPrice: 45, itemCount: 1, shippingType: "delivery", createdAt: "2026-03-25",
    items: [
      { id: "oi6", productName: "מחזיק מפתחות חרוט", quantity: 1, price: 45, customizationData: { text: "אבי 2026", font: "Einstein" } },
    ],
  },
  {
    id: "o5", orderNumber: "ART-1005", customerName: "רחל גולד", customerEmail: "rachel@example.com", customerPhone: "053-1112233",
    status: "delivered", totalPrice: 475, itemCount: 5, shippingType: "delivery", createdAt: "2026-03-20",
    items: [
      { id: "oi7", productName: "תיק בד ממותג", quantity: 5, price: 95, customizationData: { text: "צוות שיווק", font: "Einstein" } },
    ],
  },
];

export const adminInquiries: AdminInquiry[] = [
  { id: "i1", name: "שרה ישראלי", phone: "050-1112233", interest: "50 ספלים ממותגים לחברה", status: "new", createdAt: "2026-03-29" },
  { id: "i2", name: "משה דוד", phone: "052-4445566", interest: "מארזי שי לעובדים — 100 יחידות", status: "new", createdAt: "2026-03-28" },
  { id: "i3", name: "נועה כץ", phone: "054-7778899", interest: "מתנות סוף שנה למורים — 30 יחידות", status: "contacted", createdAt: "2026-03-25" },
  { id: "i4", name: "עמית רוזן", phone: "050-3334455", interest: "יודאיקה ממותגת לאירוע", status: "closed", createdAt: "2026-03-20" },
];

export const adminCoupons: AdminCoupon[] = [
  { id: "cp1", code: "WELCOME10", discount: 10, isPercent: true, active: true, usageCount: 45, expiresAt: "2026-06-30" },
  { id: "cp2", code: "PESACH20", discount: 20, isPercent: true, active: true, usageCount: 12, expiresAt: "2026-04-30" },
  { id: "cp3", code: "FREE50", discount: 50, isPercent: false, active: false, usageCount: 100, expiresAt: null },
];

export const adminHeroSlides: AdminHeroSlide[] = [
  { id: "hs1", title: "שולחן חג מעוצב בהתאמה אישית", subtitle: "מוצרים ממותגים לשולחן הסדר", buttonText: "לקולקציית פסח", buttonLink: "/category/holidays", image: "", active: true, order: 1 },
  { id: "hs2", title: "מתנות למורים ולגננות", subtitle: "סוף שנה מתקרב — הפתיעו עם מתנה אישית", buttonText: "למתנות למורים", buttonLink: "/category/teachers", image: "", active: true, order: 2 },
  { id: "hs3", title: "חריטה אישית על כל מוצר", subtitle: "שם, תאריך, הקדשה", buttonText: "גלו את החריטות", buttonLink: "/category/engraving", image: "", active: true, order: 3 },
  { id: "hs4", title: "יודאיקה בעיצוב מודרני", subtitle: "מזוזות, חנוכיות, קידוש ועוד", buttonText: "ליודאיקה", buttonLink: "/category/judaica", image: "", active: false, order: 4 },
];

// ==================== Dashboard Stats ====================
export const dashboardStats = {
  totalProducts: 98,
  newOrders: 12,
  revenue: 15420,
  newInquiries: 4,
};
