import {RoomTemplate, RoomTemplatePostData} from "@/types/dormitories.types";
import {api} from "@/app/lib/api.api";

export const roomTemplatesApi = {
    async postRoomTemplate(newTemplate: RoomTemplatePostData):Promise<RoomTemplate> {
        const formData = new FormData();

        if(newTemplate.photos.length > 0){
            newTemplate.photos.forEach(photo => {
                formData.append('photos', photo)
            })
        }

        formData.append('name',newTemplate.name);
        formData.append('typeCode', newTemplate.typeCode);
        formData.append('description',newTemplate.description);
        formData.append('capacity', newTemplate.capacity.toString());

        if(newTemplate.equipment.length > 0) {
            newTemplate.equipment.forEach(equipment => {
                formData.append('equipment', equipment);
            })
        }else{
            formData.append('equipment', "Bed");
        }
        try{
            console.log(formData)
            const response = await api.post('/room-types',formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log('Post room template response: ', response);
            return response.data;
        }catch (error: any) {
            console.error('Post Room template error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            })
            throw error
        }
    },

    async getRoomTemplates():Promise<RoomTemplate[]> {
        const response = await api.get(`/room-types`);
        return response.data;
    },

    async getRoomTemplateById(roomTemplateId:string):Promise<RoomTemplate> {
        const response = await api.get(`/rooms/${roomTemplateId}`);
        return response.data;
    },

    async updateRoomTemplate(roomTemplateId:string, newTemplate:RoomTemplatePostData):Promise<RoomTemplate> {
        var newPhotosUrls:string[] = [];
        const photosFilesFormData = new FormData();
        newTemplate.photos.forEach(photo => {
            photosFilesFormData.append('file', photo)
        })

        try {
            const response = await api.post(`/rooms/upload`,photosFilesFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log('Room template photos post response: ', response.data)
            newPhotosUrls = response.data;
        }catch (error: any) {
            console.error('Room template photo upload error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            })
            throw error
        }

        const formData = new FormData();
        formData.append('name',newTemplate.name);
        formData.append('typeCode', newTemplate.typeCode);
        formData.append('description',newTemplate.description);
        formData.append('capacity', newTemplate.capacity.toString());
        newTemplate.equipment.forEach(equipment => {
            formData.append('equipment', equipment);
        });
        newPhotosUrls.forEach(photo => {
            formData.append('photos', photo);
        });

        try{
            const responseFinal = await api.patch(`room-types/${roomTemplateId}`,formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log('Patch room template response: ', responseFinal.data);
            return responseFinal.data;
        }catch (error: any) {
            console.error('Patch room template error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            })
            throw error
        }

    }
}