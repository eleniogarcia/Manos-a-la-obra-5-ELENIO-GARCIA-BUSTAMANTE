import React from 'react'; // Importa React para usar componentes funcionales.
import './css/Input.css'; // Importa los estilos asociados al input.

const Input = ({ type, placeholder, value, onChange }) => {
  

  return (
    <input
      className="input" // Aplica una clase CSS al input.
      type={type} // Define el tipo del input.ej number , string
      placeholder={placeholder} // texto que va en el input.
      value={value} //  valor actual del input.
      onChange={onChange} // Llama a la función pasada por `onChange` cuando el contenido cambia.
    />
  );
};

export default Input; // Exporta el componente para que pueda usarse en otros archivos.
