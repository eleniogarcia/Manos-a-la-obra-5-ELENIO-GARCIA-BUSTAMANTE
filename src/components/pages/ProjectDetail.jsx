import React from 'react';
import Layout from '../organism/Layout';
import './css/ProjectDetail.css';

const ProjectDetail = ({ project }) => {
  return (
    <Layout title={project.name}>
      <div className="project-detail">
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        {/* List of Epics */}
      </div>
    </Layout>
  );
};

export default ProjectDetail;
