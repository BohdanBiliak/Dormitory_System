import {Notification, NotificationGetRequest, NotificationPostData} from "@/types/notifications.types";
import {api} from "@/app/lib/api.api";

export const notificationsApi = {
    async getNotifications(request: NotificationGetRequest): Promise<Notification[]>{
        const params = new URLSearchParams();

        if(request.type && request.type !== ''){
            params.append("type", request.type);
        }

        if(request.isArchived){
            params.append("isArchived", request.isArchived);
        }

        if(request.startDate && request.startDate!== ''){
            params.append("startDate", request.startDate.toString());
        }

        if(request.endDate && request.endDate !== ''){
            params.append("endDate", request.endDate.toString());
        }

        if(request.priority && request.priority!== ''){
            params.append("priority", request.priority.toString());
        }

        const response = await api.get(`notifications?${params}`)
        return response.data;
    },

    async markNotificationAsRead(notificationId: string){
        const response = await api.patch(`notifications/${notificationId}/read`);
    },

    async adminNotificationAnnouncement(notification: NotificationPostData){
        const response = await api.post('notifications/admin/announcement', notification);
    }

}