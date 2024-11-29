import React, { useState } from 'react'; // Importa React y useState para manejar el estado
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para permitir la navegación entre rutas
import Header from '../organism/Header'; // Importa el componente Header para la barra de navegación
import './css/Register.css'; // Importa el archivo de estilos para la página de registro

const Register = () => {
  // Definición de los estados para almacenar los valores del formulario y mensajes de error
  const [email, setEmail] = useState(''); // Estado para el email
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [name, setName] = useState(''); // Estado para el nombre completo
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar los mensajes de error
  const navigate = useNavigate(); // Función de navegación para redirigir al login después de registrarse

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario (recarga de la página)

    setErrorMessage(''); // Limpiar cualquier mensaje de error previo

    try {
      // Realizar la solicitud POST para crear el usuario
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST', // Método HTTP para crear el usuario
        headers: {
          'Content-Type': 'application/json', // Indica que estamos enviando datos en formato JSON
        },
        body: JSON.stringify({
          email, // Email del usuario
          username, // Nombre de usuario
          password, // Contraseña
          name, // Nombre completo
        }),
      });

      const data = await response.json(); // Convertir la respuesta a formato JSON

      if (!response.ok) { // Si la respuesta no es exitosa (código de estado no OK)
        setErrorMessage(data.message || 'Error desconocido'); // Mostrar el mensaje de error
        return;
      }

      // Si la creación del usuario es exitosa, redirigir al login
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar el usuario:', error); // Mostrar el error en la consola
      setErrorMessage('Hubo un problema al registrar al usuario.'); // Mostrar mensaje de error si la solicitud falla
    }
  };

  return (
    <div className="register-page">
      <Header title="REGISTRO" /> {/* Renderiza el Header con el título "REGISTRO" */}
      <h1>Registro</h1>
      <h2>Registrarse</h2>

      {/* Muestra un mensaje de error si lo hay */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}> {/* Maneja el envío del formulario */}
        <div className="form-section">
          <label htmlFor="name">Nombre:</label> {/*for para el nombre */}
          <input
            type="text"
            id="name"
            value={name} // El valor del input se enlaza con el estado "name"
            onChange={(e) => setName(e.target.value)} // Actualiza el estado cuando cambia el valor
            required // Campo obligatorio
          />
        </div>

        <div className="form-section">
          <label htmlFor="email">Correo electrónico:</label> {/*  for para el email  */}
          <input
            type="email"
            id="email"
            value={email} // El valor del input se enlaza con el estado "email"
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado cuando cambia el valor
            required // Campo obligatorio
          />
        </div>

        <div className="form-section">
          <label htmlFor="username">Usuario:</label> {/* for para el usuario  */}
          <input
            type="text"
            id="username"
            value={username} // El valor del input se enlaza con el estado "username"
            onChange={(e) => setUsername(e.target.value)} // Actualiza el estado cuando cambia el valor
            required // Campo obligatorio
          />
        </div>

        <div className="form-section">
          <label htmlFor="password">Contraseña:</label> {/* Etiqueta para el campo de contraseña */}
          <input
            type="password"
            id="password"
            value={password} // El valor del input se enlaza con el estado "password"
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado cuando cambia el valor
            required // Campo obligatorio
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
    </div>
  );
};

export default Register; // Exporta el componente Register para que pueda ser utilizado en otras partes de la aplicación
