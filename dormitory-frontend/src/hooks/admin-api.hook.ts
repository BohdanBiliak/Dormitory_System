import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi, UpdateProfileRequest } from '@/app/lib/admin.api'
import { toast } from 'sonner'

export const useAdminProfile = () => {
  const queryClient = useQueryClient()

  const updateProfile = useMutation({
    mutationFn: (data: UpdateProfileRequest) => adminApi.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Update the cached user data
      queryClient.setQueryData(['auth', 'currentUser'], updatedUser)
      queryClient.invalidateQueries({ queryKey: ['auth', 'currentUser'] })
      toast.success('Profile updated successfully!')
    },
    onError: (error: any) => {
      console.error('Update profile error:', error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    },
  })

  const uploadAvatar = useMutation({
    mutationFn: (file: File) => adminApi.uploadAvatar(file),
    onSuccess: (response) => {
      // Update user picture in cache
      queryClient.setQueryData(['auth', 'currentUser'], (oldData: any) => ({
        ...oldData,
        picture: response.url
      }))
      queryClient.invalidateQueries({ queryKey: ['auth', 'currentUser'] })
      toast.success('Avatar updated successfully!')
    },
    onError: (error: any) => {
      console.error('Upload avatar error:', error)
      toast.error(error.response?.data?.message || 'Failed to upload avatar')
    },
  })

  return {
    updateProfile: updateProfile.mutate,
    uploadAvatar: uploadAvatar.mutate,
    isUpdatingProfile: updateProfile.isPending,
    isUploadingAvatar: uploadAvatar.isPending,
  }
}