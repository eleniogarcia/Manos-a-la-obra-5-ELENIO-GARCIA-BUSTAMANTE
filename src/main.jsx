import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Importa el componente principal de la aplicación

// Monta la aplicación React en el elemento con ID 'root' en el HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Configura las rutas usando react-router-dom   permito el enrutamiento en app*/}
    <App /> {/* Renderiza el componente principal que contiene toda la lógica de la app */}
  </BrowserRouter>
);
