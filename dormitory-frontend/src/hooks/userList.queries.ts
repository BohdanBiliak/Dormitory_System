import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userListApi } from "@/app/lib/userList.api"
import { UserListRequest } from "@/types/users.types"

export function useUserListQuery(filters?: UserListRequest) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["userList", filters],
        queryFn: async () => {
            return await userListApi.getUsers(filters)
        },
        staleTime: 30 * 1000,
    })
    return { data, isLoading, error }
}

export function useUserProfile(id: string) {
    return useQuery({
        queryKey: ['user', 'profile', id],
        queryFn: async () => await userListApi.getUserData(id),
        enabled: !!id,
        staleTime: 30 * 1000,
    })
}

// ✅ Custom hook for deactivating a user
export function useUserList() {
    const queryClient = useQueryClient()

    const dectivateUser= useMutation({
        mutationFn: ({ id }: { id: string }) => userListApi.deactivateUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
            toast.success('User deactivated successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to deactivate user')
        }
    })

    const activateUser = useMutation({
        mutationFn: ({ id }: { id: string }) => userListApi.activateUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
            toast.success('User activated successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to activate user')
        }
    })

    return {
        activateUser: activateUser.mutate,
        dectivateUser: dectivateUser.mutate,

        activatingUser: activateUser.isPending,
        deactivatingUser: dectivateUser.isPending
    }
}
