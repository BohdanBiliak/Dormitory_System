import { useQuery } from '@tanstack/react-query'
import { dormitoryApi } from '@/app/lib/dorms.api'

export const usePublicDormitories = () => {
  return useQuery({
    queryKey: ['public-dormitories'],
    queryFn: () => dormitoryApi.getDormitories(),
    staleTime: 30 * 1000
  })
}

export const usePublicDormitoryDetails = (id: string) => {
  return useQuery({
    queryKey: ['public-dormitory', id],
    queryFn: () => dormitoryApi.getDormitory(id),
    staleTime: 30 * 1000,
    enabled: !!id
  })
}