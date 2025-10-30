import {Notification, NotificationGetRequest, NotificationPostData} from "@/types/notifications.types";
import {api} from "@/app/lib/api.api";

export const notificationsApi = {
    async getNotifications(request: NotificationGetRequest): Promise<Notification[]>{
        const params = new URLSearchParams();

        if(request.type){
            params.append("type", request.type);
        }

        if(request.isRead){
            params.append("isRead", request.isRead.toString());
        }

        if(request.startDate){
            params.append("startDate", request.startDate.toString());
        }

        if(request.endDate){
            params.append("endDate", request.endDate.toString());
        }

        if(request.priority){
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