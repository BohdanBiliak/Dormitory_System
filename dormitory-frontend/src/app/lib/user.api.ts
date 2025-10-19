import {api} from "@/app/lib/api.api";
import {User} from "@/types/auth.types";


export const userApi = {
    async getCurrentUser():Promise<User> {
        const response = await api.get("users/profile");
        if(response.status === 401){
            console.log("Guest user");
        }
        return response.data;
    },
}