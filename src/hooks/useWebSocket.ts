import { useEffect, useRef } from "react";
import usePriceStore from "@/store/priceStore";
import useWebSocketStore from "@/store/webSocketStore";

interface WebSocketData {
  closeWebSocket: () => void;
}

const useWebSocket = (url: string): WebSocketData => {
  const { connect, isConnected } = useWebSocketStore();
  const { setPrice } = usePriceStore();
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isConnected && !webSocketRef.current) {
      const webSocket = new WebSocket(url);

      webSocket.onopen = () => {
        webSocketRef.current = webSocket;
        connect();
      };

      webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setPrice(Number(data.p));
      };

      webSocket.onclose = () => {
        webSocketRef.current = null;
      };

      webSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => {
        if (webSocketRef.current) {
          webSocketRef.current.close();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeWebSocket = () => {
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
  };

  return { closeWebSocket };
};

export default useWebSocket;
