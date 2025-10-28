import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import './index.css';

async function enableMocking() {
  // Development mode e MSW mock enable hobe
  if (import.meta.env.MODE !== 'development') {
    return;
  }
  const { worker } = await import('./mocks/browser.js');

  return worker.start();
}

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
});
