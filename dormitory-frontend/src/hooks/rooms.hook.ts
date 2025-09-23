import {roomsApi} from "@/app/lib/rooms.api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UpdateRoomData} from "@/types/rooms.types";
import {toast} from "sonner";

export function useGetRooms(){
    const{data, isLoading, error} = useQuery({
        queryKey: ["rooms"],
        queryFn: () => roomsApi.getRooms(),
        staleTime: 30 * 1000
    })
    return {data, isLoading, error};
}

export function useGetRoom(id: string){
    const {data, isLoading, error} = useQuery({
        queryKey: ["room",id],
        queryFn: () => roomsApi.getRoom(id),
        staleTime: 30 * 1000
    })
    return {data, isLoading, error};
}

export function useUpdateRoom(){
    const queryClient = useQueryClient()

    const updateRoom = useMutation({
        mutationFn: ({id, data}:{id:string, data:UpdateRoomData})=>roomsApi.updateRoom(id,data),
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey: ['room'] })
            toast.success('Room updated successfully!')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return({
        updateRoom: updateRoom.mutate,
        updatingRoom: updateRoom.isPending,
    })
}