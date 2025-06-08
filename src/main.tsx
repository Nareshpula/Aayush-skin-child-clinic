import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AppointmentProvider } from './components/AppointmentContext';
import App from './App.tsx';
import './index.css';

// Register performance observer to monitor LCP
if ('PerformanceObserver' in window) {
  const lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lcpEntry = entries[entries.length - 1];
    console.log('LCP:', lcpEntry.startTime / 1000, 'seconds');
  });
  
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AppointmentProvider>
        <App />
      </AppointmentProvider>
    </HelmetProvider>
  </StrictMode>
);
