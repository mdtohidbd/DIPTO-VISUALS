// Centralized API and Media URL configuration for local dev and Vercel production

export const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
  }
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

export const getMediaUrl = (url) => {
  if (!url) return '';
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  const cleanUrl = url.startsWith('/') ? url : `/${url}`;

  // If local development without custom VITE_API_URL
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${apiBase.replace(/\/api\/?$/, '').replace(/\/$/, '')}${cleanUrl}`;
  }

  // On production (e.g. Vercel)
  if (import.meta.env.VITE_API_URL) {
    const apiBase = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
    return `${apiBase}${cleanUrl}`;
  }

  return cleanUrl;
};
