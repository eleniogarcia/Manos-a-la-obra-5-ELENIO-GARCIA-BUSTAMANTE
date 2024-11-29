import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Hooks para obtener parámetros de la URL y generar enlaces
import Header from '../organism/Header'; // Componente reutilizable para el encabezado
import Loader from '../atoms/Loader'; // Indicador de carga
import './css/EpicDetailUpdate.css'; // Estilos específicos del componente

const EpicDetail = () => {
  // Extrae projectId y epicId de la URL
  const { projectId, epicId } = useParams(); 

  // Estados para manejar la información del componente
  const [epic, setEpic] = useState(null); // Almacena los datos de la Epic que inicialmente esta vacio
  const [stories, setStories] = useState([]); // Almacena las historias es un array inicialmente vacio asociadas a la Epic 
  const [loading, setLoading] = useState(true); // Maneja el estado de carga , inicialmente los datos no se ven y tienen que estar cargandose
  const [error, setError] = useState(''); // Almacena mensajes de error ,Se inicializa como una cadena vacía porque inicialmente no hay errores.

  // Efecto para cargar los detalles de la Epic al montar el componente o cambiar epicId
  useEffect(() => {
    const fetchEpicDetails = async () => {
      const token = localStorage.getItem('token'); // Obtiene el token de autenticación

      if (!token) { 
        // Si no hay token, muestra un error y detiene la carga
        setError('No estás autenticado. Por favor inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        // Solicita los detalles de la Epic seleccionada desde la API
        const epicResponse = await fetch(`http://localhost:3001/epics/project/${projectId}/epic/${epicId}`, {
          method: 'GET',
          headers: {
            'auth': token, // Incluye el token de autenticación
            'Content-Type': 'application/json',
          },
        });
        
        const epicData = await epicResponse.json(); // Extrae la respuesta como JSON
        setEpic(epicData); // Actualiza el estado con los datos de la Epic

        console.log("aca imprimico el epic" ,epicData); // para probar q trae bien los datos

        // Solicita las historias asociadas a la Epic seleccionada
        const storiesResponse = await fetch(`http://localhost:3001/stories/epic/${epicId}`, {
          method: 'GET',
          headers: {
            'auth': token, // Usa el mismo token de autenticación
            'Content-Type': 'application/json',
          },
        });

        const storiesData = await storiesResponse.json(); // Extrae las historias como JSON
        console.log(storiesData); // console para probar q trae bien las historias
        setStories(storiesData); // Actualiza el estado con las historias
      } catch (error) {
        // Maneja errores en las solicitudes
        setError(error.message);
      } finally {
        // Asegura que el estado de carga se actualice al final
        setLoading(false);
      }
    };

    fetchEpicDetails(); // Llama a la función para obtener los datos
  }, [epicId]); // Se ejecuta nuevamente si epicId cambia

  // Renderizado del componente
  return (
    <div className="epic-details-page">
      {/* Muestra el loader si está cargando, o el error si hay algún problema */}
      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          {epic ? (
            <>
              {/* Encabezado con el nombre de la Epic */}
              <Header title={epic.name} /> 
              {/* Botón para volver a la página del proyecto */}
              <h1>"----------------------------"</h1>
              {/* Botón para volver a la página del proyecto */}
              <Link to={`/my-projects/${projectId}`} className="back-button"> ← Volver a Project Detail</Link>
              
              {/* Lista de historias asociadas */}
              <h3>Stories:</h3>
              <div className="story-grid">
                {stories.length > 0 ? (
                  // Mapea cada historia a una tarjeta con sus detalles
                  stories.map((story) => (
                    <div className="story-card" key={story._id}>
                      <h4>{story.name}</h4> {/* Nombre de la historia */}
                      <p>{story.description}</p> {/* Descripción */}
                      <p>Points: {story.points}</p> {/* Puntos */}
                      <p>Status: {story.status}</p> {/* Estado */}
                      {/* Enlace para ver detalles específicos de la historia */}
                      <Link to={`/my-projects/${projectId}/epics/${epicId}/story/${story._id}`}>Ver Detalles de la Historia</Link>
                    </div>
                  ))
                ) : (
                  // Si no hay historias, muestra un mensaje
                  <p>No hay stories disponibles para esta epic.</p>
                )}
              </div>
            </>
          ) : (
            // Si no se encuentra la Epic, muestra un mensaje
            <p>No se encontró la epic.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EpicDetail; // Exporta el componente para usarlo en otras partes de la aplicación
