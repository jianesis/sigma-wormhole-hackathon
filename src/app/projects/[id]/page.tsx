"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useSwap } from "@/app/components/SwapContext";

// Define the Project type based on your data structure
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ownerName: string;
  ownerImage: string;
  isActive: boolean;
  fundingGoal: number;
  currentFunding: number;
  backers: number;
  daysLeft: number;
}

// Import the sample projects data
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "TreeTherium Ignition Event",
    description:
      "This TreeTherium event is an in-house activity where with a select number of invitees we will launch the TreeTherium DAO, host a tree planting event, plant the TreeTherium Mother Tree, and enjoy a lunch together.Community-driven solar power installation project for sustainable energy",
    imageUrl: "/images/TT-Ignition-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
    isActive: false,
    fundingGoal: 100,
    currentFunding: 65,
    backers: 123,
    daysLeft: 15,
  },
  {
    id: "2",
    title: "TreeTherium Ignition Project Kenya",
    description:
      "TreeTherium harnesses the power of blockchain technology to ensure transparency and accountability in its tree planting initiatives. This innovative approach allows for every planted tree to be tracked and monitored, ensuring long-term survival and growth.",
    imageUrl: "/images/TT-Ignition-Kenya-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
    isActive: false,
    fundingGoal: 100,
    currentFunding: 65,
    backers: 123,
    daysLeft: 15,
  },
  {
    id: "3",
    title: "Towards A Greener Ghana",
    description:
      "We have been approached by an entity linked to the Ghanese Government to get involved in a large scale Tree Planting project for Ghana. The community get the chance to plant 2 Billion trees in the next 5 years. We are looking for partners to assist in the rollout of this project.",
    imageUrl: "/images/TT-Ghana-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
    isActive: true,
    fundingGoal: 100,
    currentFunding: 65,
    backers: 123,
    daysLeft: 15,
  },
  {
    id: "4",
    title: "Kenya Tree Planting Project",
    description:
      "We are currently working with the Kenyan Goverment, and related parties to plant 15 Billion Trees in Kenya in the next 7 years. Because this is a longterm project, we are open to collaborate with potential partners.",
    imageUrl: "/images/TT-Kenya-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
    isActive: true,
    fundingGoal: 100,
    currentFunding: 65,
    backers: 123,
    daysLeft: 15,
  },
  {
    id: "5",
    title: "University Malaysia Tree Event",
    description:
      "We are currently working with 3 Malaysian Universties to organise a combined Tree Planting event, near one of their campuses in November 2024.",
    imageUrl: "/images/TT-Uni-Malaysia-Event.jpg",
    ownerName: "Frank Amptmeijer",
    ownerImage: "/images/FrankA.jpg",
    isActive: true,
    fundingGoal: 100,
    currentFunding: 65,
    backers: 123,
    daysLeft: 15,
  },
  {
    id: "6",
    title: "Tzu Chi Phillipines Tree Planting Event",
    description:
      "Tzu Chi Phillipines wants to plant 1000 trees in the Philippines in the next 5 years. We are looking for partners to assist in the rollout of this project.",
    imageUrl: "/images/TzuChi_PlantTree_Event.jpg",
    ownerName: "Tzu Chi Phillipines",
    ownerImage: "/images/tzu_chi_logo.jpg",
    isActive: false,
    fundingGoal: 100,
    currentFunding: 65,
    backers: 123,
    daysLeft: 15,
  },
];

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = sampleProjects.find((p) => p.id === params.id);
  const [count, setCount] = useState(65);
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const { isSwapOpen, setIsSwapOpen } = useSwap();
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balanceLamports = await connection.getBalance(publicKey);
          const balanceSOL = balanceLamports / LAMPORTS_PER_SOL;
          setBalance(balanceSOL);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
  }, [publicKey, connection]);

  if (!publicKey) {
    return <p>Please connect your wallet.</p>;
  }

  if (!project) {
    return null;
  }

  const handleBackProject = () => {
    if (balance && balance <= 1) {
      setIsSwapOpen(true);
    }
    setCount(count + 1);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="pt-25">
        {/* Hero Section - Full Width Image */}
        <div className="relative w-full h-[600px] mb-8">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={project.ownerImage}
                    alt={project.ownerName}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="ml-4 text-lg">{project.ownerName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  About the Project
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>

              {/* Gallery Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Add multiple project images here */}
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt="Gallery 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Add more gallery items */}
                </div>
              </motion.div>
            </div>

            {/* Funding Card - Fixed on Desktop */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8 sticky top-32"
              >
                <div className="space-y-6">
                  {/* Funding Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold text-green-900">
                        {count} SOL
                      </span>
                      <span className="text-gray-500">
                        of {project.fundingGoal} SOL goal
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{
                          width: `${
                            (project.currentFunding / project.fundingGoal) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                    <div>
                      <p className="text-gray-500">Backers</p>
                      <p className="text-2xl font-bold">{project.backers}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Days Left</p>
                      <p className="text-2xl font-bold">{project.daysLeft}</p>
                    </div>
                  </div>
                  <h3 className="text-black">
                    Current Balance = {balance} SOL{" "}
                  </h3>
                  {/* Action Buttons */}
                  <button
                    onClick={handleBackProject}
                    className="w-full bg-[#2F855A] hover:bg-[#143728] text-white font-bold py-4 px-6 rounded-full transition-colors duration-300"
                  >
                    Contribute 1 Sol
                  </button>

                  {project.isActive && (
                    <button className="w-full border-2 border-[#2F855A] text-[#2F855A] hover:bg-[#2F855A] hover:text-white font-bold py-4 px-6 rounded-full transition-colors duration-300">
                      Share
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
