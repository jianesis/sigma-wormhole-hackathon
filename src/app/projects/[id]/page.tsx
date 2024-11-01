"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define the Project type based on your data structure
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ownerName: string;
  ownerImage: string;
  isActive: boolean;
}

// Import the sample projects data
const sampleProjects: Project[] = [
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

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Find the project with matching ID
    const foundProject = sampleProjects.find(p => p.id === params.id);
    setProject(foundProject || null);
  }, [params.id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-red-600">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          {/* Project Image */}
          <div className="w-full h-[400px] relative">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/30" />
          </div>

          {/* Project Details */}
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={project.ownerImage} 
                alt={project.ownerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{project.ownerName}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  project.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {project.isActive ? 'Active' : 'Completed'}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-green-900">{project.title}</h1>
            <p className="text-gray-700 leading-relaxed mb-8">{project.description}</p>

            {project.isActive && (
              <button className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition-colors">
                Contribute to Project
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectPage;
