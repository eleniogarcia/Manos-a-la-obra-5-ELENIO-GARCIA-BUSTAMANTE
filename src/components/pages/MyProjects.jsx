import React, { useState, useEffect } from 'react';
import Header from '../organism/Header';
import ProjectList from '../molecules/ProjectList';
import Loader from '../atoms/Loader';
import './css/MyProjects.css';
import { useNavigate } from 'react-router-dom';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);  //Mientras los datos se están obteniendo de la API, loading permanece en true.
  
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      console.log('Token obtenido:', token);
  
      if (!token) {
        setError('No estás autenticado. Por favor inicia sesión.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3001/projects', {
          method: 'GET',
          headers: {
            'auth': token,
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Respuesta de la API:', response);
  
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        const data = await response.json();
  
        // Log de los datos obtenidos
        console.log('Datos de proyectos:', data);
  
        // Verificar si los datos son correctos antes de actualizar el estado
        if (data) {
          setProjects(data);
        } else {
          setError('No se encontraron proyectos.');
        }
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        setError('Hubo un problema al obtener los proyectos.');
      } finally {
        setLoading(false);////Una vez que los datos han sido obtenidos (o en caso de error), loading se establece en false para ocultar el loader:
      }
    };
  
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/my-projects/${projectId}`);
  }; // si toca en un proyecto, te lleva a ese proyecto

  return (
      <div className="my-projects-page">
        <Header title="My Projects" />
        <h1>Proyectos Asignados</h1>
        {loading ? ( //si loader es true lo muestra , si no no.
          <Loader />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>  // Muestra el error si lo hay
        ) : (
          <ProjectList projects={projects} onClickProject={handleProjectClick} />
        )}
      </div>
    );
  
};

export default MyProjects;
