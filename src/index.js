import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global-styles.css';

import { Home } from './templates/home/Index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

