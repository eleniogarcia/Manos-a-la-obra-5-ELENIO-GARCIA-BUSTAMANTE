import React, { useState } from 'react';
import './css/AddTaskModal.css'; // Estilos para el modal

const AddTaskModal = ({ isOpen, onClose, onAddTask, storyId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState(''); // Para la fecha de vencimiento
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones
    if (!name) {
      setError('El nombre es obligatorio.');
      setLoading(false);
      return;
    }
    if (description && description.length < 10) {
      setError('La descripción debe tener al menos 10 caracteres.');
      setLoading(false);
      return;
    }

    const taskData = {
      done: false,
      name,
      description,
      story: storyId, // Asegúrate de pasar `storyId` desde el componente padre
      created: new Date().toISOString(), // Fecha de creación
      due, // La fecha de vencimiento que el usuario proporcione
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("https://lamansysfaketaskmanagerapi.onrender.com/api/tasks", {
        method: 'POST',
        headers: {
          'auth': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json(); // Procesamos la respuesta

      if (!response.ok) {
        throw new Error(data.message || 'Error al agregar la tarea.'); // Cambiamos a data.message
      }

      onAddTask(data); // Llama a la función para agregar la tarea a la lista en el componente padre
      onClose(); // Cierra el diálogo
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Agregar Tarea</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minLength={10} // Solo si se provee
              />
            </div>
            <div>
              <label>Fecha de Vencimiento</label>
              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Agregar'}
            </button>
            <button type="button" onClick={onClose}>Cerrar</button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddTaskModal;
