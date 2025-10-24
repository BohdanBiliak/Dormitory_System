import {api} from "@/app/lib/api.api";
import {
    Dormitory,
    DormitoriesResponse,
    DormitoryUpdateRequest,
    DormitoryPostData
} from "@/types/dormitories.types";
import {roomsApi} from "@/app/lib/rooms.api";

export const dormitoryApi = {

    async getDormitories(): Promise<DormitoriesResponse> {
        const response = await api.get('/dormitories');
        return response.data;
    },

    async getDormitory(id:string): Promise<Dormitory> {
        const response = await api.get(`/dormitories/${id}`);
        return response.data;
    },


    async createDormitory(newDormitory:DormitoryPostData): Promise<Dormitory> {
        const formData = new FormData();
        if (newDormitory.photos.length > 0){
            newDormitory.photos.forEach(photo => {
                formData.append('photos', photo)
            })

        }

        formData.append('name', newDormitory.name);
        formData.append('address', newDormitory.address);
        formData.append('groundFloorPhoneNumber', newDormitory.groundFloorPhoneNumber);
        formData.append('pricePerDay',newDormitory.pricePerDay.toString());
        formData.append('pricePerMonth', newDormitory.pricePerMonth.toString());

        if(newDormitory.floorAssignments.length > 0) newDormitory.floorAssignments.forEach((floorAssignment, floorIndex) => {
            formData.append(`floorAssignments[${floorIndex}][floorNumber]`, floorAssignment.floorNumber);
            if(floorAssignment.roomAssignments.length>0) floorAssignment.roomAssignments.forEach((roomAssignment, roomIndex) => {
                formData.append(`floorAssignments[${floorIndex}][roomAssignments][${roomIndex}][roomTypeId]`, roomAssignment.roomTypeId)
                if(roomAssignment.roomNumbers.length>0) roomAssignment.roomNumbers.forEach(roomNumber => {
                    formData.append(`floorAssignments[${floorIndex}][roomAssignments][${roomIndex}][roomNumbers]`, roomNumber);
                })
            })
        })


        try {
            const response = await api.post(`/dormitories`, formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log("Dormitory: ", response.data);
            return response.data;
        }catch (error) {
            console.error(error);
            throw error;
        }
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