import {useQuery, useQueryClient} from "@tanstack/react-query";
import {announcementsApi} from "@/app/lib/announcements.api";

export const useAnnouncements = () =>{
    const queryClient = useQueryClient();

    const {data: announcements, isLoading, error} = useQuery({
        queryKey: [`announcements`],
        queryFn: () => announcementsApi.getAnnouncements(),
        staleTime: 30 * 1000,
    })

    const getAnnouncements = (filters:{
        showHidden?: boolean,
        showExpired?: boolean,
        page:number,
        limit:number,
    })=>{
        return useQuery({
            queryKey: [`announcements`],
            queryFn: () => announcementsApi.getAnnouncements(filters),
            enabled: !!filters,
            staleTime: 30 * 1000,
        })
    }

    const getAnnouncementData = (id:string) =>{
        return useQuery({
            queryKey: [`announcements`, `details`, `id`, id],
            queryFn: ()=> announcementsApi.getAnnouncementById(id),
            enabled: !!id,
            staleTime: 30 * 1000,
        })
    }

    return{
        announcements,
        isLoading,
        error,
        getAnnouncements,
        getAnnouncementData,
    }
}