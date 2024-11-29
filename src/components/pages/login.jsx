import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook de navegación para redirigir después del login
import Header from '../organism/Header'; // Componente Header
import './css/login.css'; // Estilos específicos para la página de login

// Componente de Login
export default function Login({ setIsAuthenticated }) {
  // Estado para almacenar los valores de usuario y contraseña, así como los errores de validación
  const [username, setUsername] = useState(''); // Usuario ingresado
  const [password, setPassword] = useState(''); // Contraseña ingresada
  const [error, setError] = useState(''); // Error general para mensajes como "Usuario o contraseña incorrectos"
  const [usernameError, setUsernameError] = useState(''); // Error específico para el campo de usuario
  const [passwordError, setPasswordError] = useState(''); // Error específico para el campo de contraseña
  const navigate = useNavigate(); // Hook para la navegación
  const title = "Login Page"; // Define the title variable

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recargar la página)
    // Resetear los errores anteriores
    setUsernameError('');
    setPasswordError('');
    setError('');

    // Validación de los campos de usuario y contraseña
    let formIsValid = true; // Variable para verificar si el formulario es válido

    // Validación para el campo de usuario
    if (username.trim() === '') {
      setUsernameError('El campo de usuario es obligatorio.'); // Error si el campo de usuario está vacío
      formIsValid = false;
    } else if (username.length < 4) {
      setUsernameError('El usuario debe tener al menos 4 caracteres.'); // Error si el usuario tiene menos de 4 caracteres
      formIsValid = false;
    }

    // Validación para el campo de contraseña
    if (password.trim() === '') {
      setPasswordError('El campo de contraseña es obligatorio.'); // Error si el campo de contraseña está vacío
      formIsValid = false;
    } else if (password.length < 4) {
      setPasswordError('La contraseña debe tener al menos 4 caracteres.'); // Error si la contraseña tiene menos de 4 caracteres
      formIsValid = false;
    }

    // Si el formulario no es válido, no proceder con la autenticación
    if (!formIsValid) {
      return; // Detiene la ejecución y no envía la solicitud
    }

    // Crear el objeto de datos con el nombre de usuario y la contraseña
    const data = { username, password };

    try {
      // Realiza la solicitud POST para autenticación
      const response = await fetch("http://localhost:3001/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicamos que estamos enviando datos en formato JSON
        },
        body: JSON.stringify(data), // Convierte el objeto 'data' a JSON y lo envía en el cuerpo de la solicitud
      });

      const result = await response.json(); // Convierte la respuesta a formato JSON

      // Verifica si la respuesta es exitosa y contiene un token
      if (response.ok && result.data && result.data.token) {
        // Si la autenticación es exitosa, guarda el token en localStorage
        localStorage.setItem('token', result.data.token);
        setIsAuthenticated(true); // Cambia el estado de autenticación a verdadero
        localStorage.setItem('userID', result.data.user._id); // Guarda el ID del usuario
        navigate('/my-projects'); // Redirige a la página de proyectos
      } else {
        setError('Usuario o contraseña incorrectos'); // Si la autenticación falla, muestra el error correspondiente
      }
    } catch (error) {
      console.error('Error:', error); // Si ocurre un error durante la solicitud, lo muestra en la consola
      setError('Error al intentar iniciar sesión'); // Muestra un mensaje de error si algo falla
    }
  };

  return (
    <div className="login-container">
      
      <Header title="LOGIN" /> {/* Muestra el encabezado con el título 'LOGIN' */}
      
      <form className="login-form" onSubmit={handleSubmit}> {/* El formulario envía los datos al hacer submit */}
        <div>
          <input
            placeholder='Username' // Placeholder para el campo de usuario
            type="text" // Tipo de input (texto)
            value={username} // Valor controlado del campo de usuario
            onChange={(e) => setUsername(e.target.value)} // Actualiza el valor de 'username' cuando el usuario escribe
          />
          {usernameError && <p className="input-error">{usernameError}</p>} {/* Muestra el error de usuario  si lo hay*/}
        </div>
        <div>
          <input
            placeholder='Password' // Placeholder para el campo de contraseña
            type="password" // Tipo de input (contraseña)
            value={password} // Valor controlado del campo de contraseña
            onChange={(e) => setPassword(e.target.value)} // Actualiza el valor de 'password' cuando el usuario escribe
          />
          {passwordError && <p className="input-error">{passwordError}</p>} {/* Muestra el error de contraseña si lo hay */}
        </div>
        <button type="submit">Login</button> {/* Botón para enviar el formulario */}
      </form>
      {error && <p className="error-message">{error}</p>} {/* Muestra el error general si lo hay */}
    </div>
  );
}
