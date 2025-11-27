import { api } from "@/app/lib/api.api";
import {
    RoomStatusType,
    CreateRoomStatusTypeRequest,
    UpdateRoomStatusTypeRequest,
} from "@/types/roomStatusTypes.types";

export const roomStatusTypesApi = {
    async getRoomStatusTypes(includeInactive = false): Promise<RoomStatusType[]> {
        const response = await api.get(`/room-status-types`, {
            params: { includeInactive: includeInactive ? 'true' : undefined }
        });
        return response.data;
    },

    async getRoomStatusType(id: string): Promise<RoomStatusType> {
        const response = await api.get(`/room-status-types/${id}`);
        return response.data;
    },

    async createRoomStatusType(data: CreateRoomStatusTypeRequest): Promise<RoomStatusType> {
        const response = await api.post(`/room-status-types`, data);
        return response.data;
    },

    async updateRoomStatusType(id: string, data: UpdateRoomStatusTypeRequest): Promise<RoomStatusType> {
        const response = await api.patch(`/room-status-types/${id}`, data);
        return response.data;
    },

    async deleteRoomStatusType(id: string): Promise<void> {
        await api.delete(`/room-status-types/${id}`);
    },

    async activateRoomStatusType(id: string): Promise<RoomStatusType> {
        const response = await api.post(`/room-status-types/${id}/activate`);
        return response.data;
    },

    async deactivateRoomStatusType(id: string): Promise<RoomStatusType> {
        const response = await api.post(`/room-status-types/${id}/deactivate`);
        return response.data;
    },

    async initializeSystemStatuses(): Promise<{ message: string }> {
        const response = await api.post(`/room-status-types/initialize-system-statuses`);
        return response.data;
    },
};
