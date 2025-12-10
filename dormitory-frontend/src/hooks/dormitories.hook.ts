import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {dormitoryApi} from "@/app/lib/dorms.api";
import {toast} from "sonner";
import {useMemo, useCallback} from "react";
import {
    Dormitory,
    DormitoryRequest,
    DormitoriesResponse,
    DormitoryUpdateRequest,
    DormitoryPostData
} from "@/types/dormitories.types";

export function useGetActiveDormitories() {
    const queryFn = useCallback(() => dormitoryApi.getDormitories(), []);
    const queryKey = useMemo(() => ['dormitories', 'active'], []);
    
    const {data, isLoading, error, refetch} = useQuery({
        queryFn,
        queryKey,
        staleTime: 30 * 1000
    });
    return useMemo(() => ({data, isLoading, error, refetch}), [data, isLoading, error, refetch]);
}

export function useGetDeactivatedDormitories() {
    const queryFn = useCallback(() => dormitoryApi.getDeactivatedDormitories(), []);
    const queryKey = useMemo(() => ['dormitories', 'deactivated'], []);
    
    const {data, isLoading, error, refetch} = useQuery({
        queryFn,
        queryKey,
        staleTime: 30 * 1000
    })
    return useMemo(() => ({data, isLoading, error, refetch}), [data, isLoading, error, refetch]);
}

export function useGetDormitoryById(id: string){
    const queryFn = useCallback(() => dormitoryApi.getDormitory(id), [id]);
    const queryKey = useMemo(() => ['dormitory', 'id', id], [id]);
    
    const {data, isLoading, error} = useQuery({
        queryFn,
        queryKey,
        staleTime: 30 * 1000
    })
    return useMemo(() => ({data, isLoading, error}), [data, isLoading, error]);
}

export function useDormitories() {
    const queryClient = useQueryClient();

    const createDormitory = useMutation({
        mutationFn: ({newDormitory}:{newDormitory:DormitoryPostData})=>dormitoryApi.createDormitory(newDormitory),
        onSuccess: (result:Dormitory) => {
            queryClient.invalidateQueries({queryKey: ['dormitories']})
            toast.success("Dormitory has been created!")
        },
        onError: (error:any)=> {
            // console.log(error.message)
            toast.error(error?.response?.data?.message || "Failed to create dormitory");
        }
    })

    const updateDormitory = useMutation({
        mutationFn: ({updatedInformation, id}:{updatedInformation:DormitoryUpdateRequest, id:string})=>dormitoryApi.updateDormitory(id,updatedInformation),
        onSuccess: (result:Dormitory) => {
            queryClient.invalidateQueries({queryKey: ['dormitory', result]})
            queryClient.invalidateQueries({queryKey: ['dormitories']})
            toast.success("Dormitory has been updated!")
        },
        onError: (error:any)=> {
            toast.error(error?.response?.data?.message || "Failed to update dormitory");
        }
    })

    const deactivateDormitory = useMutation({
        mutationFn: ({id}:{id:string})=>dormitoryApi.deactivateDormitory(id),
        onSuccess: (result:Dormitory) => {
            queryClient.invalidateQueries({queryKey: ['dormitories']})
            queryClient.invalidateQueries({queryKey: ['dormitory', result]})
            toast.success("Dormitory has been deactivated!")
        },
        onError: (error:any)=> {
            toast.error(error?.response?.data?.message || "Failed to deactivate dormitory");
        }
    })

    const activateDormitory=useMutation({
        mutationFn: ({id}:{id:string})=>dormitoryApi.activateDormitory(id),
        onSuccess: (result:Dormitory) => {
            queryClient.invalidateQueries({queryKey: ['dormitories']})
            queryClient.invalidateQueries({queryKey: ['dormitory', result]})
            toast.success("Dormitory has been activated!")
        },
        onError: (error:any)=> {
            toast.error(error?.response?.data?.message || "Failed to activate dormitory");
        }
    })

    return{
        createDormitory: createDormitory.mutate,
        isCreatingDormitory: createDormitory.isPending,
        updateDormitory: updateDormitory.mutate,
        isUpdatingDormitory: updateDormitory.isPending,
        deactivateDormitory: deactivateDormitory.mutate,
        isDeactivatingDormitory: deactivateDormitory.isPending,
        activateDormitory: activateDormitory.mutate,
        activatingDormitory: activateDormitory.isPending,
    }
}