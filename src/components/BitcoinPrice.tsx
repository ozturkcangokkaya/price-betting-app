import React from "react";
import useUserStore from "@/store/userStore";
import usePriceStore from "@/store/priceStore";

const BitcoinPrice: React.FC = () => {
  const { score } = useUserStore();
  const { price } = usePriceStore();

  return (
    <div className="bg-gradient-to-br from-indigo-400 to-teal-500 p-6 rounded-lg shadow-lg flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-semibold text-white">
          BTC / USD: {price?.toFixed(2)}$
        </h1>
      </div>
      <div>
        <h2 className="text-2xl text-white">Score: {score}</h2>
      </div>
    </div>
  );
};

export default BitcoinPrice;
