import React from 'react';
import ProjectCard from '../atoms/ProjectCard';
import './css/ProjectList.css';

const ProjectList = ({ projects, onClickProject }) => {
  return (
    <div className="project-list">
      {projects.length === 0 ? (
        <p>No projects assigned.</p>
      ) : (
        projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onClickProject(project.id)}
          />
        ))
      )}
    </div>
  );
};

export default ProjectList;
