"use client";
import useCrowdfundingData from "./hooks/useCrowdfundingData";
import ContributionCard from "./components/ContributionCard";
import ContributeForm from "./components/ContributionForm";
import ProjectCard from "./components/projects/ProjectCard";

const sampleProjects = [
  {
    id: "1",
    title: "TreeTherium Ignition Event",
    description: "This TreeTherium event is an in-house activity where with a select number of invitees we will launch the TreeTherium DAO, host a tree planting event, plant the TreeTherium Mother Tree, and enjoy a lunch together.Community-driven solar power installation project for sustainable energy",
    imageUrl: "/images/TT-Ignition-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
  },
  {
    id: "2",
    title: "TreeTherium Ignition Project Kenya",
    description: "TreeTherium harnesses the power of blockchain technology to ensure transparency and accountability in its tree planting initiatives. This innovative approach allows for every planted tree to be tracked and monitored, ensuring long-term survival and growth.",
    imageUrl: "/images/TT-Ignition-Kenya-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
  },
  {
    id: "3",
    title: "Towards A Greener Ghana",
    description: "We have been approached by an entity linked to the Ghanese Government to get involved in a large scale Tree Planting project for Ghana. The community get the chance to plant 2 Billion trees in the next 5 years. We are looking for partners to assist in the rollout of this project.",
    imageUrl: "/images/TT-Ghana-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
  },
  {
    id: "4",
    title: "Kenya Tree Planting Project",
    description: "We are currently working with the Kenyan Goverment, and related parties to plant 15 Billion Trees in Kenya in the next 7 years. Because this is a longterm project, we are open to collaborate with potential partners.",
    imageUrl: "/images/TT-Kenya-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
  },
  {
    id: "5",
    title: "University Malaysia Tree Event",
    description: "We are currently working with 3 Malaysian Universties to organise a combined Tree Planting event, near one of their campuses in November 2024.",
    imageUrl: "/images/TT-Uni-Malaysia-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
  },
  {
    id: "6",
    title: "Wind Farm Development",
    description: "Offshore wind farm project for clean energy production",
    imageUrl: "/images/project6.jpg",
    ownerName: "Emma Davis",
    ownerImage: "/images/avatar6.jpg",
  },
];

export default function Home() {
  const { chainsData, totalFunding, refreshData } = useCrowdfundingData();

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="w-full h-[400px] bg-cover bg-center flex items-center justify-center mb-12 relative pt-16"
        style={{
          backgroundImage: "url('/images/bamboo_banner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
        
        <div className="text-center p-8 relative z-10">
          <h1 className="text-6xl font-bold mb-4 text-white font-inter tracking-tight text-shadow">
            Welcome to Treetherium Launchpad
          </h1>
          <p className="text-xl text-white font-inter text-shadow-sm">
            The eco-friendly multi-chain launchpad
          </p>
        </div>
      </div>

      <div className="relative w-full py-[169px] px-[50px] mb-16">
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-2 justify-start">
          <div className="flex-1 animate-showUp">
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6 font-inter">
              From Greenbacks to Green Growth
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl font-inter">
              Treetherium Launchpad delivers multichain support, enabling green initiatives and eco-conscious projects to thrive across the blockchain ecosystem.
            </p>
          </div>

          <div className="hidden md:block w-[2px] bg-green-900 self-stretch mx-2"></div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
            <ContributionCard 
              title="Total Funding"
              amount={totalFunding}
              isTotal={true}
            />
            
            <ContributionCard 
              title="Ethereum"
              amount={chainsData.find(chain => chain.name === 'Ethereum')?.contribution ?? 0}
            />
            
            <ContributionCard 
              title="Solana"
              amount={chainsData.find(chain => chain.name === 'Solana')?.contribution ?? 0}
            />
          </div>
        </div>
      </div>

      <section className="w-full my-16">
        <div className="relative flex items-center justify-center px-[50px]">
          <div className="flex items-center w-full">
            {/* Left line separator */}
            <div className="flex-1 h-[2px] bg-[#143728]"></div>
            
            {/* Added specific spacing */}
            <div className="mx-[33px]">
              <h2 className="text-4xl md:text-5xl font-bold text-center font-inter text-green-900">Live Projects</h2>
            </div>
            
            {/* Right line separator */}
            <div className="flex-1 h-[2px] bg-[#143728]"></div>
          </div>
        </div>
        
        <div className="mt-12 px-[50px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F5F5F5] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-900">How To Use</h2>
          <div className="space-y-8">
            {[
              { step: "1", title: "Connect Your Wallet", description: "Choose your preferred blockchain wallet to get started" },
              { step: "2", title: "Choose Your Chain", description: "Select the blockchain network you want to contribute to" },
              { step: "3", title: "Make Your Contribution", description: "Support projects with your contribution and track their progress" },
              { step: "4", title: "Watch It Grow", description: "Monitor your investments and see your contributions flourish" }
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-4 bg-transparent p-6 rounded-lg">
                <div className="w-10 h-10 bg-green-900 text-white rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-green-900">{step.title}</h3>
                  <p className="text-green-900">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContributeForm onContribution={refreshData} />

      <footer className="w-full bg-[#4F3738] text-white py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the TreeTherium Community</h2>
          <p className="mb-8">Stay updated with our latest projects and announcements</p>
          <div className="flex justify-center space-x-6">
            {['Twitter', 'Discord', 'Telegram'].map((platform) => (
              <button key={platform} className="px-6 py-2 bg-green-900 rounded-full hover:bg-green-800 transition-colors">
                {platform}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
