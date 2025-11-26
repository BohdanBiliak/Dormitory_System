import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {authApi} from '@/app/lib/auth.api'
import {LoginRequest, RegisterRequest, UserRole} from '@/types/auth.types'
import {toast} from 'sonner'
import {useRouter} from 'next/navigation'
import {useCallback, useMemo} from "react";

export const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  // Query to fetch current user - this will check if user is authenticated
  const { data: user, isLoading: isLoadingUser, error: userError, refetch: refetchUser } = useQuery({
    queryKey: ['user', 'current'],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const handleLoginSuccess = useCallback(async (response: any) => {
    if(!response.newUser) {
      throw Error('Bad credentials')
    }
    const user = response.newUser

    // Update cache with the logged in user
    queryClient.setQueryData(['user', 'current'], user)
    
    toast.success('Login successful!')
    
    // Redirect based on role
    switch (user?.role){
      case UserRole.SuperAdmin: router.push('/admin/profile'); break;
      case UserRole.Admin: router.push('/admin/profile'); break;
      case UserRole.Regular: router.push('/profile');break;
      case UserRole.SignedInUser: router.push('/profile');break;
      case UserRole.Resident: router.push('/profile');break;
      default: router.push('/dormitories');
    }
  }, [queryClient, router])

  const handleLoginError = useCallback((error: any) => {
    console.error('Login error:', error)
    toast.error(error.response?.data?.message || 'Login failed')
  }, [])

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
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
      // Clear user data from cache
      queryClient.setQueryData(['user', 'current'], null)
      
      // Cancel all ongoing queries to prevent stale requests
      queryClient.cancelQueries()
      
      // Clear all cache data
      queryClient.clear()
      
      toast.success('Logged out successfully!')
      router.push('/auth/login')
    },
    onError: (error: any) => {
      console.error('Logout error:', error)
      
      // Even if logout fails on backend, clear local state
      queryClient.setQueryData(['user', 'current'], null)
      queryClient.cancelQueries()
      queryClient.clear()
      
      router.push('/auth/login')
      toast.error('Logout completed with errors')
    },
  })

  const isAuthenticated = useMemo(() => !!user, [user])
  
  const isLoading = useMemo(() => (
    loginMutation.isPending || 
    registerMutation.isPending || 
    verifyEmailMutation.isPending || 
    resetPasswordMutation.isPending || 
    setNewPasswordMutation.isPending || 
    logoutMutation.isPending
  ), [
    loginMutation.isPending,
    registerMutation.isPending,
    verifyEmailMutation.isPending,
    resetPasswordMutation.isPending,
    setNewPasswordMutation.isPending,
    logoutMutation.isPending
  ])

  return useMemo(() => ({
    // User data
    user,
    isLoadingUser,
    userError,
    isAuthenticated,

    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    verifyEmail: verifyEmailMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    setNewPassword: setNewPasswordMutation.mutate,
    logout: logoutMutation.mutate,

    // Loading states
    isLoading,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isVerifyingEmail: verifyEmailMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    isSettingNewPassword: setNewPasswordMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  }), [
    user,
    isLoadingUser,
    userError,
    isAuthenticated,
    loginMutation.mutate,
    loginMutation.isPending,
    registerMutation.mutate,
    registerMutation.isPending,
    verifyEmailMutation.mutate,
    verifyEmailMutation.isPending,
    resetPasswordMutation.mutate,
    resetPasswordMutation.isPending,
    setNewPasswordMutation.mutate,
    setNewPasswordMutation.isPending,
    logoutMutation.mutate,
    logoutMutation.isPending,
    isLoading,
  ])
}