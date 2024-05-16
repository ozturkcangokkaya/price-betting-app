import BitcoinPrice from "@/components/BitcoinPrice";
import useUserAuth from "@/hooks/useUserAuth";
import BetButtons from "@/components/BetButtons";
import Bets from "@/components/Bets";
import useWebSocketStore from "@/store/webSocketStore";
import BinanceWebSocket from "@/components/BinanceWebSocket";
import Loader from "@/components/Loader";
import usePriceStore from "@/store/priceStore";
import useUserStore from "@/store/userStore";
import { useEffect } from "react";
import useBetStore from "../store/betStore";

const LoggedInUser = () => {
  const { isError: failedToLoadUser } = useUserAuth();
  const { isConnected, disconnect } = useWebSocketStore();
  const { price } = usePriceStore();
  const { userId, resetUser } = useUserStore();
  const { setCountdown } = useBetStore();
  const appReady = Boolean(isConnected && price && userId);

  useEffect(() => {
    return () => {
      resetUser();
      disconnect();
      setCountdown(0);
    };
  }, [disconnect, resetUser, setCountdown]);

  if (failedToLoadUser) return <p>Error fetching user data</p>;

  return (
    <>
      <BinanceWebSocket />

      {appReady ? (
        <>
          <BitcoinPrice />
          <div className="mt-8">
            <BetButtons />
          </div>
          <div className="mt-8">
            <Bets />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default LoggedInUser;
