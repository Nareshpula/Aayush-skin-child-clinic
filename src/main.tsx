import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AppointmentProvider } from './components/AppointmentContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AppointmentProvider>
        <App />
      </AppointmentProvider>
    </HelmetProvider>
  </StrictMode>
);
