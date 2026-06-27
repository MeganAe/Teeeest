export const environment = {
  production: import.meta.env.PROD,
  development: import.meta.env.DEV,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  appName: import.meta.env.VITE_APP_NAME || 'AMKA Medical Center',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
}

export const isProduction = environment.production
export const isDevelopment = environment.development