import {roomsApi} from "@/app/lib/rooms.api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    AvailableRoomsRequest,
    CreateRoomStatusRequest,
    AssignRoomStatusRequest,
    EvictRequest,
    RoomReservationData,
    UpdateRoomData
} from "@/types/rooms.types";
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

export function useGetRoomStatuses(roomId: string){
    const {data, isLoading, error} = useQuery({
        queryKey: ["room-statuses", roomId],
        queryFn: () => roomsApi.getRoomStatuses(roomId),
        staleTime: 30 * 1000,
        enabled: !!roomId,
    })
    return {data, isLoading, error};
}

export function useGetCurrentRoomStatus(roomId: string){
    const {data, isLoading, error} = useQuery({
        queryKey: ["room-current-status", roomId],
        queryFn: () => roomsApi.getCurrentRoomStatus(roomId),
        staleTime: 30 * 1000,
        enabled: !!roomId,
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
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message)
        }
    })

    const assignRoomStatus = useMutation({
        mutationFn: ({roomId, statusData}:{roomId:string, statusData:AssignRoomStatusRequest})=>roomsApi.assignRoomStatus(roomId, statusData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["room"] })
            queryClient.invalidateQueries({ queryKey: ["rooms"] })
            toast.success('Room status assigned successfully!')
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message)
        }
    })

    const endRoomStatus = useMutation({
        mutationFn: ({roomId, statusId}:{roomId: string, statusId:string})=>roomsApi.endRoomStatus(roomId, statusId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["room"] })
            queryClient.invalidateQueries({ queryKey: ["rooms"] })
            toast.success('Room status ended successfully!')
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message)
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

    const evictUser = useMutation({
        mutationFn: ({roomId, body}:{roomId:string, body:EvictRequest})=>roomsApi.evictUser(roomId, body),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["room"], exact: false})
            await queryClient.invalidateQueries({ queryKey: ["rooms"], exact: false})
            await queryClient.invalidateQueries({ queryKey: ["dormitories"], exact: false})
            toast.success('User evicted successfully!')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    const uploadRoomPhoto = useMutation({
        mutationFn: ({files}:{files:File[]})=>roomsApi.uploadRoomPhotos(files),
        onSuccess: (urls:{urls:string[]}) => {
            queryClient.invalidateQueries({ queryKey: ["room"] })
            toast.success('Room photo uploaded successfully!')
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
        assignRoomStatus: assignRoomStatus.mutate,
        assigningRoomStatus: assignRoomStatus.isPending,
        endRoomStatus: endRoomStatus.mutate,
        endingRoomStatus: endRoomStatus.isPending,
        removeRoomStatus: removeRoomStatus.mutate,
        removingRoomStatus: removeRoomStatus.isPending,
        evictUser: evictUser.mutate,
        evictingUser: evictUser.isPending,
        uploadRoomPhoto: uploadRoomPhoto.mutate,
        uploadingRoomPhoto: uploadRoomPhoto.isPending,
    })
}

export const useUploadRoomPhoto = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({urls}:{urls:File[]}) => roomsApi.uploadRoomPhotos(urls),
        onSuccess: (data) => {
            // console.log(data)
        }
    })
}

export function useBookARoom(){
    const queryClient = useQueryClient()

    const requestAccommodation = useMutation({
        mutationFn: (data: RoomReservationData) => roomsApi.requestAccommodation(data),
        onSuccess: () => {
            toast.success('Thank you for reservation! Await for approval from admin.')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return{
        requestAccommodation: requestAccommodation.mutate,
        requestingAccommodation: requestAccommodation.isPending,
    }
}