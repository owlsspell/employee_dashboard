export const base = import.meta.env.MODE === 'development' ? import.meta.env.VITE_BACKEND_DEVELOPMENT : import.meta.env.VITE_BACKEND_PRODUCTION
export const frontendURL = import.meta.env.MODE === 'development' ? import.meta.env.VITE_FRONTEND_DEVELOPMENT : import.meta.env.VITE_FRONTEND_PRODUCTION
