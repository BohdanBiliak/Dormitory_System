import {ManagerCreationData} from "@/types/managers.types";
import {api} from "@/app/lib/api.api";

export  const managersApi = {
    async createManager(managerData: ManagerCreationData){
        const response = await api.post("/admin/managers", managerData);
        return response.data;
    }

}