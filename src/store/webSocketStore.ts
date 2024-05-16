import { create } from "zustand";

interface WebSocketState {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const useWebSocketStore = create<WebSocketState>((set) => ({
  isConnected: false,
  connect: () => set({ isConnected: true }),
  disconnect: () => set({ isConnected: false }),
}));

export default useWebSocketStore;
