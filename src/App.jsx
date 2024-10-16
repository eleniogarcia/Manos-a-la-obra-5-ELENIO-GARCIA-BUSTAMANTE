import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from './components/organism/Header';
import Sidebar from './components/molecules/Sidebar';
import Home from './components/pages/Home';
import MyProjects from './components/pages/MyProjects';
import ProjectDetail from './components/pages/ProjectDetail';
import EpicDetail from './components/pages/EpicDetail';
import StoryDetail from './components/pages/StoryDetail';
import './App.css';

// Componente para determinar el título basado en la ruta
const TitleBasedOnRoute = () => {
  const location = useLocation();

  switch (location.pathname) {
    case "/":
      return "Página Principal";
    case "/my-projects":
      return "Mis Proyectos";
    case "/my-projects/:projectId":
      return "Detalles del Proyecto";
    case "/my-projects/:projectId/epic-k/:epicId":
      return "Detalles de la Épica";
    case "/my-projects/:projectId/epic-k/:epicId/story-j":
      return "Detalles de la Historia";
    default:
      return "Gestor de Tareas"; // Título por defecto
  }
};

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <Header title={<TitleBasedOnRoute />} /> {/* Pasa el título al Header */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="/my-projects/:projectId" element={<ProjectDetail />} />
            <Route path="/my-projects/:projectId/epic-k/:epicId" element={<EpicDetail />} />
            <Route path="/my-projects/:projectId/epic-k/:epicId/story-j" element={<StoryDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
