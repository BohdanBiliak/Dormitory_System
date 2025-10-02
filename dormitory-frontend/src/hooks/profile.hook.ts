import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { adminApi, UpdateProfileRequest } from '@/app/lib/admin.api'
import { toast } from 'sonner'



export function useGetAdminProfile(){
  const {data, isLoading, error} = useQuery({
    queryFn: ()=>adminApi.getProfile(),
    queryKey: ['admin', 'profile'],
    staleTime: 3 * 1000,
  })
  return {data, isLoading, error}
}

export function useMutateAdminProfile (){
  const queryClient = useQueryClient()

  const updateProfile = useMutation({
    mutationFn: (data: UpdateProfileRequest) => adminApi.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Update the cached user data
      queryClient.setQueryData(['admin', 'currentUser'], updatedUser)
      queryClient.invalidateQueries({ queryKey: ['admin', 'currentUser'] })
      toast.success('Profile updated successfully!')
    },
    onError: (error: any) => {
      console.error('Update profile error:', error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    },
  })

  const uploadAvatar = useMutation({
    mutationFn: ({ file, userLastName }: { file: File; userLastName: string }) => {return adminApi.uploadAvatar(file)}
    ,
    onSuccess: (response) => {
      //queryClient.invalidateQueries({ queryKey: ['currentUser'] })
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
