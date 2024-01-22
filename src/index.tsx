import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import clientInterceptors from "./Utils/interceptors";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 *  run this function to make axios send the token (if exists) on EACH request
 */
clientInterceptors.tokenInterceptors();


root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
