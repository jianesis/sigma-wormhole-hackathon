"use client";
import useCrowdfundingData from "./hooks/useCrowdfundingData";
import ContributionCard from "./components/ContributionCard";
import ContributeForm from "./components/ContributionForm";

export default function Home() {
  const { chainsData, totalFunding, refreshData } = useCrowdfundingData();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="py-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Cross-Chain Crowdfunding
        </h1>
        <p className="text-gray-700">
          Contribute from any chain and see real-time funding!
        </p>
      </header>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {chainsData.map((chain) => (
          <ContributionCard key={chain.name} chain={chain} />
        ))}
      </div>

      <div className="my-6 text-center">
        <h2 className="text-2xl font-semibold">
          Total Funding Across Chains: ${totalFunding}
        </h2>
      </div>

      <ContributeForm onContribution={refreshData} />
    </div>
  );
}
