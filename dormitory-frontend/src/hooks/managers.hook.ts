import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ManagerCreationData, ManagerEditionData} from "@/types/managers.types";
import {managersApi} from "@/app/lib/managers.api";
import {toast} from "sonner";

export function useManagers(){
    const queryClient = useQueryClient();

    const createManager = useMutation({
        mutationFn: (managerData: ManagerCreationData) => managersApi.createManager(managerData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
            toast.success("Manager created!");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const updateManager = useMutation({
        mutationFn: ({managerId, newManagerData}:{managerId:string, newManagerData: ManagerEditionData}) => managersApi.updateManager(managerId, newManagerData),
        onSuccess: (manager) => {
            queryClient.invalidateQueries({queryKey: ["user" , "profile", manager.id]})
            toast.success("Manager updated!");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return {
        createManager: createManager.mutate,
        creatingManager: createManager.isPending,
        updateManager: updateManager.mutate,
        updatingManager: updateManager.isPending,
    }

}