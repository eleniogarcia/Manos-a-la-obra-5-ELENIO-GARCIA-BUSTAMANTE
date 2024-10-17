import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../organism/Layout';
import Loader from '../atoms/Loader';
import './css/EpicDetail.css';

const EpicDetail = () => {
  const { projectId, epicId } = useParams(); // Extraer projectId y epicId de la URL
  const [epic, setEpic] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEpicDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No estás autenticado. Por favor inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        const epicResponse = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/epics/${epicId}`, {
          method: 'GET',
          headers: {
            'auth': token,
            'Content-Type': 'application/json',
          },
        });
        
        const epicData = await epicResponse.json();
        setEpic(epicData.data);

        const storiesResponse = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/stories?epic=${epicId}`, {
          method: 'GET',
          headers: {
            'auth': token,
            'Content-Type': 'application/json',
          },
        });

        const storiesData = await storiesResponse.json();
        setStories(storiesData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpicDetails();
  }, [epicId]);

  return (
    <Layout title={`Epic Details: ${epic ? epic.name : 'Loading...'}`}>
      <div className="epic-details-page">
        {loading ? (
          <Loader />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div>
            {epic ? (
              <div>
                <h2>{epic.name}</h2>
                <p>{epic.description}</p>
                <h3>Stories:</h3>
                <div className="story-grid">
                  {stories.length > 0 ? (
                    stories.map((story) => (
                      <div className="story-card" key={story._id}>
                        <h4>{story.name}</h4>
                        <p>{story.description}</p>
                        <p>Points: {story.points}</p>
                        <p>Status: {story.status}</p>
                        <Link to={`/my-projects/${projectId}/epics/${epicId}/story/${story._id}`}>Ver Detalles de la Historia</Link>
                      </div>
                    ))
                  ) : (
                    <p>No hay stories disponibles para esta epic.</p>
                  )}
                </div>
              </div>
            ) : (
              <p>No se encontró la epic.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EpicDetail;
