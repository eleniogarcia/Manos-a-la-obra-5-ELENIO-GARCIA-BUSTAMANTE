import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageWrapper = ({ children, setTitle, projectName }) => {
  const location = useLocation(); // Obtiene la ubicación actual (ruta) de la app

  useEffect(() => {
    // Cambia el título de la página según la ruta
    let title;
    switch (location.pathname) {
      case '/home':
        title = "HOME";
        break;
      case '/login':
        title = "Iniciar Sesión - Gestor de Tareas";
        break;
      case '/my-projects':
        title = "MY PROJECTS";
        break;
      case '/register':
        title = "Registrarse - Gestor de Tareas";
        break;
      case '/my-stories':
        title = "Mis Historias - Gestor de Tareas";
        break;
      case '/':
        title = "Inicio - Gestor de Tareas";
        break;
      case '/settings':
        title = "Configuración - Gestor de Tareas";
        break;
      default:
        if (location.pathname.includes('/my-projects/')) {
          title = projectName || "Detalle de Proyecto - Gestor de Tareas";
        } else {
          title = "Gestor de Tareas";
        }
        break;
    }

    setTitle(title); // Actualiza el estado del título en el componente App
    document.title = title; // Cambia el título del documento HTML
  }, [location, setTitle, projectName]); // Efecto depende de los cambios en la ruta, el título y el nombre del proyecto

  return <>{children}</>; // Renderiza los componentes hijos
};

export default PageWrapper;
