import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Dormitory, dormitoryApi, DormitoryRequest} from "@/app/lib/dorms.api";
import {toast} from "sonner";

export const useDormitories = () => {
    const queryClient = useQueryClient();

    //query to retrieve information about all dormitories
    const {data: dormitories, isLoading, error} = useQuery({
        queryKey: ["dormitories", "all"],
        queryFn: () => dormitoryApi.getAllDormitories(),
        staleTime: 30 * 1000,
    });

    const getAllDormitories = () =>{
        return useQuery({
            queryKey: ["dormitories", "all"],
            queryFn: () => dormitoryApi.getAllDormitories(),
            staleTime: 30 * 1000,
        })
    }

    const getActiveDormitories = () => {
        return useQuery({
            queryKey: ["dormitories", "active"],
            queryFn: ()=>dormitoryApi.getDormitories(),
            staleTime: 30 * 1000,
        })
    }

    const getDeactivatedDormitories = () => {
        return useQuery({
            queryKey: ["dormitories", "deactivated"],
            queryFn: ()=>dormitoryApi.getDeactivatedDormitories(),
            staleTime: 30 * 1000,
        })
    }

    const getDormitory = (id:string) => {
        return useQuery({
            queryKey: ["dormitory", "id", id],
            queryFn: () => dormitoryApi.getDormitory(id),
            enabled: !!id,
            staleTime: 30 * 1000,
        })
    }

    const createDormitory = useMutation({
        mutationFn: ({newDormitory}:{newDormitory:DormitoryRequest})=>dormitoryApi.createDormitory(newDormitory),
        onSuccess: (result:Dormitory) => {
            queryClient.invalidateQueries({queryKey: ['dormitory']})
            toast.success("Dormitory has been created!")
        },
        onError: (error:any)=> {
            toast.error(error?.response?.data?.message || "Failed to create dormitory");
        }
    })

    const updateDormitory = useMutation({
        mutationFn: ({updatedInformation, id}:{updatedInformation:DormitoryRequest, id:string})=>dormitoryApi.updateDormitory(id,updatedInformation),
        onSuccess: (result:Dormitory) => {
            queryClient.invalidateQueries({queryKey: ['dormitory']})
            toast.success("Dormitory has been updated!")
        },
        onError: (error:any)=> {
            toast.error(error?.response?.data?.message || "Failed to update dormitory");
        }
    })

    const deactivateDormitory = useMutation({
        mutationFn: ({id}:{id:string})=>dormitoryApi.deactivateDormitory(id),
        onSuccess: (result:Dormitory) => {
            queryClient.invalidateQueries({queryKey: ['dormitory']})
            toast.success("Dormitory has been deactivated!")
        },
        onError: (error:any)=> {
            toast.error(error?.response?.data?.message || "Failed to deactivate dormitory");
        }
    })

    return{
        dormitories,
        isLoading,
        error,
        getAllDormitories,
        getActiveDormitories,
        getDeactivatedDormitories,
        getDormitory,
        createDormitory: createDormitory.mutate,
        isCreatingDormitory: createDormitory.isPending,
        updateDormitory: updateDormitory.mutate,
        isUpdatingDormitory: updateDormitory.isPending,
        deactivateDormitory: deactivateDormitory.mutate,
        isDeactivatingDormitory: deactivateDormitory.isPending,
    }
}