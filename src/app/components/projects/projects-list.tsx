// components/ProjectList.tsx
import React from "react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";

const ProjectList = ({ projects }: any) => {
  const activeProjects = projects.filter((project: any) => project.isActive);
  const upcomingProjects = projects.filter((project: any) => !project.isActive);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 text-green-900">Live Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
        {activeProjects.map((project: any) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-green-900">Past Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {upcomingProjects.map((project: any) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
