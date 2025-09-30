import {roomsApi} from "@/app/lib/rooms.api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AvailableRoomsRequest, CreateRoomStatusRequest, UpdateRoomData} from "@/types/rooms.types";
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

export function useGetAvailableRoom(request: AvailableRoomsRequest){
    const {data, isLoading, error} = useQuery({
        queryKey: ["rooms", "available", `from: ${request.from}`, `to: ${request.to}`],
        queryFn: () => roomsApi.getAvailableRooms(request),
        staleTime: 30 * 1000
    })
    return {data, isLoading, error};
}

export function useUpdateRoom(){
    const queryClient = useQueryClient()

    const updateRoom = useMutation({
        mutationFn: ({id, data}:{id:string, data:UpdateRoomData})=>roomsApi.updateRoom(id,data),
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] })
            toast.success('Room updated successfully!')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    const postRoomStatus = useMutation({
        mutationFn: ({roomId, statusData}:{roomId:string, statusData:CreateRoomStatusRequest})=>roomsApi.postRoomStatus(roomId, statusData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["room"] })
            toast.success('Room status created successfully!')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    const removeRoomStatus = useMutation({
        mutationFn: ({roomId, statusId}:{roomId: string, statusId:string})=>roomsApi.removeRoomStatus(roomId, statusId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["room"] })
            toast.success('Room status removed successfully!')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return({
        updateRoom: updateRoom.mutate,
        updatingRoom: updateRoom.isPending,
        postRoomStatus: postRoomStatus.mutate,
        postingRoomStatus: postRoomStatus.isPending,
        removeRoomStatus: removeRoomStatus.mutate,
        removingRoomStatus: removeRoomStatus.isPending
    })
}