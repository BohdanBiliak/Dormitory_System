import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {paymentsApi} from "@/app/lib/payments.api";
import {PaymentPostData, PaymentsFilters, CreateBulkPaymentDto} from "@/types/payments.types";
import {toast} from "sonner";

export function useGetPayments(filters:PaymentsFilters){
    const{data, isLoading, error} = useQuery({
        queryKey: ["payments", filters.limit, filters.offset, filters.status],
        queryFn: ()=> paymentsApi.getPayments(filters),
        staleTime: 30 * 1000,
    })
    return {data, isLoading, error};
}

export function useGetOccupiedRooms(dormitoryId?: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["occupied-rooms", dormitoryId],
        queryFn: () => paymentsApi.getOccupiedRooms(dormitoryId),
        staleTime: 30 * 1000,
    });
    return { data, isLoading, error };
}

export function useGetMyPayments(limit: number = 20, offset: number = 0) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["my-payments", limit, offset],
        queryFn: () => paymentsApi.getMyPayments(limit, offset),
        staleTime: 30 * 1000,
    });
    return { data, isLoading, error, refetch };
}

export function useGetMyPaymentStats() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["my-payment-stats"],
        queryFn: () => paymentsApi.getMyPaymentStats(),
        staleTime: 60 * 1000,
    });
    return { data, isLoading, error };
}

export function useUpdatePayments(){
    const queryClient = useQueryClient();

    const createPayment = useMutation({
        mutationFn: (newPayment:PaymentPostData) => paymentsApi.createPayment(newPayment),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["payments"]});
            toast.success("Payment created successfully.");
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const uploadPaymentProof = useMutation({
        mutationFn: ({ paymentId, file }: { paymentId: string; file: File }) => 
            paymentsApi.uploadPaymentProof(paymentId, file),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["my-payments"]});
            queryClient.invalidateQueries({queryKey: ["payments"]});
            toast.success("Payment proof uploaded successfully.");
        },
        onError: (error) => {
            toast.error("Failed to upload payment proof", {
                description: error.message
            })
        }
    })

    const createBulkPayments = useMutation({
        mutationFn: (bulkPaymentData: CreateBulkPaymentDto) => paymentsApi.createBulkPayments(bulkPaymentData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["payments"]});
            const successCount = data.payments?.length || 0;
            const errorCount = data.errors?.length || 0;
            
            if (errorCount > 0) {
                toast.warning(`Created ${successCount} payments. ${errorCount} failed.`, {
                    description: "Check console for details about failed payments."
                });
                // console.warn("Bulk payment errors:", data.errors);
            } else {
                toast.success(`Successfully created ${successCount} payments!`);
            }
        },
        onError: (error) => {
            toast.error("Failed to create bulk payments", {
                description: error.message
            })
        }
    })

    return{
        createPayment: createPayment.mutate,
        creatingPayment: createPayment.isPending,
        uploadPaymentProof: uploadPaymentProof.mutate,
        uploadingProof: uploadPaymentProof.isPending,
        createBulkPayments: createBulkPayments.mutate,
        creatingBulkPayments: createBulkPayments.isPending,
    }

}