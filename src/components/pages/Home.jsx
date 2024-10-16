import React from 'react';
import Layout from '../organism/Layout';
import './css/Home.css';

const Home = () => {
  return (
    <Layout title="Home">
      <div className="home-page">
        <h2>Welcome to the Task Tracker</h2>
      </div>
    </Layout>
  );
};

export default Home;
