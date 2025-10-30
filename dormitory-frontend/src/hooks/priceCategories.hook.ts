import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {PriceCategoryPostData, PriceCategoryUpdateData} from "@/types/dormitories.types";
import {priceCategoriesApi} from "@/app/lib/priceCategories.api";
import {toast} from "sonner";

export function useUpdatePriceCategory(){
    const queryClient = useQueryClient()

    const createPriceCategory = useMutation({
        mutationFn: (newCategory: PriceCategoryPostData) => priceCategoriesApi.createPriceCategory(newCategory),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['priceCategories']});
            console.log("Price category created!")
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const updatePriceCategory = useMutation({
        mutationFn: ({categoryId, categoryUpdate}:{categoryId: string, categoryUpdate: PriceCategoryUpdateData}) => priceCategoriesApi.updatePriceCategory(categoryId,categoryUpdate),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: [`priceCategory`, response.id]})
            queryClient.invalidateQueries({queryKey: [`priceCategories`]})
            console.log("Price category updated")
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const deletePriceCategory = useMutation({
        mutationFn: (categoryId: string) => priceCategoriesApi.deletePriceCategory(categoryId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: [`priceCategories`]});
            queryClient.invalidateQueries({queryKey: [`priceCategory`, response.id]});
            console.log("Price category deleted!")
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const assignRoomTemplate = useMutation({
        mutationFn: ({categoryId, roomTypesIds}:{categoryId:string, roomTypesIds: string[]}) => priceCategoriesApi.assignRoomType(categoryId, roomTypesIds),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: [`priceCategory`, response.id, 'assignedRoomTemplates']});
            console.log("Templates assigned")
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const assignRoom = useMutation({
        mutationFn: ({categoryId, roomIds}:{categoryId: string, roomIds: string[]}) => priceCategoriesApi.assignRooms(categoryId, roomIds),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: [`priceCategory`, response.id, 'assignedRooms']});
            console.log("Rooms assigned")
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return{
        createPriceCategory: createPriceCategory.mutate,
        creatingPriceCategory: createPriceCategory.isPending,
        updatePriceCategory: updatePriceCategory.mutate,
        updatingPriceCategory: updatePriceCategory.isPending,
        deletePriceCategory: deletePriceCategory.mutate,
        deletingPriceCategory: deletePriceCategory.isPending,
        assignRoomTemplate: assignRoomTemplate.mutate,
        assigningRoomTemplate: assignRoomTemplate.isPending,
        assignRoom: assignRoom.mutate,
        assigningRoom: assignRoom.mutate,
    }

}

export function useGetPriceCategories() {
    const queryResult = useQuery({
        queryFn: () => priceCategoriesApi.getAllPriceCategories(),
        queryKey: ['priceCategories'],
        staleTime: 30 * 1000
    })

    return {
        data: queryResult.data,
        isLoading: queryResult.isLoading,
        error: queryResult.error
    }
}

export function useGetPriceCategoryById(priceCategoryId: string){
    const {data, isLoading, error} = useQuery({
        queryFn: ()=> priceCategoriesApi.getPriceCategoriesById(priceCategoryId),
        queryKey: ['priceCategory', priceCategoryId],
        staleTime: 30*1000
    })
    return {data, isLoading, error}
}

export function useGetAssignedRoomTemplates(priceCategoryId: string){
    const {data, isLoading, error} = useQuery({
        queryFn: ()=>priceCategoriesApi.getAssignedRoomTypes(priceCategoryId),
        queryKey: ['priceCategory', priceCategoryId, 'assignedRoomTemplates'],
        staleTime: 30 * 1000
    })
    return {data, isLoading, error}
}

export function useGetAssignedRooms(priceCategoryId: string){
    const {data, isLoading, error} = useQuery({
        queryFn: ()=>priceCategoriesApi.getAssignedRooms(priceCategoryId),
        queryKey: ['priceCategory', priceCategoryId, 'assignedRooms'],
        staleTime: 30 * 1000
    })
    return {data, isLoading, error}
}