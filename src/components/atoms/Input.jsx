import React from 'react'; // Importa React para usar componentes funcionales.
import './css/Input.css'; // Importa los estilos asociados al input.

const Input = ({ type, placeholder, value, onChange }) => {
  // Declara el componente Input como una función que recibe cuatro props:
  // 1. `type`: especifica el tipo de input (texto, contraseña, email, etc.).
  // 2. `placeholder`: texto que se muestra cuando el input está vacío.
  // 3. `value`: valor actual del input.
  // 4. `onChange`: función que se ejecuta cuando el usuario escribe en el input.

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
