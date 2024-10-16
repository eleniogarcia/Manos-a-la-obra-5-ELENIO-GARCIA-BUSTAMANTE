import React, { useState, useEffect } from 'react';
import Layout from '../organism/Layout';
import ProjectList from '../molecules/ProjectList';
import Loader from '../atoms/Loader';
import './css/MyProjects.css';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setProjects([
        { id: 1, name: 'Project Alpha', description: 'Description for Alpha' },
        { id: 2, name: 'Project Beta', description: 'Description for Beta' },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Layout title="My Projects">
      <div className="my-projects-page">
        {loading ? <Loader /> : <ProjectList projects={projects} />}
      </div>
    </Layout>
  );
};

export default MyProjects;
