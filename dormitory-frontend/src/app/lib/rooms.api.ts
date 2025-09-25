import {api} from "@/app/lib/api.api";
import {Room, UpdateRoomData} from "@/types/rooms.types";

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


}