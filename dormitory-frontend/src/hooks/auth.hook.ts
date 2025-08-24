import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/app/lib/auth.api'
import { LoginRequest, RegisterRequest, User } from '@/types/auth.types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  // Get current user query
  // const {
  //   data: user,
  //   isLoading: isLoadingUser,
  //   error: userError
  // } = useQuery({
  //   queryKey: ['auth', 'currentUser'],
  //   queryFn: authApi.getCurrentUser,
  //   retry: 1,
  //   staleTime: 5 * 60 * 1000, // 5 minutes
  // })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      const {data} =

      if(data==undefined){
        throw Error('No currentUser in query')
      }

      toast.success('Login successful!')
      queryClient.invalidateQueries({ queryKey: ['auth', 'currentUser'] })
      console.log(data.role)
      switch (data.role){
        case 'SuperAdmin': router.push('/admin/profile'); break;
        case 'Admin': router.push('/admin/login'); break;
        case 'Regular': break;
        case 'SignedInUser': break;
        default: throw Error('Unidentified user role');
      }
    },
    onError: (error: any) => {
      console.error('Login error:', error)
      toast.error(error.response?.data?.message || 'Login failed')
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Registration successful! Please check your email for verification.')
      router.push('/auth/login')
    },
    onError: (error: any) => {
      console.error('Register error:', error)
      toast.error(error.response?.data?.message || 'Registration failed')
    },
  })

  // Email verification mutation
  const verifyEmailMutation = useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'currentUser'] })
      toast.success(response.message || 'Email verified successfully!')
    },
    onError: (error: any) => {
      console.error('Email verification error:', error)
      toast.error(error.response?.data?.message || 'Email verification failed')
    },
  })

  // Reset password mutation (Step 1: Send reset email)
  const resetPasswordMutation = useMutation({
    mutationFn: (email: string) => authApi.resetPassword(email),
    onSuccess: (response) => {
      toast.success('Password reset email sent! Check your inbox.')
    },
    onError: (error: any) => {
      console.error('Reset password error:', error)
      toast.error(error.response?.data?.message || 'Failed to send reset email')
    },
  })

  // Set new password mutation (Step 2: Update password with token)
  const setNewPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) => 
      authApi.setNewPassword(token, password),
    onSuccess: (response) => {
      toast.success('Password updated successfully!')
      router.push('/auth/login')
    },
    onError: (error: any) => {
      console.error('Set new password error:', error)
      toast.error(error.response?.data?.message || 'Failed to update password')
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'currentUser'], null)
      queryClient.removeQueries({ queryKey: ['auth'] })
      toast.success('Logged out successfully!')
      router.push('/auth/login')
    },
    onError: (error: any) => {
      console.error('Logout error:', error)
      toast.error('Logout failed')
    },
  })

  return {
    // User data
    // user,
    // isLoadingUser,
    // userError,
    // isAuthenticated: !!user,

    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    verifyEmail: verifyEmailMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    setNewPassword: setNewPasswordMutation.mutate,
    logout: logoutMutation.mutate,

    // Loading states
    isLoading: loginMutation.isPending || registerMutation.isPending || verifyEmailMutation.isPending || resetPasswordMutation.isPending || setNewPasswordMutation.isPending || logoutMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isVerifyingEmail: verifyEmailMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    isSettingNewPassword: setNewPasswordMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  }
}