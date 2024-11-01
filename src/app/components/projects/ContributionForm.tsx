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
    <div 
      className="w-full min-h-[600px] relative flex items-center justify-center py-16"
      style={{
        backgroundImage: "url('/images/contribution_banner.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="w-full max-w-2xl px-4 relative z-10">
        <div className="bg-white rounded-[20px] overflow-hidden shadow-lg">
          {/* Card Header with Title and Message */}
          <div className="p-8 bg-green-900 text-white text-center">
            <h2 className="text-3xl font-bold mb-3">Contribute to the Crowdfund</h2>
            <p className="text-xl">Your Contribution Matters!</p>
            <p className="text-lg mt-2 opacity-90">Join Us in Growing a Greener Future</p>
          </div>

          {/* Form Section */}
          <form className="p-8" onSubmit={handleSubmit}>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:border-green-900 text-gray-700 font-inter"
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              required
            >
              <option value="">Select Chain</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Solana">Solana</option>
            </select>

            <input
              type="number"
              placeholder="Amount (USD)"
              className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:border-green-900 text-gray-700 font-inter placeholder:text-gray-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-green-900 text-white py-4 rounded-lg hover:bg-green-800 transition-colors font-semibold text-lg"
            >
              Contribute
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
