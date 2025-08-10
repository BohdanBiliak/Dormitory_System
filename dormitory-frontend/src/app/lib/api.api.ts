import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

console.log('🌐 API Base URL:', API_BASE_URL)

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
    console.log('📤 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers,
      data: config.data,
      withCredentials: config.withCredentials
    })
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
    console.log('📥 API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data,
      headers: response.headers
    })
    return response
  },
  (error) => {
    console.error('📥 API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
      headers: error.response?.headers
    })
    
    // Only redirect to login on 401 if we're not already on the login page
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      if (!currentPath.includes('/auth/login')) {
        console.log('🔒 Session expired, redirecting to login')
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)