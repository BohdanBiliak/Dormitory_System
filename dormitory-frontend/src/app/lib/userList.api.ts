import { api } from './api.api'
import { User } from "@/types/auth.types";
import {UserListRequest} from "@/types/users.types";

export interface UserListResponse {
    data?: User[]
    total: number,
    page: number,
    pageCount: number,
}



export const userListApi = {
    //Get all users
    async getUsers(filters?:UserListRequest):Promise<UserListResponse>{
        const params = new URLSearchParams()

        if (filters?.role && filters.role !== 'All') {
            params.append('role', filters.role)
        }

        if (filters?.paymentStatus && filters.paymentStatus !== 'All') {
            params.append('paymentStatus', filters.paymentStatus)
        }

        if (filters?.page){
            params.append('page', filters.page.toString())
        }

        if(filters?.limit){
            params.append('limit', filters.limit.toString())
        }

        const response = await api.get(`/users?${params}`)
        console.log("query link: ", `/users?${params}`)
        return response.data
    },

    async getUserData(id: string):Promise<User> {
        const response = await api.get(`/users/by-id/${id}`)
        return response.data
    },

    async updateUser(id: string, patch: {"name": string, "email": string, "isTwoFactorEnabled":true}):Promise<User> {
        const response = await api.patch(`/users/profile`, patch)
        return response.data
    },

    async deactivateUser(id: string):Promise<User> {
        const response = await api.delete(`/users/${id}/deactivate`)
        return response.data
    },

    async activateUser(id: string):Promise<User> {
        const response = await api.patch(`/users/${id}/activate`)
        return response.data
    }
}