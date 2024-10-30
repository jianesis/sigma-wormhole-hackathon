"use client";
import { useState, useEffect } from "react";

const mockChainsData = [
  { name: "Ethereum", contribution: 0 },
  { name: "Solana", contribution: 0 },
];

export default function useCrowdfundingData() {
  const [chainsData, setChainsData] = useState(mockChainsData);
  const [totalFunding, setTotalFunding] = useState(0);

  const refreshData = (chainName: string, amount: number) => {
    setChainsData((prevData) =>
      prevData.map((chain) =>
        chain.name === chainName
          ? { ...chain, contribution: chain.contribution + amount }
          : chain
      )
    );
  };

  useEffect(() => {
    const newTotal = chainsData.reduce(
      (acc, chain) => acc + chain.contribution,
      0
    );
    setTotalFunding(newTotal);
  }, [chainsData]);

  return { chainsData, totalFunding, refreshData };
}
