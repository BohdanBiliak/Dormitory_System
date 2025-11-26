import {ManagerCreationData, ManagerEditionData} from "@/types/managers.types";
import {api} from "@/app/lib/api.api";
import {User} from "@/types/auth.types";

export  const managersApi = {
    async createManager(managerData: ManagerCreationData):Promise<User>{
        const response = await api.post("/admin/managers", managerData);
        return response.data;
    },

    async updateManager(managerId: string, newManagerData: ManagerEditionData):Promise<User>{
        const response = await api.patch(`/admin/managers/${managerId}`,newManagerData);
        return response.data;
    },

}