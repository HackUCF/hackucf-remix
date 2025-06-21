import { useEffect } from 'react';

interface UseAnalyticsOptions {
  token?: string | null;
  enabled?: boolean;
}

export function useAnalytics({ token, enabled = true }: UseAnalyticsOptions) {
  useEffect(() => {
    if (!enabled || !token) {
      if (!token) {
        console.warn('Cloudflare Analytics: No token provided');
      }
      return;
    }

    // Check if the beacon script is already loaded
    const existingScript = document.querySelector('script[src*="beacon.min.js"]');
    if (existingScript) {
      console.log('Cloudflare Analytics: Beacon script already loaded');
      return;
    }

    // Create and load the analytics script
    const script = document.createElement('script');
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
    script.defer = true;

    script.onload = () => {
      console.log('Cloudflare Analytics: Beacon loaded successfully');
    };

    script.onerror = (error) => {
      console.error('Cloudflare Analytics: Failed to load beacon', error);
    };

    // Add the script to the document head
    document.head.appendChild(script);

    // Cleanup function to remove the script if needed
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [token, enabled]);
}

// Alternative function for manual initialization
export function initializeCloudflareAnalytics(token: string) {
  if (!token) {
    console.warn('Cloudflare Analytics: No token provided for manual initialization');
    return;
  }

  // Set up global settings
  (window as any)._cfSettings = (window as any)._cfSettings || {};
  (window as any)._cfSettings.token = token;

  // Check if Cloudflare beacon is available
  if (typeof (window as any).__cfBeacon !== 'undefined') {
    console.log('Cloudflare Analytics: Beacon already initialized');
    return;
  }

  // Load the beacon script
  const script = document.createElement('script');
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
  script.async = true;

  script.onload = () => {
    console.log('Cloudflare Analytics: Manual initialization successful');
  };

  script.onerror = () => {
    console.error('Cloudflare Analytics: Manual initialization failed');
  };

  document.head.appendChild(script);
}
