"use client";
import useCrowdfundingData from "./hooks/useCrowdfundingData";
import ContributionCard from "./components/projects/ContributionCard";
import ContributeForm from "./components/projects/ContributionForm";
import ProjectList from "./components/projects/projects-list";
import { motion } from "framer-motion";

const sampleProjects = [
  {
    id: "1",
    title: "TreeTherium Ignition Event",
    description: "This TreeTherium event is an in-house activity where with a select number of invitees we will launch the TreeTherium DAO, host a tree planting event, plant the TreeTherium Mother Tree, and enjoy a lunch together.Community-driven solar power installation project for sustainable energy",
    imageUrl: "/images/TT-Ignition-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
    isActive: false
  },
  {
    id: "2",
    title: "TreeTherium Ignition Project Kenya",
    description: "TreeTherium harnesses the power of blockchain technology to ensure transparency and accountability in its tree planting initiatives. This innovative approach allows for every planted tree to be tracked and monitored, ensuring long-term survival and growth.",
    imageUrl: "/images/TT-Ignition-Kenya-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
    isActive: false
  },
  {
    id: "3",
    title: "Towards A Greener Ghana",
    description: "We have been approached by an entity linked to the Ghanese Government to get involved in a large scale Tree Planting project for Ghana. The community get the chance to plant 2 Billion trees in the next 5 years. We are looking for partners to assist in the rollout of this project.",
    imageUrl: "/images/TT-Ghana-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
    isActive: true
  },
  {
    id: "4",
    title: "Kenya Tree Planting Project",
    description: "We are currently working with the Kenyan Goverment, and related parties to plant 15 Billion Trees in Kenya in the next 7 years. Because this is a longterm project, we are open to collaborate with potential partners.",
    imageUrl: "/images/TT-Kenya-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
    isActive: true
  },
  {
    id: "5",
    title: "University Malaysia Tree Event",
    description: "We are currently working with 3 Malaysian Universties to organise a combined Tree Planting event, near one of their campuses in November 2024.",
    imageUrl: "/images/TT-Uni-Malaysia-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
    isActive: true
  },
  {
    id: "6",
    title: "Tzu Chi Phillipines Tree Planting Event",
    description: "Tzu Chi Phillipines wants to plant 1000 trees in the Philippines in the next 5 years. We are looking for partners to assist in the rollout of this project.",
    imageUrl: "/images/TzuChi_PlantTree_Event.jpg",
    ownerName: "Tzu Chi Phillipines",
    ownerImage: "/images/tzu_chi_logo.jpg",
    isActive: false
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
            <div className="flex-1 h-[2px] bg-[#143728]"></div>
            <div className="mx-[33px]">
              <h2 className="text-4xl md:text-5xl font-bold text-center font-inter text-green-900">Projects</h2>
            </div>
            <div className="flex-1 h-[2px] bg-[#143728]"></div>
          </div>
        </div>

        <ProjectList projects={sampleProjects} />
      </section>

      <section className="w-full bg-[#F5F5F5] py-16">
        <div className="px-[50px]">
          <div className="h-[2px] bg-[#143728]"></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 my-[50px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-green-900"
          >
            How To Use
          </motion.h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            {[
              { step: "1", title: "Connect Your Wallet", description: "Choose your preferred crypto wallets to get started" },
              { step: "2", title: "Choose Your Chain", description: "Swap your own tokens to the supported chains" },
              { step: "3", title: "Make Your Contribution", description: "Support projects with your contribution and track their progress" },
              { step: "4", title: "Watch It Grow", description: "Keep track of your contributions and watch them grow" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                className="flex items-start space-x-6 bg-transparent p-6 border-2 border-[#143728] rounded-[16px]"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-green-900 text-white rounded-full flex items-center justify-center font-bold text-lg"
                >
                  {step.step}
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-green-900">{step.title}</h3>
                  <p className="text-green-900">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContributeForm onContribution={refreshData} />

      <footer className="w-full bg-[#4F3738] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the TreeTherium Community</h2>
          <p className="mb-8">Stay updated with our latest projects and announcements</p>
          <div className="flex justify-center space-x-6">
            {[
              {
                name: 'Twitter',
                url: 'https://twitter.com',
                icon: (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )
              },
              {
                name: 'Discord',
                url: 'https://discord.com',
                icon: (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                )
              },
              {
                name: 'Telegram',
                url: 'https://telegram.org',
                icon: (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.065-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345c-.48.33-.913.49-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789c.027-.216.325-.437.893-.663c3.498-1.524 5.83-2.529 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                )
              }
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(platform.url, '_blank');
                }}
                className="cursor-pointer p-4 rounded-full hover:bg-green-800 transition-colors bg-green-900 group inline-flex items-center justify-center"
                aria-label={`Visit our ${platform.name} page`}
              >
                <div className="text-[#B87333] group-hover:text-white transition-colors">
                  {platform.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
