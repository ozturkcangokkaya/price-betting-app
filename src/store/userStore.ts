import { create } from "zustand";
import { Bet } from "@/types";

interface UserState {
  userId: string;
  score: number;
  bets: Bet[];
  addBet: (bet: Bet) => void;
  updateBet: (updatedBet: Bet) => void;
  addScore: () => void;
  subtractScore: () => void;
  login: (userId: string, score: number, bets: Bet[]) => void;
  resetUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: "",
  score: 0,
  bets: [],
  addBet: (bet) => set((state) => ({ bets: [bet, ...state.bets] })),
  updateBet: (updatedBet) =>
    set((state) => ({
      bets: state.bets.map((bet) =>
        bet.betId === updatedBet.betId ? updatedBet : bet
      ),
    })),
  addScore: () => set((state) => ({ score: state.score + 1 })),
  subtractScore: () => set((state) => ({ score: state.score - 1 })),
  login: (userId, score, bets) => set({ userId, score, bets }),
  resetUser: () =>
    set({
      userId: "",
      score: 0,
      bets: [],
    }),
}));

export default useUserStore;
