import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import clientInterceptors from "./Utils/interceptors";
import Layout from "./Components/LayoutArea/Layout/Layout";


/**
 * Create a root for ReactDOM
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * Configure axios interceptors to send the token (if exists) on EACH request
 */
clientInterceptors.tokenInterceptors();


/**
 * Render the Layout component within the root
 */
root.render(
      <Layout/>
);

reportWebVitals();
