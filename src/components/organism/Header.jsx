import React, { useState } from 'react'; // Importa React y el hook `useState` para manejar estado.
import MenuIcon from '../atoms/MenuIcon'; 
import Sidebar from '../molecules/Sidebar';
import './css/Header.css'; 

const Header = ({ title }) => {
  // Declara el componente `Header` que recibe una prop:
  // 1. `title`: título que se mostrará en el encabezado.

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // Usa `useState` para manejar el estado del menú lateral (abierto/cerrado).

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    // Cambia el estado del menú lateral al opuesto del estado actual.
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    // Cierra el menú lateral estableciendo su estado como `false`.
  };

  return (
    <header className="app-header">
      <MenuIcon toggleSidebar={toggleSidebar} />
      {/* Muestra el ícono del menú que abre/cierra el menú lateral. */}
      <h1 className="header-title">{title}</h1>
      {/* Muestra el título del encabezado pasado como prop. */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      {/* Renderiza el menú lateral, pasándole su estado y la función para cerrarlo. */}
    </header>
  );
};

export default Header; // Exporta el componente para que pueda usarse en otros módulos.
