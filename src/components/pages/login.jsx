import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../organism/Header';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      "username" : "waltermolina",
      "password": "1234"
    }

    try {
      const response = await fetch("https://lamansysfaketaskmanagerapi.onrender.com/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
         
        // Guarda el token en el localStorage
        localStorage.setItem('token', data.token);
        /*localStorage.setItem('userID', result.user._id);*/

      });
      
     

      // Redirige al usuario a la página de proyectos
      navigate('/my-projects'); // Cambia esto a la ruta correcta de tus proyectos
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <Header title="LOGIN" /> {/* Aquí se pasa el título al Header */}
        <h1>Login</h1>
        <h1>----------------------------------</h1>
      <p>Porfavor, Ingresa usuario y contraseña</p>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <input
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
