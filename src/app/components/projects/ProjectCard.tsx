// components/ProjectCard.tsx
import React from "react";

const ProjectCard = ({ project }: any) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-bold">{project.name}</h3>
      <p>{project.description}</p>
      <p>Starts: {new Date(project.startTime).toLocaleString()}</p>
      <p>Ends: {new Date(project.endTime).toLocaleString()}</p>
      <p>
        Total Contribution: {project.totalContribution} {project.chain}
      </p>
      {project.isActive && (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => project.onContribute(project.id)}
        >
          Contribute
        </button>
      )}
    </div>
  );
};

export default ProjectCard;
