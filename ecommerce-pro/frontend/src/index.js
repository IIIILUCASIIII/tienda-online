import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Asegúrate de incluir el CSS de Bootstrap en tu html o importarlo aquí si usas npm bootstrap
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);