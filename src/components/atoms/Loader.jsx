import React from 'react'; // Importa React para usar componentes funcionales.
import './css/Loader.css'; // Importa los estilos asociados al loader.

const Loader = () => {
  // Declara el componente Loader como una función.
  // Este componente no recibe props, ya que simplemente muestra un indicador de carga.

  return (
    <div className="loader">Loading...</div>
    // Renderiza un div con una clase CSS y el texto "Loading...".
    // La animación y estilo se manejan en `Loader.css`.
  );
};

export default Loader; // Exporta el componente para que pueda usarse en otros archivos.
