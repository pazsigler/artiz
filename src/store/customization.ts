import { create } from "zustand";
import type { CustomizationData } from "@/types";

interface CustomizationStore {
  text: string;
  font: string;
  addons: string[];
  setText: (text: string) => void;
  setFont: (font: string) => void;
  toggleAddon: (addon: string) => void;
  reset: () => void;
  getData: () => CustomizationData;
}

export const useCustomizationStore = create<CustomizationStore>((set, get) => ({
  text: "",
  font: "",
  addons: [],

  setText: (text) => set({ text }),
  setFont: (font) => set({ font }),

  toggleAddon: (addon) => {
    const addons = get().addons.includes(addon)
      ? get().addons.filter((a) => a !== addon)
      : [...get().addons, addon];
    set({ addons });
  },

  reset: () => set({ text: "", font: "", addons: [] }),

  getData: () => ({
    text: get().text,
    font: get().font,
    addons: get().addons,
  }),
}));
