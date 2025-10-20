import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'aiverse-1-yz9e.onrender.com' ? 'https://aiverse-backend.onrender.com' : 'http://localhost:8000')

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    // Log network errors for debugging
    if (!error.response) {
      console.error('Network error:', error.message)
    } else {
      console.error('API error:', error.response.status, error.response.data)
    }
    
    return Promise.reject(error)
  }
)
