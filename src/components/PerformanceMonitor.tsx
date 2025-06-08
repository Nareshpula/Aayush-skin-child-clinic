import { useEffect } from 'react';

/**
 * PerformanceMonitor component that tracks and logs web vitals
 * This is a non-visual component that should be included once in your app
 */
const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production and if the Performance API is available
    if (process.env.NODE_ENV !== 'production' || !('PerformanceObserver' in window)) {
      return;
    }

    // Track Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime / 1000, 'seconds');
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP monitoring not supported', e);
    }

    // Track First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          const delay = entry.processingStart - entry.startTime;
          console.log('FID:', delay, 'ms');
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID monitoring not supported', e);
    }

    // Track Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      let clsEntries = [];
      
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach(entry => {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        });
        
        console.log('Current CLS:', clsValue);
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS monitoring not supported', e);
    }

    // Track resource loading performance
    try {
      const resourceObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        // Filter for large resources (>100KB)
        const largeResources = entries.filter(entry => entry.decodedBodySize > 100 * 1024);
        
        if (largeResources.length > 0) {
          console.log('Large resources that might need optimization:', 
            largeResources.map(r => ({
              name: r.name,
              size: `${Math.round(r.decodedBodySize / 1024)}KB`,
              duration: `${Math.round(r.duration)}ms`
            }))
          );
        }
      });
      
      resourceObserver.observe({ type: 'resource', buffered: true });
    } catch (e) {
      console.warn('Resource monitoring not supported', e);
    }

    return () => {
      // Clean up observers if component unmounts
      // Note: PerformanceObserver doesn't have a standard way to disconnect all observers
      // This is handled automatically by the browser when the page unloads
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default PerformanceMonitor;