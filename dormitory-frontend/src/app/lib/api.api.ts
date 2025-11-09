import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

// console.log('🌐 API Base URL:', API_BASE_URL)

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL: This sends session cookies
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 10 seconds timeout
})

// Request interceptor with detailed logging
api.interceptors.request.use(
  (config) => {
    // console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    return config
  },
  (error) => {
    console.error('📤 Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor with detailed logging
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.code === 'ECONNABORTED' || error.message === 'timeout of 30000ms exceeded') {
      return Promise.reject(error)
    }
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      // User is not authenticated - don't spam the console
      // Only log once per session by checking if we've seen this before
      if (!sessionStorage.getItem('auth_error_logged')) {
        console.warn('🔒 Authentication required - user may need to log in');
        sessionStorage.setItem('auth_error_logged', 'true');
      }
      return Promise.reject(error);
    }
    
    // Handle forbidden errors silently during auth checks
    if (error.response?.status === 403 && error.config?.url?.includes('profile')) {
      // Silently reject - this is expected when checking different profile endpoints
      return Promise.reject(error);
    }
    
    // Handle 404 errors more gracefully
    if (error.response?.status === 404) {
      // Don't log 404s for auth/profile checks - these are expected
      if (error.config?.url?.includes('/auth/') || error.config?.url?.includes('/profile')) {
        return Promise.reject(error);
      }
      console.error('📥 API Error: Resource not found (404):', error.config?.url);
      return Promise.reject(error);
    }
    
    // Clear the auth error flag on successful authentication
    if (error.response?.status !== 401 && sessionStorage.getItem('auth_error_logged')) {
      sessionStorage.removeItem('auth_error_logged');
    }
    
    if (error.response?.status === 500) {
      return Promise.reject(error)
    }
    console.error('📥 API Error:', error.message, error.response?.status);
    return Promise.reject(error)
  }
)