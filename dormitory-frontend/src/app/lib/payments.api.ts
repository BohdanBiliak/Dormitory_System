import {Payment, PaymentPostData, PaymentsFilters} from "@/types/payments.types";
import {api} from "@/app/lib/api.api";

export const paymentsApi={
    async createPayment(newPayment:PaymentPostData):Promise<Payment>{
        const response = await api.post(`/payments`, newPayment);
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
        if(paymentFilters.status){
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
    }
}