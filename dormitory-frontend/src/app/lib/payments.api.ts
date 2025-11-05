import {Payment, PaymentPostData, PaymentsFilters, CreateBulkPaymentDto, BulkPaymentResponse} from "@/types/payments.types";
import {api} from "@/app/lib/api.api";

export const paymentsApi={
    async createPayment(newPayment:PaymentPostData):Promise<Payment>{
        const response = await api.post(`/payments`, newPayment);
        return response.data;
    },

    async createBulkPayments(bulkPaymentData: CreateBulkPaymentDto): Promise<BulkPaymentResponse> {
        const response = await api.post(`/payments/bulk`, bulkPaymentData);
        return response.data;
    },

    async getOccupiedRooms(dormitoryId?: string): Promise<any[]> {
        const params = dormitoryId ? `?dormitoryId=${dormitoryId}` : '';
        const response = await api.get(`/payments/occupied-rooms${params}`);
        return response.data;
    },

    async getMyPayments(limit: number = 20, offset: number = 0): Promise<Payment[]> {
        const response = await api.get(`/payments/my?limit=${limit}&offset=${offset}`);
        return response.data;
    },

    async getPayments(paymentFilters: PaymentsFilters):Promise<Payment[]>{
        const params = new URLSearchParams();

        if(paymentFilters.userId){
            params.append("userId", paymentFilters.userId);
        }
        if(paymentFilters.dormitoryId){
            params.append("dormitoryId", paymentFilters.dormitoryId);
        }
        if(paymentFilters.status && paymentFilters.status!==""){
            params.append("status", paymentFilters.status);
        }
        if(paymentFilters.startDate){
            params.append("startDate", paymentFilters.startDate);
        }
        if(paymentFilters.endDate){
            params.append("endDate", paymentFilters.endDate);
        }
        params.append("limit", paymentFilters.limit.toString());
        params.append("offset", paymentFilters.offset.toString());
        const response = await api.get(`/payments?${params}`);
        return response.data;
    },

    async downloadPaymentProof(paymentId: string): Promise<Blob> {
        const response = await api.get(`/payments/${paymentId}/download-proof`, {
            responseType: 'blob'
        });
        return response.data;
    },

    async uploadPaymentProof(paymentId: string, file: File): Promise<Payment> {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post(`/payments/${paymentId}/upload-proof`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async getMyPaymentStats(): Promise<any> {
        const response = await api.get(`/payments/my/stats`);
        return response.data;
    }
}