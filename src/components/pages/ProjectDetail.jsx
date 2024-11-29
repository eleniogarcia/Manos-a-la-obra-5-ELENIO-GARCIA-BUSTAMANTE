import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/ProjectDetail.css';
import Header from '../organism/Header';

const ProjectDetail = () => {
  const { projectId } = useParams(); // Obtener el ID del proyecto desde los parámetros de la URL
  const [project, setProject] = useState(null); // Estado para almacenar los detalles del proyecto
  const [epics, setEpics] = useState([]); // Estado para almacenar las épicas del proyecto
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(''); // Estado para manejar errores

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true); // Activar estado de carga
      const token = localStorage.getItem('token'); // Obtener token del localStorage

      if (!token) {
        setError('No estás autenticado. Por favor, inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        // Petición para obtener los detalles del proyecto
        const response = await fetch(`http://localhost:3001/projects/${projectId}`, {
          method: 'GET',
          headers: {
            'auth': token, // Enviar token en la cabecera
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el proyecto');
        }

        const data = await response.json();
        setProject(data); // Guardar los detalles del proyecto en el estado

        // Petición para obtener las épicas del proyecto
        const epicsResponse = await fetch(`http://localhost:3001/epics/project/${projectId}`, {
          method: 'GET',
          headers: {
            'auth': token, // Enviar token en la cabecera
            'Content-Type': 'application/json',
          },
        });

        if (!epicsResponse.ok) {
          throw new Error('Error al obtener las épicas');
        }

        const epicsData = await epicsResponse.json();
        setEpics(epicsData); // Guardar las épicas en el estado
      } catch (error) {
        setError(error.message); // Manejo de errores
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    fetchProjectDetails();
  }, [projectId]); // useEffect se ejecuta cada vez que cambia el projectId

  if (loading) {
    return <p>Cargando detalles del proyecto y épicas...</p>; // Mientras se cargan los datos, mostrar mensaje
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>; // Si hay error, mostrar mensaje de error
  }

  if (!project) {
    return <p>No se encontraron detalles del proyecto.</p>; // Si no se encontró el proyecto
  }

  return (
    <div className="project-detail-container">
      <Header title={project.name} />
      <h1>"-----------------------------"</h1>
      <Link to="/my-projects" className="back-button">← Volver a My Projects</Link> 
      <p className="project-detail-description">{project.description}</p>

      <h2>Épicas del Proyecto</h2>
      <div className="epic-list">
        {epics.length > 0 ? (
          epics.map((epic) => (
            <Link to={`/my-projects/${projectId}/epics/${epic._id}`} key={epic._id} className="epic-item">
              <span className="epic-icon">{epic.icon}</span>
              <h4>{epic.name}</h4>
              <p>{epic.description}</p>
            </Link>
          ))
        ) : (
          <p>No hay épicas en este proyecto.</p> // Si no hay épicas, mostrar mensaje correspondiente
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
