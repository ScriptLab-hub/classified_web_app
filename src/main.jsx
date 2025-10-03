import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Sahi path deen
import 'flowbite'; // Yeh line shamil karen
import './index.css'; // Tailwind CSS ko import karen



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>,
);