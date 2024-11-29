import React, { useState } from 'react'; 
import { Route, Routes, Navigate } from "react-router-dom";
import Header from './components/organism/Header'; // Header principal
import Sidebar from './components/molecules/Sidebar'; // Sidebar de navegación
import Home from './components/pages/Home'; // Página de inicio
import MyProjects from './components/pages/MyProjects'; // Lista de proyectos
import ProjectDetail from './components/pages/ProjectDetail'; // Detalle de proyecto
import EpicDetail from './components/pages/EpicDetail'; // Detalle de épica
import StoryDetail from './components/pages/StoryDetail'; // Detalle de historia
import Login from './components/pages/login'; // Página de login
import PageWrapper from './components/PageWrapper'; // Envuelve páginas para personalizar títulos
import MyStories from './components/pages/MyStories'; // Lista de historias
import SettingsPage from './components/pages/SettingsPage'; // Página de configuración
import Register from './components/pages/Register'; // Página de registro
import './App.css'; // Estilos de la app

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar si el Sidebar está abierto o cerrado
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); 
  // Verifica si hay un token en localStorage para determinar si el usuario está autenticado
  const [title, setTitle] = useState("Gestor de Tareas"); // Título dinámico de la página

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Alterna el estado de visibilidad del Sidebar
  };

  return (
    <div className="app-container">
      {/* Renderiza el Sidebar y pasa el estado y la función para cerrarlo */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
      
      <main className="main-content">
        <PageWrapper setTitle={setTitle}>
          <Routes>
            {/* Configuración de rutas para las diferentes secciones de la app */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
            <Route path="/my-stories" element={isAuthenticated ? <MyStories /> : <Navigate to="/login" />} />
            <Route path="/my-projects" element={isAuthenticated ? <MyProjects /> : <Navigate to="/login" />} />
            <Route path="/my-projects/:projectId" element={isAuthenticated ? <ProjectDetail /> : <Navigate to="/login" />} />
            <Route path="/my-projects/:projectId/epics/:epicId" element={isAuthenticated ? <EpicDetail /> : <Navigate to="/login" />} />
            <Route path="/my-projects/:projectId/epics/:epicId/story/:storyId" element={isAuthenticated ? <StoryDetail /> : <Navigate to="/login" />} />
          </Routes>
        </PageWrapper>
      </main>
    </div>
  );
};

export default App;
