import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../organism/Header';
import './css/login.css';

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (username.trim() === '' || password.trim() === '') {
      setError('Por favor, completa todos los campos');
      return;
    }

    const data = { username, password }; // Usar las credenciales ingresadas por el usuario

    try {
      const response = await fetch("https://lamansysfaketaskmanagerapi.onrender.com/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Success:', result);

      // Si se recibe un token, el usuario está autenticado
      if (response.ok && result.token) {
        localStorage.setItem('token', result.token);
        setIsAuthenticated(true);
        navigate('/my-projects');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al intentar iniciar sesión');
    }
  };

  return (
    <div>
      <Header title="LOGIN" />
      <h1>-----------------------</h1>
      <h1>-----------------------</h1>
      <h1>Login</h1>
      <p>Por favor, ingresa usuario y contraseña</p>
      <form onSubmit={handleSubmit}>
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
