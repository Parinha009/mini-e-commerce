'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  servings?: string;
  price: number;
  qty: number;
  img?: string;
};

export const PROTECT_PRICE = 2.95;

type CartState = {
  items: CartItem[];
  protectPlus: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  setProtectPlus: (v: boolean) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      protectPlus: false,

      addItem: (item) =>
        set((s) => {
          const found = s.items.find((i) => i.id === item.id);
          if (found) {
            return {
              items: s.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
              ),
            };
          }
          return { items: [...s.items, item] };
        }),

      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      inc: (id) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
        })),
      dec: (id) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
          ),
        })),
      setProtectPlus: (v) => set(() => ({ protectPlus: v })),
      clearCart: () => set(() => ({ items: [], protectPlus: false })),
      setItems: (items) => set(() => ({ items })),
    }),
    {
      name: 'fitfuel-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, protectPlus: s.protectPlus }),
    }
  )
);

