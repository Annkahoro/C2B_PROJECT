import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// HashRouter is used instead of BrowserRouter so that page refreshes
// work correctly on GitHub Pages (a static host). With HashRouter,
// the URL looks like /#/learner instead of /learner, so the server
// always serves index.html and React handles the routing client-side.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
