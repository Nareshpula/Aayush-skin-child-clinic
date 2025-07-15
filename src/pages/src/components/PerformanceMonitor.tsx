import { useEffect } from 'react';

/**
 * Enhanced PerformanceMonitor component that tracks, logs, and optimizes web vitals and prevents layout shifts
 * This is a non-visual component that should be included once in your app
 */
const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production and if the Performance API is available
    if (process.env.NODE_ENV !== 'production' || !('PerformanceObserver' in window)) {
      return;
    }

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical images
      const criticalImages = [
        "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/playing-with-kids.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvcGxheWluZy13aXRoLWtpZHMubXA0IiwiaWF0IjoxNzQyNjU5MzM4LCJleHAiOjE5MDAzMzkzMzh9.a4f48hJOPjPHxMVHkwjKE9HCm6p0NbgvEgBJLoauuJU",
        "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Skin-pages-image/Aayush-logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2tpbi1wYWdlcy1pbWFnZS9BYXl1c2gtbG9nby5wbmciLCJpYXQiOjE3NDM2OTk3MzAsImV4cCI6MTkwMTM3OTczMH0.pg25T9SRSiXE0jn46_vxVzTK_vlJGURYwbeRpbjnIF0"
      ];
      
      criticalImages.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload'; 
        link.as = url.endsWith('.mp4') ? 'video' : 'image';
        link.fetchPriority = 'high';
        link.href = url;
        document.head.appendChild(link);
      });
      
      // Preload critical fonts
      const criticalFonts = [
        "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpUK4Zv-QXB0.woff2",
        "https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0C4n.woff2"
      ];
      
      criticalFonts.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = url;
        document.head.appendChild(link);
      });
    };
    
    // Call preload function
    preloadCriticalResources();

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
    
    // Implement image lazy loading for all images
    const implementLazyLoading = () => {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach((img: HTMLImageElement) => {
        // Only apply lazy loading to images that aren't in the viewport or marked as high priority
        if ((!img.hasAttribute('fetchpriority') || img.getAttribute('fetchpriority') !== 'high') && 
            !isInViewport(img)) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Set explicit width and height if not already set to prevent layout shifts
        if (!img.hasAttribute('width') && !img.hasAttribute('height') && img.src) {
          img.style.aspectRatio = '16/9';
        }
      });
    };
    
    // Check if element is in viewport
    const isInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    
    // Call once and set up a mutation observer to handle dynamically added images
    implementLazyLoading();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          implementLazyLoading();
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Fix for Cumulative Layout Shift (CLS)
    const fixLayoutShifts = () => {
      // Add fixed dimensions to elements that might cause layout shifts
      const fixElements = () => {
        // Fix images without dimensions
        document.querySelectorAll('img:not([width]):not([height])').forEach((img: HTMLImageElement) => {
          if (img.src && !img.complete) {
            img.style.aspectRatio = '16/9';
          }
        });
        
        // Fix iframes without dimensions
        document.querySelectorAll('iframe:not([width]):not([height])').forEach((iframe: HTMLIFrameElement) => {
          iframe.style.aspectRatio = '16/9';
        });
      };
      
      // Run immediately and on window load
      fixElements();
      window.addEventListener('load', fixElements);
    };
    
    // Call layout shift fixes
    fixLayoutShifts();

    return () => {
      // Clean up observers if component unmounts
      // Note: PerformanceObserver doesn't have a standard way to disconnect all observers
      // This is handled automatically by the browser when the page unloads
      observer.disconnect();
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default PerformanceMonitor;