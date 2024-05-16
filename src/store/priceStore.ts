import { create } from "zustand";

interface priceState {
  price: number;
  setPrice: (price: number) => void;
}

const usePriceStore = create<priceState>((set) => ({
  price: 0,
  setPrice: (price) => set({ price }),
}));

export default usePriceStore;
