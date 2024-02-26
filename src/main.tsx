import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import { LimeStoreApp } from './LimeStoreApp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LimeStoreApp />
  </React.StrictMode>
)
