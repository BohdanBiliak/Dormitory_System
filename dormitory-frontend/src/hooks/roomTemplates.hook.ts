import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {RoomTemplatePostData} from "@/types/dormitories.types";
import {roomTemplatesApi} from "@/app/lib/roomTemplates.api";
import {toast} from "sonner";

export function useMutateRoomTemplate(){
    const queryClient = useQueryClient();

    const createRoomTemplate = useMutation({
        mutationFn: (newTemplate: RoomTemplatePostData)=> roomTemplatesApi.postRoomTemplate(newTemplate),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['roomTemplates']});
            console.log('RoomTemplate created!');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const updateRoomTemplate = useMutation({
        mutationFn: ({templateId, newTemplate}:{templateId: string, newTemplate: RoomTemplatePostData}) => roomTemplatesApi.updateRoomTemplate(templateId, newTemplate),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['roomTemplate', response.id]});
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return {
        createRoomTemplate: createRoomTemplate.mutate,
        creatingRoomTemplate: createRoomTemplate.isPending,
        updateRoomTemplate: updateRoomTemplate.mutate,
        updatingRoomTemplate: updateRoomTemplate.isPending,
    }

}

export function useGetRoomTemplates() {
    const {data, isLoading, error} = useQuery({
        queryFn: () => roomTemplatesApi.getRoomTemplates(),
        queryKey: ['roomTemplates'],
        staleTime: 3 * 1000
    })
    return {data, isLoading, error}
}

export function useGetRoomTemplate(templateId: string) {
    const {data, isLoading, error} =useQuery({
        queryFn:()=>roomTemplatesApi.getRoomTemplateById(templateId),
        queryKey: ['roomTemplate', templateId],
        staleTime: 3 * 1000
    })
    return {data, isLoading, error};
}