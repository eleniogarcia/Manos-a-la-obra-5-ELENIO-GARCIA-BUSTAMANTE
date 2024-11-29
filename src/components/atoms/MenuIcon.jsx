import React from 'react'; // Importa React para usar componentes funcionales.
import './css/MenuIcon.css'; // Importa los estilos asociados al icono del menú.

const MenuIcon = ({ toggleSidebar }) => {
  // Declara el componente MenuIcon como una función que recibe una prop:
  // 1. `toggleSidebar`: función que se ejecutará al hacer clic para abrir/cerrar un menú lateral.

  return (
    <button 
      className="menu-icon" // Aplica una clase CSS al botón.
      onClick={toggleSidebar} // Llama a la función `toggleSidebar` al hacer clic. que es definida en el header
    >
      ☰
      {/* Muestra un símbolo de menú estilo "hamburguesa" (tres líneas horizontales). */}
    </button>
  );
};

export default MenuIcon; // Exporta el componente para que pueda usarse en otros archivos.
