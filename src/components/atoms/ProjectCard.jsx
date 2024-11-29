import React from 'react'; // Importa React para usar componentes funcionales.
import './css/ProjectCard.css'; // Importa los estilos asociados a la tarjeta de proyectos.

const ProjectCard = ({ project, onClick }) => {
  // Declara el componente ProjectCard como una función que recibe dos props:
  // 1. `project`: objeto con información sobre un proyecto sacado de project list (e.g., nombre, descripción).
  // 2. `onClick`: función que se ejecutará al hacer clic en la tarjeta.

  return (
    <div 
      className="project-card" // Aplica una clase CSS a la tarjeta.
      onClick={onClick} // Llama a la función `onClick` al hacer clic en la tarjeta.
    >
      <h3>{project.name}</h3> 
      {/* Muestra el nombre del proyecto. */}
      <p>{project.description}</p> 
      {/* Muestra la descripción del proyecto. */}
    </div>
  );
};

export default ProjectCard; // Exporta el componente para que pueda usarse en otros archivos.
