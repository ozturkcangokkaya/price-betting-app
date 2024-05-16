import React from "react";
import usePriceStore from "@/store/priceStore";
import useBetCreation from "@/hooks/useBetCreation";
import useBetCountdown from "@/hooks/useBetCountdown";
import useBetResolver from "@/hooks/useBetResolver";
import useBetStore from "@/store/betStore";

const BetButtons: React.FC = () => {
  const { price } = usePriceStore();
  const { isBusy, countdown } = useBetStore();
  const { handleBetCreation } = useBetCreation();
  useBetCountdown();
  useBetResolver();

  return (
    <div className="flex items-center justify-end space-x-4">
      <div className="text-lg font-semibold">Countdown: {countdown}</div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
        type="button"
        onClick={() => handleBetCreation("up", price)}
        disabled={isBusy()}
      >
        Up
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
        type="button"
        onClick={() => handleBetCreation("down", price)}
        disabled={isBusy()}
      >
        Down
      </button>
    </div>
  );
};

export default BetButtons;
