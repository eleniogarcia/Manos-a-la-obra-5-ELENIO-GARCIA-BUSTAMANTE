// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from './components/organism/Header';
import Sidebar from './components/molecules/Sidebar';
import Home from './components/pages/Home';
import MyProjects from './components/pages/MyProjects';
import ProjectDetail from './components/pages/ProjectDetail';
import EpicDetail from './components/pages/EpicDetail';
import StoryDetail from './components/pages/StoryDetail';
import Login from './components/pages/Login'; // Componente Login
import './App.css';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Verifica si hay un token en localStorage

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <Header title="Gestor de Tareas" />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            {/* Redirige a MyProjects si está autenticado */}
            <Route path="/my-projects" element={isAuthenticated ? <MyProjects /> : <Navigate to="/login" />} />
            <Route path="/my-projects/:projectId" element={isAuthenticated ? <ProjectDetail /> : <Navigate to="/login" />} />
            {/* Corrige la ruta para EpicDetail */}
            <Route path="/my-projects/:projectId/epics/:epicId" element={isAuthenticated ? <EpicDetail /> : <Navigate to="/login" />} />

            <Route path="/my-projects/:projectId/epics/:epicId/story/:storyId" element={isAuthenticated ? <StoryDetail /> : <Navigate to="/login" />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
