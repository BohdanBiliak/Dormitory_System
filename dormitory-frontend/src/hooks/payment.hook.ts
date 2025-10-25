import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {paymentsApi} from "@/app/lib/payments.api";
import {PaymentPostData, PaymentsFilters} from "@/types/payments.types";
import {toast} from "sonner";

export function useGetPayments(filters:PaymentsFilters){
    const{data, isLoading, error} = useQuery({
        queryKey: ["payments"],
        queryFn: ()=> paymentsApi.getPayments(filters),
        staleTime: 30 * 1000,
    })
    return {data, isLoading, error};
}

export function useUpdatePayments(){
    const queryClient = useQueryClient();

    const createPayment = useMutation({
        mutationFn: (newPayment:PaymentPostData) => paymentsApi.createPayment(newPayment),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["payments"]});
            toast.success("Payment updated successfully.");
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return{
        createPayment: createPayment.mutate,
        creatingPayment: createPayment.isPending,
    }

}