// Add this at the very beginning of the file to make this a Client Component
"use client";

import { useEffect } from 'react';

// This component is specific for the App Router
const ProjectPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  useEffect(() => {
    // Fetch project details using the `id`
    // Example: fetchProjectDetails(id);
  }, [id]);

  return (
    <div>
      <h1>Project ID: {id}</h1>
      <p>Project details for project {id}...</p>
    </div>
  );
};

export default ProjectPage;
