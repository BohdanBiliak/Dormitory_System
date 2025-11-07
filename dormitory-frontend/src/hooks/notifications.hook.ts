import {notificationsApi} from "@/app/lib/notifications.api";
import {Notification, NotificationGetRequest, NotificationPostData} from "@/types/notifications.types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

export function useGetNotification(filters:NotificationGetRequest){
    const {data, isLoading, error} = useQuery({
       queryKey: ['notifications', `type=${filters.type}`, `priority=${filters.priority}`, `isArchived=${filters.isArchived}`, `startDate=${filters.startDate}`, `endDate=${filters.endDate}`],
       queryFn: ()=>notificationsApi.getNotifications(filters),
        staleTime: 30 * 1000,
    });
    return {data, isLoading, error};
}

export function useNotifications(){
    const queryClient = useQueryClient();

    const markAsRead = useMutation({
        mutationFn: (notificationId: string)=>notificationsApi.markNotificationAsRead(notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["notifications"]})
            // console.log("Marked as read");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const createNotification = useMutation({
        mutationFn: (notification: NotificationPostData)=>notificationsApi.adminNotificationAnnouncement(notification),
        onSuccess: () => {
            // console.log("New notification created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return{
        markAsRead: markAsRead.mutate,
        markingAsRead: markAsRead.isPending,
        createNotification: createNotification.mutate,
        creatingNotification: createNotification.isPending,
    }
}