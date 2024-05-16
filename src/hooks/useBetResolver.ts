import { useEffect } from "react";
import { toast } from "react-toastify";
import { resolveBet } from "@/api/resolveBet";
import useUserStore from "@/store/userStore";
import useBetStore from "@/store/betStore";
import usePriceStore from "@/store/priceStore";
import { BetResult } from "@/types";
import { getBtcPriceAtTimestamp } from "@/api/getBtcPriceAtTimestamp";
import { DEFAULT_BET_DURATION } from "@/hooks/constants";

const useBetResolver = () => {
  const { userId, bets, updateBet, addScore, subtractScore } = useUserStore();
  const { countdown } = useBetStore();
  const { price } = usePriceStore();
  const latestBet = bets[0];

  const handleResult = (result?: BetResult) => {
    switch (result) {
      case "profit":
        addScore();
        toast.success(`Your bet closed with profit`);
        break;
      case "loss":
        subtractScore();
        toast.error(`Your bet closed with loss`);
        break;
      default:
        toast.info(`Your bet closed at the same price it was opened.`);
        break;
    }
  };

  const handleError = () => {
    toast.error(`Failed to update bet`);
  };

  useEffect(() => {
    if (!latestBet) return;

    const elapsedTimeInSeconds = Math.floor(
      (Date.now() - latestBet.openedAt) / 1000
    );

    if (elapsedTimeInSeconds < DEFAULT_BET_DURATION || latestBet.closePrice) {
      return;
    }

    const resolveAndUpdateBet = async () => {
      try {
        let closePrice = price;

        if (elapsedTimeInSeconds > DEFAULT_BET_DURATION) {
          closePrice = await getBtcPriceAtTimestamp(
            latestBet.openedAt + DEFAULT_BET_DURATION * 1000
          );
        }

        const { betId, direction, openPrice } = latestBet;
        const updatedBet = await resolveBet({
          userId,
          betId,
          closePrice,
          direction,
          openPrice,
        });

        if (updatedBet) {
          const { result } = updatedBet;
          updateBet(updatedBet);
          handleResult(result);
        } else {
          handleError();
        }
      } catch (error) {
        handleError();
      }
    };

    resolveAndUpdateBet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);
};

export default useBetResolver;
