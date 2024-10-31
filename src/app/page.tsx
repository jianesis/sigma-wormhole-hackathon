"use client";
import useCrowdfundingData from "./hooks/useCrowdfundingData";
import ContributionCard from "./components/ContributionCard";
import ContributeForm from "./components/ContributionForm";

export default function Home() {
  const { chainsData, totalFunding, refreshData } = useCrowdfundingData();

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="w-full h-[400px] bg-cover bg-center flex items-center justify-center mb-12 relative"
           style={{
             backgroundImage: "url('/images/bamboo_banner.jpg')",
             backgroundSize: 'cover',
             backgroundPosition: 'center',
           }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
        
        <div className="text-center p-8 relative z-10">
          <h1 className="text-6xl font-bold mb-4 text-white font-inter tracking-tight text-shadow">
            Welcome to Bamboo$prout
          </h1>
          <p className="text-xl text-white font-inter text-shadow-sm">
            The eco-friendly multi-chain launchpad
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {chainsData.map((chain) => (
          <ContributionCard key={chain.name} chain={chain} />
        ))}
      </div>

      <div className="my-6 text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Total Funding Across Chains: ${totalFunding}
        </h2>
        <div className="text-lg text-gray-700">
          {chainsData.map((chain) => (
            <div key={chain.name}>
              {chain.name}: ${chain.contribution}
            </div>
          ))}
        </div>
      </div>

      <ContributeForm onContribution={refreshData} />
    </div>
  );
}
