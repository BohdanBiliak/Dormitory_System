export interface RoomStatusType {
    id: string;
    name: string;
    description?: string;
    color?: string;
    isActive: boolean;
    isSystem: boolean;
    createdAt: string;
    updatedAt: string;
    _count?: {
        roomStatuses: number;
    };
}

export interface CreateRoomStatusTypeRequest {
    name: string;
    description?: string;
    color?: string;
    isActive?: boolean;
}

export interface UpdateRoomStatusTypeRequest {
    name?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
}

export interface AssignRoomStatusRequest {
    statusTypeId: string;
    description?: string;
    dateOfStart: string;
    dateOfEnd?: string;
}
