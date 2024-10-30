// components/ProjectList.tsx
import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects }: any) => {
  const activeProjects = projects.filter((project: any) => project.isActive);
  const upcomingProjects = projects.filter((project: any) => !project.isActive);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Active Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeProjects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Upcoming Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {upcomingProjects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
