import {api} from "@/app/lib/api.api";
import {Room} from "@/types/rooms.types";

export const roomsApi= {
    async getRooms(): Promise<Room[]>{
        const response = await api.get(`/rooms`);
        return response.data;
    }
}