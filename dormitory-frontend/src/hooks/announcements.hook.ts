import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {announcementsApi} from "@/app/lib/announcements.api";
import {AnnouncementCreateRequest, AnnouncementUpdateRequest} from "@/types/announcements.types";
import { toast } from "sonner";

export function useGetAnnouncements (filters:{
    showHidden: boolean,
    showExpired: boolean,
    page:number,
    limit:number,
}){
    const {data, isLoading, error}= useQuery({
        queryKey: [`announcements`, filters],
        queryFn: () => announcementsApi.getAnnouncements(filters),
        enabled: !!filters,
        staleTime: 30 * 1000,
    })
    return {data, isLoading, error}
}


export function useGetAnnouncementDetails(id:string){
    const {data, isLoading, error, refetch} = useQuery({
        queryKey: [`announcements`, `details`, `id`, id],
        queryFn: ()=> announcementsApi.getAnnouncementById(id),
        enabled: !!id,
        staleTime: 30 * 1000,
    })
    return {data, isLoading, error, refetch}
}

export function useGetPublicAnnouncements (filters:{
        showHidden?: boolean,
        showExpired?: boolean,
        page:number,
        limit:number }){
    const {data, isLoading, error} = useQuery({
        queryKey: [`announcements`, `public`, filters],
        queryFn: () => announcementsApi.getPublicAnnouncements(filters),
        enabled: filters.page > 0 && filters.limit > 0,
        staleTime: 30 * 1000,
    })
    return {data, isLoading, error}
}

export function useGetUserAnnouncements (filters:{
        showHidden?: boolean,
        showExpired?: boolean,
        page:number,
        limit:number }){
    const {data, isLoading, error} = useQuery({
        queryKey: [`announcements`, `user`, filters],
        queryFn: () => announcementsApi.getUserAnnouncements(filters),
        enabled: filters.page > 0 && filters.limit > 0,
        staleTime: 30 * 1000,
    })
    return {data, isLoading, error}
}


export function useMutateAnnouncement(){
    const queryClient = useQueryClient();

    const createAnnouncement = useMutation({
        mutationFn: (newAnnouncement: AnnouncementCreateRequest) => announcementsApi.postAnnouncement(newAnnouncement),
        onSuccess: (newAnnouncement) => {
            queryClient.setQueryData(['announcement', 'new'], newAnnouncement)
            toast.success('Announcement created successfully.')
        },
        onError: (error:any) => {
            toast.error(error.response?.data?.message || 'Failed to create announcement')
        },
    })

    const updateAnnouncement = useMutation({
        mutationFn: ({id, changes}:{id:string, changes:AnnouncementUpdateRequest}) => announcementsApi.updateAnnouncement(id, changes),
        onSuccess: (updatedAnnouncement) => {
            queryClient.setQueryData(['announcement', 'update'],updatedAnnouncement)
            toast.success('Announcement updated successfully.')
        },
        onError: (error:any) => {
            toast.error(error.response?.data?.message || 'Failed to update announcement')
        }
    });

    const deleteAnnouncement = useMutation({
        mutationFn: (id:string) => announcementsApi.deactivateAnnouncement(id),
        onSuccess: (deletedAnnouncement) => {
            queryClient.invalidateQueries({queryKey: ['announcement', deletedAnnouncement]})
            toast.success('Announcement deactivated successfully.')
        },
        onError: (error:any) => {
            toast.error(error.response?.data?.message || 'Failed to deactivate announcement')
        }
    });

    const uploadAnnouncementAttachment = useMutation({
        mutationFn: (files: File[]) => {return announcementsApi.uploadAnnouncementAttachment(files)},
        onSuccess: (response) => {
            toast.success('Attachments uploaded successfully.')
            queryClient.setQueryData(['announcement', 'attachments',], response)
        },
        onError: (error:any) => {
            toast.error(error.response?.data?.message || 'Failed to upload announcement')
        }
    });

    return{
        createAnnouncement: createAnnouncement.mutate,
        creatingAnnouncement: createAnnouncement.isPending,
        deleteAnnouncement: deleteAnnouncement.mutate,
        deletingAnnouncement: deleteAnnouncement.isPending,
        updateAnnouncement: updateAnnouncement.mutate,
        updatingAnnouncement: updateAnnouncement.isPending,
        uploadAnnouncementAttachment: uploadAnnouncementAttachment.mutate,
        uploadingAnnouncementAttachment: uploadAnnouncementAttachment.isPending,
    }

    
}
