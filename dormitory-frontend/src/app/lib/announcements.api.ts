import {api} from "@/app/lib/api.api";
import {Announcement, Attachment, Recipient, AnnouncementCreateRequest, AnnouncementUpdateRequest, AnnouncementsResponse} from "@/types/announcements.types";



export const announcementsApi = {
    async getAnnouncements(filters:{
        showHidden?: boolean,
        showExpired?: boolean,
        page:number,
        limit:number,
    }):Promise<AnnouncementsResponse>{
        const params = new URLSearchParams();

        if(filters?.showHidden){
            params.append('showHidden', filters.showHidden.toString());
        }

        if(filters?.showExpired){
            params.append('showExpired', filters.showExpired.toString());
        }

        if(filters?.page){
            params.append('page', filters.page.toString());
        }

        if(filters?.limit){
            params.append('limit', filters.limit.toString());
        }

        const response = await api.get(`/announcements?${params}`)
        return response.data
    },

    async getAnnouncementById(id: string):Promise<Announcement>{
        const response = await api.get(`/announcements/${id}`);
        return response.data
    },

    async deactivateAnnouncement(id:string){
        try{
            const response = await api.delete(`/announcements/${id}`);
            return response.data
        }catch(error){
            console.error('Api error:',error);
            throw error;
        }
    },

    async getPublicAnnouncements (filters:{
        showHidden?: boolean,
        showExpired?: boolean,
        page:number,
        limit:number,
    }):Promise<AnnouncementsResponse>{
        const params = new URLSearchParams();

        if(filters?.showHidden){
            params.append('showHidden', filters.showHidden.toString());
        }

        if(filters?.showExpired){
            params.append('showExpired', filters.showExpired.toString());
        }

        if(filters?.page){
            params.append('page', filters.page.toString());
        }

        if(filters?.limit){
            params.append('limit', filters.limit.toString());
        }

        const response = await api.get(`/announcements/public?${params}`)
        return response.data
    },

    async getUserAnnouncements (filters:{
        showHidden?: boolean,
        showExpired?: boolean,
        page:number,
        limit:number,
    }):Promise<AnnouncementsResponse>{
        const params = new URLSearchParams();

        if(filters?.showHidden){
            params.append('showHidden', filters.showHidden.toString());
        }

        if(filters?.showExpired){
            params.append('showExpired', filters.showExpired.toString());
        }

        if(filters?.page){
            params.append('page', filters.page.toString());
        }

        if(filters?.limit){
            params.append('limit', filters.limit.toString());
        }

        const response = await api.get(`/announcements/my?${params}`)
        return response.data
    },

    async postAnnouncement(newAnnouncement: AnnouncementCreateRequest){
        try {
            const response = await api.post(`/announcements`, newAnnouncement);
            return response.data;
        }catch(error:any){
            console.error('Api error:',{
                status: error.response?.status,
                message: error.message,
                data: error.response?.data,
            });
            throw error;
        }
    },

    async updateAnnouncement(id:string, changes:AnnouncementUpdateRequest){
        try {
            const response = await api.post(`/announcements/${id}`, changes);
            return response.data;
        }catch (error){
            console.error('Api error: ', error);
            throw error;
        }
    },

    async uploadAnnouncementAttachment(files:File[]):Promise<{urls:string[]}>{
        // console.log('Uploading file...');
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        })

        try{
            const response = await api.post(`/announcements/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log('Announcement attachments uploaded successfully.');
            return response.data;
        }catch (error){
            console.error('Attachments upload error:', error)
            throw error
        }
    }
}