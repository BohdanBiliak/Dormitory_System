import {api} from "@/app/lib/api.api";
import {Dormitory, RoomGenerationShema} from "@/types/dormitories.types";



export interface DormitoriesResponse {
    "data"?: Dormitory[];
    "total": number;
    "page": number;
    "last_page": number;
}

export interface DormitoryRequest {
    "name": string;
    "address": string;
    "groundFloorPhoneNumber": string;
    "roomGeneration": RoomGenerationShema;
}

export interface DormitoryUpdateRequest {
    "name": string;
    "address": string;
    "groundFloorPhoneNumber": string;
}


export const dormitoryApi = {

    //get all active dormitories
    async getDormitories(): Promise<DormitoriesResponse> {
        const response = await api.get('/dormitories');
        return response.data;
    },

    //get dormitory by id
    async getDormitory(id:string): Promise<Dormitory> {
        const response = await api.get(`/dormitories/${id}`);
        return response.data;
    },

    //post/create dormitory
    async createDormitory(newDormitory:DormitoryRequest): Promise<Dormitory> {
        const response = await api.post('/dormitories', newDormitory);
        return response.data;
    },

    // patch/update dormitory
    async updateDormitory(id: string, newDormitory:DormitoryUpdateRequest): Promise<Dormitory> {
        const response = await api.patch(`/dormitories/${id}`, newDormitory);
        return response.data;
    },

    // patch/deactivate dormitory
    async deactivateDormitory(id:string): Promise<Dormitory> {
        const response = await api.patch(`/dormitories/${id}/deactivate`);
        return response.data;
    },

    //get deactivated dormitories
    async getDeactivatedDormitories(): Promise<DormitoriesResponse> {
        const response = await api.get(`/dormitories/deactivated`);
        return response.data;
    },

    async activateDormitory(id:string): Promise<Dormitory> {
        const response = await api.patch(`/dormitories/${id}/activate`);
        return response.data;
    }

}