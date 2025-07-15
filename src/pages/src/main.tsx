import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AppointmentProvider } from './components/AppointmentContext';
import App from './App.tsx';
import './index.css';
import { preloadCriticalAssets } from './utils/preloadUtils';

// Register performance observer to monitor LCP
if ('PerformanceObserver' in window) {
  const lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lcpEntry = entries[entries.length - 1];
    console.log('LCP:', lcpEntry.startTime / 1000, 'seconds');
  });
  
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  
  // Monitor First Input Delay (FID)
  const fidObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      const delay = entry.processingStart - entry.startTime;
      console.log('FID:', delay, 'ms');
    });
  });
  
  fidObserver.observe({ type: 'first-input', buffered: true });
  
  // Monitor Cumulative Layout Shift (CLS)
  const clsObserver = new PerformanceObserver((entryList) => {
    let clsValue = 0;
    const entries = entryList.getEntries();
    
    entries.forEach(entry => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    
    console.log('CLS:', clsValue);
  });
  
  clsObserver.observe({ type: 'layout-shift', buffered: true });
}

// Preload critical assets
preloadCriticalAssets();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AppointmentProvider>
        <App />
      </AppointmentProvider>
    </HelmetProvider>
  </StrictMode>
);
