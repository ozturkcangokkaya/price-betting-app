import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { BetDirection } from "@/types";
import { createBet } from "@/api/createBet";
import useUserStore from "@/store/userStore";

const useBetCreation = () => {
  const { userId, addBet } = useUserStore();

  const handleBetCreation = async (direction: BetDirection, price: number) => {
    try {
      const bet = {
        userId,
        betId: uuidv4(),
        openPrice: price,
        closePrice: undefined,
        openedAt: Date.now(),
        direction,
      };

      await createBet(bet);
      addBet(bet);
      toast.success(`Your bet has been placed`);
    } catch (error) {
      toast.error(`Failed to place bet`);
    }
  };

  return { handleBetCreation };
};

export default useBetCreation;
