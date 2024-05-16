import { create } from "zustand";

interface BetState {
  countdown: number;
  setCountdown: (countdown: number) => void;
  isBusy: () => boolean;
  decreaseCountdown: () => void;
}

const useBetStore = create<BetState>((set, get) => ({
  countdown: 0,
  setCountdown: (countdown) => set({ countdown }),
  decreaseCountdown: () => set((state) => ({ countdown: state.countdown - 1 })),
  isBusy: () => get().countdown > 0,
}));

export default useBetStore;
