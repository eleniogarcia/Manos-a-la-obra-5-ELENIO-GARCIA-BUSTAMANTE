import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter /*basename="/Manos-a-la-obra-5-ELENIO-GARCIA-BUSTAMANTE"*/>
    <App />
  </BrowserRouter>
);
