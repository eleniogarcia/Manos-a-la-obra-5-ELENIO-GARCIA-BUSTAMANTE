import React, { useEffect, useState } from 'react';
import Header from '../organism/Header';
import Loader from '../atoms/Loader';
import './css/MyStories.css';

const MyStories = () => {
  const [stories, setStories] = useState([]); // Estado para almacenar las historias
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(''); // Estado para manejar errores

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtener token de autenticación del localStorage

    if (!token) { 
      setError('No estás autenticado. Por favor inicia sesión.'); // Si no hay token, mostrar mensaje de error
      setLoading(false);
      return;
    }

    // Petición para obtener las historias del servidor la hago then para probar otra alternativa
    fetch('http://localhost:3001/stories', {//Realiza la solicitud HTTP
      method: 'GET',
      headers: {
        auth: token, // Incluir token en el encabezado para autenticar la solicitud
        'Content-Type': 'application/json',
      },
    })
       .then((response) => response.json()) // Convierte la respuesta en JSON
      .then((data) => {   // Una vez que el JSON está listo
        setStories(data); // Guardar las historias en el estado
      })
      .catch((error) => {
        setError(error.message); // Manejo de errores de la solicitud
      })
      .finally(() => {
        setLoading(false); // Finalizar el estado de carga
      });
  }, []); // useEffect sin dependencias, solo se ejecuta al montar el componente

  return (
    <div className="my-stories-page">
      <Header title="Mis historias" />
      <h1>Mis historias</h1>
      {loading ? (
        <Loader /> // Mostrar el loader mientras se cargan las historias
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p> // Si hay error, mostrar mensaje de error
      ) : (
        <div>
          <h2></h2>
          {stories.length > 0 ? (
            <div className="story-container">
              {stories.map((story) => (
                <div className="story-item" key={story._id}>
                  <h3>{story.name}</h3>
                  <p>{story.description || 'Sin descripción'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay historias disponibles.</p> // Si no hay historias, mostrar mensaje correspondiente
          )}
        </div>
      )}
    </div>
  );
};

export default MyStories;
