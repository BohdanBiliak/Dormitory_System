import { api } from './api.api'
import {UpdateProfileRequest} from "@/types/user.types";


export const adminApi = {
  async getProfile(){
    const response = await api.get('/admin/profile')
    return response.data
  },

  async updateProfile(data: UpdateProfileRequest) {
    // console.log('🔄 Updating admin profile:', data)
    
    try {
      const response = await api.patch('/admin/profile', data)
      // console.log('Profile updated:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Profile update error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      throw error
    }
  },

  async uploadAvatar(file: File): Promise<{ url: string }> {
    // console.log('Uploading avatar...')
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await api.post('/admin/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // console.log('Avatar uploaded:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Avatar upload error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      throw error
    }
  },
}