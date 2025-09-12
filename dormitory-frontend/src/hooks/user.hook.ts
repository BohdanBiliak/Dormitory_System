import {useQuery} from "@tanstack/react-query";
import {userApi} from "@/app/lib/user.api";

export const useCurrentUserProfile = ()=>{
    const {data, isLoading, error, refetch} = useQuery({
        queryFn: () => userApi.getCurrentUser(),
        queryKey: ['user', 'current'],
        staleTime: 30 * 1000,
    })
    return {data, isLoading, error, refetch};
}