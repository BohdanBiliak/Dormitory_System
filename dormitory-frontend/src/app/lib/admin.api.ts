import { api } from './api.api'
import {UpdateProfileRequest, User} from "@/types/user.types";


export const adminApi = {
  // Get current admin profile
  async getProfile(): Promise<User> {
    const response = await api.get('/admin/profile')
    return response.data
  },

  // Update admin profile - now matches the corrected DTO
  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    console.log('🔄 Updating admin profile:', data)
    
    try {
      // Send data directly - fields now match the DTO and database
      const response = await api.patch('/admin/profile', data)
      console.log('✅ Profile updated:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ Profile update error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      throw error
    }
  },

  // Upload avatar - simplified
  async uploadAvatar(file: File): Promise<{ url: string }> {
    console.log('📤 Uploading avatar...')
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await api.post('/admin/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('✅ Avatar uploaded:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ Avatar upload error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      throw error
    }
  },
}