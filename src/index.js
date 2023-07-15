import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from '../src/components/App/App.js';
import reportWebVitals from './reportWebVitals';
import UpMessageProvider from './/components/UpMessage/UpMessageControl/UpMessageControl';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UpMessageProvider>
        <App />
      </UpMessageProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
