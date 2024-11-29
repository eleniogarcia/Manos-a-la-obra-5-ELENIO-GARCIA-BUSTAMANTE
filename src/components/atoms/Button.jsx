import React from 'react'; // Importa React para usar componentes funcionales.
import './css/Button.css'; // Importa los estilos asociados al botón.

const Button = ({ label, onClick, disabled }) => { 
  // Declara el componente Button como una función que recibe tres props:
  // 1. `label`: texto que se mostrará dentro del botón.
  // 2. `onClick`: función que se ejecutará al hacer clic en el botón.
  // 3. `disabled`: indica si el botón está deshabilitado (boolean).

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
