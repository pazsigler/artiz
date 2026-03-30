export interface PreviewConfig {
  position: { x: number; y: number };
  width: number;
  height: number;
  maxChars: number;
  fontOptions: string[];
  defaultFont: string;
  textColor: string;
  alignment: "center" | "right" | "left";
}

export interface CustomizationData {
  text: string;
  font: string;
  addons: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  isCustomizable: boolean;
  customizationType?: string;
  previewConfig?: PreviewConfig;
  images: string[];
  categoryId: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customizationData?: CustomizationData;
  previewSnapshotUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalPrice: number;
  shippingType: ShippingType;
  items: OrderItem[];
  couponCode?: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  basePrice: number;
  customizationData?: CustomizationData;
  previewSnapshotUrl?: string;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type ShippingType = "DELIVERY" | "PICKUP";

export type EventCategory =
  | "birthday"
  | "love"
  | "baby"
  | "holidays"
  | "employees";

export const EVENT_CATEGORIES: {
  slug: EventCategory;
  name: string;
  icon: string;
}[] = [
  { slug: "birthday", name: "יום הולדת", icon: "🎂" },
  { slug: "love", name: "אהבה", icon: "❤️" },
  { slug: "baby", name: "לידה", icon: "👶" },
  { slug: "holidays", name: "חגים", icon: "🕎" },
  { slug: "employees", name: "לעובדים", icon: "💼" },
];
