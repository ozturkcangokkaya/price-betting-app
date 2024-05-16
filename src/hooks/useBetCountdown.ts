import { useEffect } from "react";
import useBetStore from "@/store/betStore";
import useUserStore from "@/store/userStore";
import { DEFAULT_BET_DURATION } from "@/hooks/constants";

const useBetCountdown = () => {
  const { setCountdown, decreaseCountdown } = useBetStore();
  const { userId, bets } = useUserStore();
  const latestBet = bets[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!latestBet) return;

    if (latestBet?.closePrice) {
      setCountdown(0);
      return;
    }

    const handleBetProgress = () => {
      const openedAt = latestBet.openedAt;
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - openedAt) / 1000);
      const timeBeforeEnablingButtons = Math.max(
        0,
        DEFAULT_BET_DURATION - elapsedTime
      );
      setCountdown(timeBeforeEnablingButtons);

      if (timeBeforeEnablingButtons > 0) {
        timer = setInterval(() => {
          decreaseCountdown();
        }, 1000);

        setTimeout(() => {
          clearInterval(timer);
        }, timeBeforeEnablingButtons * 1000);

        return () => clearInterval(timer);
      }
    };

    handleBetProgress();

    return () => {
      clearInterval(timer);
    };
  }, [latestBet, setCountdown, decreaseCountdown, userId]);
};

export default useBetCountdown;
