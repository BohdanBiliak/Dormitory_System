import {api} from "@/app/lib/api.api";
import {Announcement, Attachment, Recipient} from "@/types/announcements.types";

export interface AnnouncementsResponse {
    data: Announcement[];
    pagination:{
        total:number,
        page:number,
        limit:number,
        totalPages:number,
    }
}

export const announcementsApi = {
    async getAnnouncements(filters?:{
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

    async getAnnouncementById(id: string){
        const response = await api.get(`/announcements/${id}`);
        return response.data
    },

    async deactivateAnnouncement(id:string){
        const response = await api.delete(`/announcements/${id}`);
        return response.data
    },

    async getPublicAnnouncements (filters?:{
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
    }
}