import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi, UpdateProfileRequest } from '@/app/lib/admin.api'
import { toast } from 'sonner'
import {userListApi, UserListRequest} from "@/app/lib/userList.api";




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

  // Temporarily disable avatar upload until we fix the endpoint
  const uploadAvatar = useMutation({
    mutationFn: ({ file, userLastName }: { file: File; userLastName: string }) => {
      // Return a rejected promise for now
      return Promise.reject(new Error('Avatar upload temporarily disabled'))
    },
    onSuccess: (response) => {
      toast.success('Avatar updated successfully!')
    },
    onError: (error: any) => {
      console.error('Upload avatar error:', error)
      toast.error('Avatar upload is temporarily disabled')
    },
  })

  return {
    updateProfile: updateProfile.mutate,
    uploadAvatar: uploadAvatar.mutate,
    isUpdatingProfile: updateProfile.isPending,
    isUploadingAvatar: uploadAvatar.isPending,
  }
}

export const useUserList = () => {
  const queryClient = useQueryClient()

  const getUserList = useMutation({
    mutationFn:(data:UserListRequest)=>userListApi.getUsers(data),
    onSuccess: (userList) => {
      queryClient.setQueryData(['auth', 'userList'], userList)
      queryClient.invalidateQueries({ queryKey: ['auth', 'userList'] })
      toast.success('User lists fetchd successfully!')
    },
    onError: (error: any) => {
      console.error('User lists error:', error)
    }
  })

  return {
    getUserList: getUserList.mutate,
  }
}