import React, { useState } from 'react';
import Header from '../organism/Header'; // Asegúrate de que la ruta sea correcta
import './css/Home.css';

const Home = () => {
  const [guess, setGuess] = useState(''); // Guarda el valor de la adivinanza
  const [message, setMessage] = useState(''); // Mensaje de estado del juego
  const [attemptsLeft, setAttemptsLeft] = useState(7); // Inicializamos con 7 intentos
  const [randomNumber] = useState(Math.floor(Math.random() * 100) + 1); // Número aleatorio entre 1 y 100

  // Función para manejar la adivinanza
  const handleGuess = () => {
    const numGuess = parseInt(guess); // Convierte la adivinanza a número

    // Verificamos si la adivinanza es válida, debe estar entre 1 y 100
    if (numGuess < 1 || numGuess > 100) {
      setMessage('Por favor, adivina un número entre 1 y 100.');
    } else {
      // Si el número adivinado es correcto
      if (numGuess === randomNumber) {
        setMessage(`¡Correcto! ¡Bien hecho! .El número era ${randomNumber}.`);
        setAttemptsLeft(0); // Si adivina correctamente, no quedan intentos
      } 
      // Si no es correcto pero aún quedan intentos
      else if (attemptsLeft > 1) { 
        setMessage(numGuess < randomNumber ? 'Demasiado bajo, intenta nuevamente.' : 'Demasiado alto, intenta nuevamente.');
        setAttemptsLeft(attemptsLeft - 1); // Resta un intento
      } 
      // Si es el último intento
      else { 
        setMessage(`Te has quedado sin intentos. El número era ${randomNumber}.`);
        setAttemptsLeft(0); // Ya no permite más intentos
      }
    }

    setGuess(''); // Borra la adivinanza después de cada intento
  };

  return (
    <>
      <Header title="Home" /> {/* Aquí se pasa el título al Header */}
      <div className="home-page">
        <h1> ============================================================== </h1>
        <h1 className="game-title"> Bienvenido a Adivina el Número!! </h1>
        <h1 className="inspirational-quote">
          "La mejor forma de predecir el futuro es crearlo."
        </h1>
        <div className="game-section">
          <h2>Adivina un número entre 1 y 100</h2>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)} // Actualiza el valor de guess
            placeholder="Tu adivinanza"
            disabled={attemptsLeft === 0} // Desactiva el input cuando se acaben los intentos
          />
          <button onClick={handleGuess} disabled={attemptsLeft === 0}> {/* Desactiva el botón cuando no queden intentos */}
            Adivinar
          </button>
          {message && <p className="game-message">{message}</p>} {/* Muestra el mensaje de estado del juego */}
          <p>Intentos restantes: {attemptsLeft}</p> {/* Muestra los intentos restantes */}
        </div>
      </div>
    </>
  );
};

export default Home;
