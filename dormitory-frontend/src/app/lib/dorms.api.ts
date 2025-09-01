import {api} from "@/app/lib/api.api";

export interface Dormitory {
    id: string;
    name: string;
    address: string;
    groundFloorPhoneNumber: string;
    status: 'Active' | 'Deactivated';
    photos: string[];
    managerId?: string[];
    createdAt: string;
}

export interface AllDormitoriesResponse {
    "data":{
        "active": Dormitory[];
        //"deactivated"?: Dormitory[];
    }
}

export interface DormitoriesResponse {
    "data": Dormitory[];
    "total": number;
    "page": number;
    "last_page": number;
}

export interface DormitoryRequest {
    "name": string;
    "address": string;
    "groundFloorPhoneNumber": string;
    "roomGeneration": string;
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
    async updateDormitory(id: string, newDormitory:DormitoryRequest): Promise<Dormitory> {
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

    async getAllDormitories(): Promise<AllDormitoriesResponse>{
        const activeDormitories = await api.get('/dormitories');
        //const deactivatedDormitories = await api.get('/dormitories/deactivated');
        return activeDormitories.data
    },

}