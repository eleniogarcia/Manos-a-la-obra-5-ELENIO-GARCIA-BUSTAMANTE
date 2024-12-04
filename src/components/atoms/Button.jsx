import React from 'react'; // Importa React para usar componentes funcionales.
import './css/Button.css'; // Importa los estilos asociados al botón.

const Button = ({ label, onClick, disabled }) => { 
  // `label`: texto que se mostrará dentro del botón.


  return (
    <button 
      className="btn" // Aplica una clase CSS al botón.
      onClick={onClick} // Define la acción que se ejecutará al hacer clic.
      disabled={disabled} // Desactiva el botón si `disabled` es true.
    >
      {label} 
      {/* Muestra el texto del botón. */}
    </button>
  );
};

export default Button; // Exporta el componente para que pueda usarse en otros archivos.
