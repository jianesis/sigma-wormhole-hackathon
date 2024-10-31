"use client";
import { useState } from "react";
export default function ContributeForm({ onContribution }: any) {
  const [amount, setAmount] = useState("");
  const [chain, setChain] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onContribution(chain, parseFloat(amount));
    setAmount("");
    setChain("");
  };

  return (
    <form
      className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-8"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-semibold text-center mb-4">
        Contribute to the Crowdfund
      </h3>

      <select
        className="w-full border-gray-300 p-2 rounded mb-4"
        value={chain}
        onChange={(e) => setChain(e.target.value)}
        required
      >
        <option value="">Select Chain</option>
        <option value="Ethereum">Ethereum</option>
        <option value="Solana">Solana</option>
        {/* Add more chains as needed */}
      </select>

      <input
        type="number"
        placeholder="Amount (USD)"
        className="w-full border-gray-300 p-2 rounded mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Contribute
      </button>
    </form>
  );
}
