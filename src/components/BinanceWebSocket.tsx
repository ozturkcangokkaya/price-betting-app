import React, { useEffect } from "react";
import useWebSocket from "@/hooks/useWebSocket";

const BinanceWebSocket: React.FC = () => {
  const BINANCE_BTC_WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";
  const { closeWebSocket } = useWebSocket(BINANCE_BTC_WS_URL);

  useEffect(() => {
    return () => {
      closeWebSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default BinanceWebSocket;
