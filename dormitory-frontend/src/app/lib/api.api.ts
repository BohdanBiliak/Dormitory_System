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
    // console.log('📥 API Response:', response.status, response.config.url);
    return response
  },
  (error) => {
    console.error('📥 API Error:', error.message, error.response?.status);
    return Promise.reject(error)
  }
)