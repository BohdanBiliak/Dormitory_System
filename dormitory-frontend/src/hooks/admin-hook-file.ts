import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { adminApi, UpdateProfileRequest } from '@/app/lib/admin.api'
import { toast } from 'sonner'
import {userListApi} from "@/app/lib/userList.api";




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

  const {data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => userListApi.getUsers(),
    staleTime: 30 * 1000,
  })

  const getUserList=(filters:{
    role?: 'Regular'|'All'|'SignedInUser',
    paymentStatus?: 'Paid' | 'Awaiting' |'Overdue'|'All',
    roomFlor?: string[],
    sortBy?: 'Name'|'Id'|'Room',
    page: number,
    limit: number,
  }) => {
    return useQuery({
    queryKey:['profiles', 'filtered', filters],
    queryFn: () => userListApi.getUsers(filters),
    enabled: !!filters,
    staleTime: 30 * 1000,
  })}

  const getUserProfile=(id:string)=>{
    return useQuery({
      queryKey:['user','profile', 'id', id],
      queryFn: ()=>userListApi.getUserData(id),
      enabled: !!id,
      staleTime: 30 * 1000,
    })
  }

  const deactivateUserProfile=useMutation({
    mutationFn: ({id}:{id: string}) =>userListApi.deactivateUser(id),
    onSuccess: ()=> {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      toast.success('User deactivated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message||'Failed to deactivate user')
    }
  })

  const activateUserProfile=useMutation({
    mutationFn: ({id}:{id: string}) =>userListApi.activateUser(id),
    onSuccess: ()=> {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      toast.success('User activated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to activate user')
    }
  })

  // const updateProfile=useMutation({
  //   mutationFn: (id: string)=>userListApi.updateUser(id)
  //   onSuccess:
  // })

  return {
    users,
    isLoading,
    error,
    getUserList,
    getUserProfile,
    deactivateUser: deactivateUserProfile.mutate,
    isDeactivating: deactivateUserProfile.isPending,
    activateUser: activateUserProfile.mutate,
    isActivating: activateUserProfile.isPending,
  }
}