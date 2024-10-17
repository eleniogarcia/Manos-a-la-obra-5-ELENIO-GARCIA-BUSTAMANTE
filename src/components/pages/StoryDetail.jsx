import React, { useState, useEffect } from 'react';
import Layout from '../organism/Layout';
import Loader from '../atoms/Loader';
import AddTaskModal from '../atoms/AddTaskModal'; // Asegúrate de que esta ruta sea correcta
import './css/StoryDetail.css'; // Asegúrate de que este archivo tenga los estilos adecuados
import { useParams } from 'react-router-dom';

const StoryDetail = () => {
  const { projectId, epicId, storyId } = useParams(); // Extraer projectId, epicId y storyId de la URL
  const [story, setStory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    const fetchStoryDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No estás autenticado. Por favor inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        const storyResponse = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storyId}`, {
          method: 'GET',
          headers: {
            'auth': token,
            'Content-Type': 'application/json',
          },
        });

        const storyData = await storyResponse.json();
        setStory(storyData.data);

        const tasksResponse = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/tasks?story=${storyId}`, {
          method: 'GET',
          headers: {
            'auth': token,
            'Content-Type': 'application/json',
          },
        });

        const tasksData = await tasksResponse.json();
        setTasks(tasksData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryDetails();
  }, [storyId]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Actualiza la lista de tareas
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');
    if (confirmDelete) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'auth': token,
          },
        });
        setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId)); // Elimina la tarea del estado
      } catch (error) {
        setError('Error al eliminar la tarea: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout title={`Tasks for Story: ${story ? story.name : 'Loading...'}`}>
      <div className="story-details-page">
        {loading ? (
          <Loader />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div>
            {story ? (
              <div>
                <h2>{story.name}</h2>
                <p>{story.description}</p>
                <button onClick={() => setAddTaskModalOpen(true)}>Agregar Tarea</button>
                <AddTaskModal
                  isOpen={isAddTaskModalOpen}
                  onClose={() => setAddTaskModalOpen(false)}
                  onAddTask={handleAddTask}
                />
                <h3>Tasks:</h3>
                {tasks.length > 0 ? (
                  <ul>
                    {tasks.map((task) => (
                      <li key={task._id} className="task-item">
                        <h4>{task.name}</h4>
                        <p>{task.description}</p>
                        <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                        <p>Status: {task.done ? 'Done' : 'Not Done'}</p>
                        <button onClick={() => handleDeleteTask(task._id)}>Eliminar</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay tareas disponibles para esta story.</p>
                )}
              </div>
            ) : (
              <p>No se encontró la story.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StoryDetail;
