import { api } from './api.api'
import { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/auth.types'

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // console.log('Login attempt with:', { email: data.email })
    try {
      const response = await api.post('/auth/login', data)
      // console.log('Login response:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Login error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        code: error.code
      })
      throw error
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    // console.log('Register attempt:', { email: data.email })
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('secondName', data.secondName)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('passwordRepeat', data.passwordRepeat)
    if (data.avatar) formData.append('avatar', data.avatar)
    if (data.studentIdFront) formData.append('studentIdFront', data.studentIdFront)
    if (data.studentIdBack) formData.append('studentIdBack', data.studentIdBack)
    try {
      const response = await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // console.log('Register response:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Register error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      throw error
    }
  },

  // Email verification
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    // console.log('📧 Email verification with token')
    try {
      const response = await api.post('/auth/email-confirmation', {
        token
      })
      // console.log('✅ Email verification successful:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ Email verification error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      throw error
    }
  },

  logout: async (): Promise<void> => {
    // console.log('🚪 Logout attempt')
    try {
      await api.post('/auth/logout')
      // console.log('✅ Logout successful')
    } catch (error: any) {
      console.error('❌ Logout error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      throw error
    }
  },

  getCurrentUser: async (): Promise<User> => {
    // console.log('👤 Getting current user...')
    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    try {
      // console.log('🔍 Trying /admin/profile...')
      const response = await api.get('/admin/profile')
      // console.log('✅ Got user from /admin/profile:', response.data)
      return response.data
    } catch (error: any) {
      // console.log('❌ /admin/profile failed:', error.response?.status);
      
      try {
        // console.log('🔍 Trying /auth/me...')
        const response = await api.get('/auth/me')
        // console.log('✅ Got user from /auth/me:', response.data)
        return response.data
      } catch (authError: any) {
        console.error('❌ /auth/me also failed:', authError.response?.status);
        throw authError
      }
    }
  },

  // Password Reset Flow - Step 1: Request reset email
  resetPassword: async (email: string): Promise<{ message: string }> => {
    // console.log('🔄 Password reset request for:', email)
    try {
      const response = await api.post('/auth/password-recovery/reset', { 
        email 
      })
      // console.log('✅ Password reset email sent:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ Password reset error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      throw error
    }
  },

  // Password Reset Flow - Step 2: Set new password with token
  setNewPassword: async (token: string, password: string): Promise<{ message: string }> => {
    // console.log('🔑 Setting new password with token')
    try {
      const response = await api.post(`/auth/password-recovery/new-password/${token}`, {
        password
      })
      // console.log('✅ New password set successfully:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ Set new password error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      throw error
    }
  },
}