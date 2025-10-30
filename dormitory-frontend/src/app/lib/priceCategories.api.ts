import {PriceCategory, PriceCategoryPostData, PriceCategoryUpdateData, RoomTemplate} from "@/types/dormitories.types";
import {api} from "@/app/lib/api.api";
import {Room} from "@/types/rooms.types";

export const priceCategoriesApi = {
    async createPriceCategory(newCategory: PriceCategoryPostData):Promise<PriceCategory> {
        const response = await api.post('/price-categories', newCategory);
        return response.data;
    },

    async updatePriceCategory(priceCategoryId: string, newCategory: PriceCategoryUpdateData):Promise<PriceCategory> {
        const response = await api.patch(`/price-categories/${priceCategoryId}`, newCategory);
        return response.data;
    },

    async deletePriceCategory(priceCategoryId: string):Promise<PriceCategory> {
        const response = await api.delete(`/price-categories/${priceCategoryId}`);
        return response.data;
    },

    async getAllPriceCategories():Promise<PriceCategory[]>{
        const response = await api.get('/price-categories');
        return response.data;
    },

    async getPriceCategoriesById(id: string):Promise<PriceCategory> {
        const response = await api.get(`/price-categories/${id}`);
        return response.data;
    },

    async assignRoomType(priceCategoryId: string, roomTypesIds: string[]){
        const roomTypesIdsObject = {
            'roomTypesIds': [...roomTypesIds]
        }
        const response = await api.post(`/price-categories/${priceCategoryId}/assign-room-types`, roomTypesIdsObject);
        return response.data;
    },

    async assignRooms(priceCategoryId: string, roomsIds: string[]){
         const roomIdsObject = {
             'roomIds': [...roomsIds]
         }
         const response = await api.post(`/price-categories/${priceCategoryId}/assign-rooms`, roomIdsObject);
         return response.data;
    },

    async getAssignedRoomTypes(priceCategoryId: string):Promise<RoomTemplate[]>{
        const response = await api.get(`/price-categories/${priceCategoryId}/room-types`);
        return response.data;
    },

    async getAssignedRooms(priceCategoryId: string):Promise<Room[]>{
        const response = await api.get(`/price-categories/${priceCategoryId}/rooms`);
        return response.data;
    }
}