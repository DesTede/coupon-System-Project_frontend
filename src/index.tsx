import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import clientInterceptors from "./Utils/interceptors";
import Layout from "./Components/LayoutArea/Layout/Layout";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 *  run this function to make axios send the token (if exists) on EACH request
 */
clientInterceptors.tokenInterceptors();


root.render(
      <Layout/>
);

reportWebVitals();
