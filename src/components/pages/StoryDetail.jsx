import React, { useState, useEffect } from 'react';
import Header from '../organism/Header';
import Loader from '../atoms/Loader';
import './css/storyDetail.css';
import { useParams, Link } from 'react-router-dom';

const StoryDetail = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    done: false,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No estás autenticado. Por favor inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/stories/${storyId}`, {
          method: 'GET',
          headers: {
            auth: token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener la historia');
        }

        const storyData = await response.json();
        setStory(storyData);

        const tasksResponse = await fetch(`http://localhost:3001/tasks/story/${storyId}`, {
          method: 'GET',
          headers: {
            auth: token,
            'Content-Type': 'application/json',
          },
        });

        if (!tasksResponse.ok) {
          throw new Error('Error al obtener las tareas');
        }

        const tasksData = await tasksResponse.json();
        setTasks(tasksData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storyId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddTask = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setNotification('No estás autenticado. Por favor inicia sesión.');
      return;
    }

    setIsAdding(true);
    setNotification('');

    if (!newTask.name.trim()) {
      setNotification('El nombre es obligatorio.');
      setIsAdding(false);
      return;
    }
    if (newTask.description && newTask.description.length < 10) {
      setNotification('La descripción debe ser vacía o tener al menos 10 caracteres.');
      setIsAdding(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/tasks`, {
        method: 'POST',
        headers: {
          auth: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTask, story: storyId, dueDate: newTask.dueDate }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar la tarea');
      }

      const createdTask = await response.json();
      setTasks((prevTasks) => [createdTask, ...prevTasks]);
      setNewTask({ name: '', description: '', dueDate: '', done: false });
      setNotification('Tarea agregada exitosamente.');
    } catch (error) {
      setNotification('Error al agregar la tarea: ' + error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');
    if (confirmDelete) {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            auth: token,
          },
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la tarea');
        }

        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } catch (error) {
        setError('Error al eliminar la tarea: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleTaskDone = async (taskId, currentDoneStatus) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setNotification('No estás autenticado. Por favor inicia sesión.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          auth: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done: !currentDoneStatus }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) => prevTasks.map((task) => task._id === taskId ? updatedTask : task));
    } catch (error) {
      setNotification('Error al actualizar la tarea: ' + error.message);
    }
  };

  if (loading) return <Loader />;

  if (error) return <div>{error}</div>;

  return (
    <div className="story-details-page">
      <Header title={story.name} />
      <div className="add-task-form">
      <h2>Descripción de la historia</h2>
      <p>{story.description}</p>
      <h2>========================================================</h2>
          <h3>Agregar Tarea</h3>
          <input
            type="text"
            name="name"
            placeholder="Nombre de la tarea"
            value={newTask.name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Descripción de la tarea"
            value={newTask.description}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTask} disabled={isAdding}>
            {isAdding ? 'Agregando...' : 'Agregar Tarea'}
          </button>
        </div>
      <div className="storyContainer">
        
        {notification && <p className="notification">{notification}</p>}
        <h2>Tareas</h2>
        {tasks.length === 0 ? (
          <p>No hay tareas para esta historia.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task._id} className="task-item">
                <div>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleTaskDone(task._id, task.done)}
                  />
                  <span>{task.name}</span>
                </div>
                <div className="task-details">
                  <p>{task.description}</p>
                  
                  <p>
                  Fecha de vencimiento:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "Indefinida"} {/* Mostrar 'Indefinida' si no hay fecha */}
                </p>
                </div>
                <div className="task-actions">
                  <button onClick={() => handleDeleteTask(task._id)} className="delete-btn">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        
      </div>
    </div>
  );
};

export default StoryDetail;
