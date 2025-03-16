import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Vite-specific way to log for debugging  
console.log('Vite environment:', import.meta.env.MODE);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);