import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ManagerCreationData} from "@/types/managers.types";
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

    return {
        createManager: createManager.mutate,
        creatingManager: createManager.isPending
    }

}