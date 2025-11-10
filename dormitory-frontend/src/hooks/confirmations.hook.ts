import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { confirmationsApi } from '@/app/lib/confirmations.api'
import { toast } from 'sonner'
import {BookingConfirmationApproval} from "@/types/confirmations.types";

export const useConfirmations = () => {
  const queryClient = useQueryClient()

  // Get all confirmations
  const { data: confirmations, isLoading, error } = useQuery({
    queryKey: ['confirmations'],
    queryFn: () => confirmationsApi.getConfirmations(),
    staleTime: 30 * 1000, // 30 seconds
  })

  // Get filtered confirmations
  const useFilteredConfirmations = (filters: {
    type?: string
    status?: string
    sortBy?: 'newest' | 'oldest'
    page?: number
    limit?: number
  }) => {
    return useQuery({
      queryKey: ['confirmations', 'filtered', filters],
      queryFn: () => confirmationsApi.getConfirmations(filters),
      enabled: !!filters,
      staleTime: 30 * 1000,
    })
  }

  // Approve confirmation
  const approveConfirmation = useMutation({
    mutationFn: (id: string) => confirmationsApi.approveConfirmation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['confirmations'] })
      toast.success('Confirmation approved successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to approve confirmation')
    },
  })

  // Reject confirmation
  const rejectConfirmation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      confirmationsApi.rejectConfirmation(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['confirmations'] })
      toast.success('Confirmation rejected successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to reject confirmation')
    },
  })

  const approveAccommodationConfirmation = useMutation({
    mutationFn: ({id, approvalData}:{id:string, approvalData: BookingConfirmationApproval}) =>
      confirmationsApi.approveAccommodationConfirmation(id, approvalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['confirmations'] })
      toast.success('Confirmation approved successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to approve confirmation')
    },
  })

  return {
    confirmations,
    isLoading,
    error,
    useFilteredConfirmations,
    approveConfirmation: approveConfirmation.mutate,
    rejectConfirmation: rejectConfirmation.mutate,
    isApproving: approveConfirmation.isPending,
    isRejecting: rejectConfirmation.isPending,
    approveAccommodationConfirmation: approveAccommodationConfirmation.mutate,
    approvingAccommodationConfirmation: approveAccommodationConfirmation.isPending,
  }
}