import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, CustomizationData } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    customizationData?: CustomizationData,
    previewSnapshotUrl?: string
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, customizationData, previewSnapshotUrl) => {
        const id = customizationData
          ? `${product.id}-${Date.now()}`
          : product.id;

        const existingIndex = customizationData
          ? -1
          : get().items.findIndex((item) => item.id === product.id);

        if (existingIndex >= 0) {
          const items = [...get().items];
          items[existingIndex].quantity += quantity;
          set({ items });
        } else {
          set({
            items: [
              ...get().items,
              { id, product, quantity, customizationData, previewSnapshotUrl },
            ],
          });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
    }),
    { name: "artiz-cart" }
  )
);
