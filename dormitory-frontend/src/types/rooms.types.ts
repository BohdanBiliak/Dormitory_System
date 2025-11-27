export interface Room {
    "id": string,
    "number": string,
    "floor": number,
    "capacity": number,
    "roomEquipment": string[],
    "photos": string[],
    "dormitoryId": string,
    "createdAt": string,
    "updatedAt": string,
    "statuses": RoomStatus[],
    "dormitory": {
        "id": string,
        "name": string,
        "address": string
    },
    "residents": RoomResident[],
    "price": {
        "pricePerDay": number,
        "pricePerMonth": number,
    }
    "priceCategory"?: {
        "id": string,
        "name": string,
        "pricePerDay": number,
        "pricePerMonth": number,
    }
}

export interface RoomStatus {
    id: string,
    roomId: string,
    statusTypeId: string,
    dateOfStart: string,
    dateOfEnd: string | null,
    description: string | null,
    statusType?: {
        id: string,
        name: string,
        description?: string,
        color?: string,
        isActive: boolean,
        isSystem: boolean,
    },
}

export interface UpdateRoomData {
    number?: string,
    floor?: number,
    capacity?: number,
    roomEquipment?: string[],
    photos?: string[],
}

export interface AvailableRoomsRequest {
    from: string,
    to: string,
}

export interface CreateRoomStatusRequest {
    statusTypeId: string;
    dateOfStart: string;
    dateOfEnd: string;
    description?: string;
    name?: string;
}

export interface AssignRoomStatusRequest {
    statusTypeId: string,
    description?: string,
    dateOfStart: string,
    dateOfEnd?: string,
}

export interface EvictRequest {
    userId: string,
    description: string,
}

export interface RoomResident {
    "id": string,
    "displayName": string,
    "secondName": string,
    "email": string,
}

export interface RoomReservationData {
    roomId: string,
    from: string,
    to: string,
    suggestedTime: string,
    alternativeRooms: boolean;
}