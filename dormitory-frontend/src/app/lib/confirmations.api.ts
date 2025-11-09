import {Confirmation, ConfirmationsResponse} from '@/types/confirmations.types'
import { api } from './api.api'

export const confirmationsApi = {
  // Get confirmations with filters
  async getConfirmations(filters?: {
    type?: string
    status?: string
    addressee?: string
    page?: number
    limit?: number
  }): Promise<ConfirmationsResponse> {
    const params = new URLSearchParams()
    
    if (filters?.type && filters.type !== 'All') {
      const typeMap: Record<string, string> = {
        'Identity Verification': 'IDENTITY_VERIFICATION',
        'Accommodation': 'ACCOMMODATION',
        'Room change': 'ROOM_CHANGE',
        'Room vacation': 'ROOM_VACATION'
      }
      params.append('type', typeMap[filters.type] || filters.type)
    }
    
    if (filters?.status && filters.status !== 'All') {
      params.append('status', filters.status.toUpperCase())
    }
    
    if (filters?.addressee) {
      params.append('addressee', filters.addressee)
    }
    
    if (filters?.page) {
      params.append('page', filters.page.toString())
    }
    
    if (filters?.limit) {
      params.append('limit', filters.limit.toString())
    }

    const response = await api.get(`/admin/confirmations?${params}`)
    return response.data
  },

  // Get single confirmation details
  async getConfirmationDetails(id: string): Promise<Confirmation> {
    const response = await api.get(`/admin/confirmations/${id}`)
    return response.data
  },

  // Approve confirmation
  async approveConfirmation(id: string): Promise<Confirmation> {
    const response = await api.patch(`/admin/confirmations/${id}`, {
      status: 'APPROVED'
    })
    return response.data
  },

  // Reject confirmation
  async rejectConfirmation(id: string, reason: string): Promise<Confirmation> {
    const response = await api.post(`/admin/reject-confirmation/${id}`, {
      reason: reason
    })
    return response.data
  },

  // Approve accommodation request
  async approveAccommodation(
    id: string, 
    options?: {
      alternativeRoomId?: string
      suggestedTime?: string
      reason?: string
    }
  ): Promise<{
    message: string
    confirmation: Confirmation
    assignedRoom: {
      id: string
      number: string
      dormitory: string
      floor: number
    }
  }> {
    const response = await api.post(`/admin/confirmations/${id}/approve`, options || {})
    return response.data
  },
}