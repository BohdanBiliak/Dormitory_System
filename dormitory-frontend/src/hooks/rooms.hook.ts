import {roomsApi} from "@/app/lib/rooms.api";
import {useQuery} from "@tanstack/react-query";

export function useGetRooms(){
    const{data, isLoading, error} = useQuery({
        queryKey: ["rooms"],
        queryFn: () => roomsApi.getRooms(),
        staleTime: 30 * 1000
    })
    return {data, isLoading, error};
}