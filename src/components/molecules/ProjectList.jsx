import React from 'react'; // Importa React para crear componentes funcionales.
import ProjectCard from '../atoms/ProjectCard'; // Importa el componente atómico `ProjectCard`.
import './css/ProjectList.css'; // Importa los estilos asociados a la lista de proyectos.

const ProjectList = ({ projects, onClickProject }) => {
  // Declara el componente `ProjectList` que recibe dos props:
  // 1. `projects`: lista de proyectos (array).
  // 2. `onClickProject`: función que se ejecuta al hacer clic en un proyecto.

  if (!Array.isArray(projects)) {
    // Verifica si la prop `projects` no es un array.
    return <p style={{ color: 'red' }}>Ocurrió un error al cargar los proyectos.</p>;
    // Si no es un array, muestra un mensaje de error en rojo.
  }

  return (
    <div className="project-list">
      {projects.length === 0 ? (
        // Si la lista de proyectos está vacía:
        <p>No hay proyectos creados.</p>
      ) : (
        // Si hay proyectos, los mapea para renderizarlos como `ProjectCard`:
        projects.map((project) => (
          <ProjectCard
            key={project._id} // Usa el ID único del proyecto como key.
            project={project} // Pasa el proyecto completo al componente `ProjectCard`.
            onClick={() => onClickProject(project._id)} 
            // Define qué hacer cuando se hace clic en un proyecto, pasando su ID.
          />
        ))
      )}
    </div>
  );
};

export default ProjectList; // Exporta el componente para que pueda usarse en otros módulos.
