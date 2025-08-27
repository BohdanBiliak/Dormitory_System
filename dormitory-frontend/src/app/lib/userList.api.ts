import { api } from './api.api'
import {User} from "@/types/auth.types";
export interface UserListRequest {
    userRole?: string[]
    roomFloor?: string[]
    paymentStatus?: string[]
}

export const userListApi = {
    //Get all users
    async getUsers(data:UserListRequest): Promise<User[]> {
        console.log('Getting user list...')

        const formData = new FormData()

        try{
            const response = await api.get('/users')
            return response.data
        }catch (error: any) {
            console.log('User list error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            })
            throw error
        }
    }
}