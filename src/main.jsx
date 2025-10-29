import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import './index.css';

// MSW is now disabled - Using real backend APIs
// async function enableMocking() {
//   if (import.meta.env.MODE !== 'development') {
//     return;
//   }
//   const { worker } = await import('./mocks/browser.js');
//   return worker.start();
// }

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Direct render without MSW
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
