import {api} from "@/app/lib/api.api";
import {
    AvailableRoomsRequest,
    CreateRoomStatusRequest,
    EvictRequest,
    Room, RoomReservationData,
    RoomStatus,
    UpdateRoomData
} from "@/types/rooms.types";
import {User} from "@/types/auth.types";

export const roomsApi= {
    async getRooms(): Promise<Room[]>{
        const response = await api.get(`/rooms`);
        return response.data;
    },

    async getRoom(id:string):Promise<Room>{
        const response = await api.get(`/rooms/${id}`);
        return response.data;
    },

    async updateRoom(id:string, data:UpdateRoomData): Promise<Room>{
        const response = await api.patch(`/rooms/${id}`, data);
        return response.data;
    },

    async getAvailableRooms(filters:AvailableRoomsRequest):Promise<Room[]>{
        const params = new URLSearchParams()

        if(filters.from !==''){
            params.append('from', filters.from)
        }

        if(filters.to !==''){
            params.append('to', filters.to)
        }

        if(filters.to !=='' && filters.from !==''){
            const response = await api.get(`/rooms/available?${params}`);
            return response.data;
        }else{
            const response = await api.get(`/rooms`);
            return response.data;
        }

    },

    async removeRoomStatus(roomId:string, statusId:string):Promise<RoomStatus>{
        const response = await api.delete(`/rooms/${roomId}/statuses/${statusId}`);
        return response.data;
    },

    async postRoomStatus(roomId:string, data:CreateRoomStatusRequest):Promise<RoomStatus>{
        const response = await api.post(`/rooms/${roomId}/statuses`, data);
        return response.data;
    },

    async evictUser(roomId:string, data:EvictRequest):Promise<User>{
        const response = await api.patch(`/rooms/${roomId}/evict-user`, data);
        return response.data;
    },

    async uploadRoomPhotos(files:File[]):Promise<{urls: string[]}>{
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        })

        try{
            const response = await api.post(`/rooms/upload`,formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            // console.log(response.data)
            return response.data;
        }catch (error: any) {
            console.error('Room photo upload error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            })
            throw error
        }
    },

    async requestAccommodation(reservationData: RoomReservationData){
        const response = await api.post('/rooms/request-accommodation',reservationData);
        return response.data;
    }
}