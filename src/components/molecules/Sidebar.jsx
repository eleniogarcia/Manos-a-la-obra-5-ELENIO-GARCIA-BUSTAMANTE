import React from 'react'; // Importa React para crear componentes funcionales.
import './css/Sidebar.css'; // Importa los estilos asociados al menú lateral.
import logo2 from '../../assets/img/logo2.png'; // Importa el logo para usarlo en el menú lateral.

const Sidebar = ({ isOpen, closeSidebar }) => {
  // Declara el componente `Sidebar` que recibe dos props:
  // 1. `isOpen`: booleano que indica si el menú está abierto o cerrado desde el header
  // 2. `closeSidebar`: función para cerrar el menú.

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Agrega la clase CSS `open` si el menú está abierto. */}
      <button className="close-btn" onClick={closeSidebar}>
        ‹
        {/* Botón para cerrar el menú. Ejecuta la función `closeSidebar` al hacer clic. */}
      </button>
      <div className="sidebar-content">
        <img src={logo2} alt="App Logo" className="app-logo" />
        {/* Muestra el logo de la aplicación. */}
        <nav>
          <ul>
            <li><a href="/home">Inicio</a></li>
            <li><a href="/my-projects">Proyectos</a></li>
            <li><a href="/my-stories">Historias</a></li>
            <li><a href="/settings">Configuración</a></li>
            {/* Renderiza un menú de navegación con enlaces a diferentes secciones. */}
          </ul>
        </nav>
        <div className="user-profile">
          <p>Perfil del Usuario</p>
          {/* esto no funciona pero lo dejo por ahora */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; // Exporta el componente para usarlo en otros archivos.
