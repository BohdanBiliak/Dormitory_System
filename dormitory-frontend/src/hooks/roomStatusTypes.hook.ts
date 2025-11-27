import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roomStatusTypesApi } from "@/app/lib/roomStatusTypes.api";
import {
    CreateRoomStatusTypeRequest,
    UpdateRoomStatusTypeRequest,
} from "@/types/roomStatusTypes.types";
import { toast } from "sonner";

export function useGetRoomStatusTypes(includeInactive = false) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["room-status-types", includeInactive],
        queryFn: () => roomStatusTypesApi.getRoomStatusTypes(includeInactive),
        staleTime: 60 * 1000, // 1 minute
    });
    return { data, isLoading, error };
}

export function useGetRoomStatusType(id: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["room-status-type", id],
        queryFn: () => roomStatusTypesApi.getRoomStatusType(id),
        staleTime: 60 * 1000,
        enabled: !!id,
    });
    return { data, isLoading, error };
}

export function useRoomStatusTypeManagement() {
    const queryClient = useQueryClient();

    const createStatusType = useMutation({
        mutationFn: (data: CreateRoomStatusTypeRequest) =>
            roomStatusTypesApi.createRoomStatusType(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["room-status-types"] });
            toast.success("Room status type created successfully!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message || "Failed to create status type");
        },
    });

    const updateStatusType = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateRoomStatusTypeRequest }) =>
            roomStatusTypesApi.updateRoomStatusType(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["room-status-types"] });
            queryClient.invalidateQueries({ queryKey: ["room-status-type"] });
            toast.success("Room status type updated successfully!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message || "Failed to update status type");
        },
    });

    const deleteStatusType = useMutation({
        mutationFn: (id: string) => roomStatusTypesApi.deleteRoomStatusType(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["room-status-types"] });
            toast.success("Room status type deleted successfully!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message || "Failed to delete status type");
        },
    });

    const activateStatusType = useMutation({
        mutationFn: (id: string) => roomStatusTypesApi.activateRoomStatusType(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["room-status-types"] });
            toast.success("Status type activated successfully!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message || "Failed to activate status type");
        },
    });

    const deactivateStatusType = useMutation({
        mutationFn: (id: string) => roomStatusTypesApi.deactivateRoomStatusType(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["room-status-types"] });
            toast.success("Status type deactivated successfully!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message || "Failed to deactivate status type");
        },
    });

    const initializeSystemStatuses = useMutation({
        mutationFn: () => roomStatusTypesApi.initializeSystemStatuses(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["room-status-types"] });
            toast.success("System statuses initialized successfully!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message || "Failed to initialize system statuses");
        },
    });

    return {
        createStatusType: createStatusType.mutate,
        creatingStatusType: createStatusType.isPending,
        updateStatusType: updateStatusType.mutate,
        updatingStatusType: updateStatusType.isPending,
        deleteStatusType: deleteStatusType.mutate,
        deletingStatusType: deleteStatusType.isPending,
        activateStatusType: activateStatusType.mutate,
        activatingStatusType: activateStatusType.isPending,
        deactivateStatusType: deactivateStatusType.mutate,
        deactivatingStatusType: deactivateStatusType.isPending,
        initializeSystemStatuses: initializeSystemStatuses.mutate,
        initializingSystemStatuses: initializeSystemStatuses.isPending,
    };
}
