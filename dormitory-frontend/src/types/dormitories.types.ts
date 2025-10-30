import {Room} from "@/types/rooms.types";

export interface Dormitory {
    id: string;
    name: string;
    address: string;
    groundFloorPhoneNumber: string;
    status: 'Active' | 'Deactivated';
    photos: string[];
    createdAt: string;
    floors: DormitoryFloor[];
    manager:{ //managers?
        id: string;
        displayName: string;
        email: string;
    },
    admins:{ //admin?
        id: string;
        role: string;
        user: {
            id: string;
            displayName: string;
            email: string;
        }
    }[],
    statistics:{
        totalFloors: number;
        totalRooms: number;
        availableRooms: number;
        occupiedRooms: number;
        totalResidents: number;
        occupancyRate: number;
        roomTypeBreakdown: {
            roomTypeName: string;
            total: number;
            occupied: number;
            available: number;
        }[];
    }
}

export interface DormitoryFloor{
    id: string;
    floorNumber: string;
    dormitoryId: string;
    rooms: Room[]
}

export interface DormitoryPostData {
    name: string;
    address: string;
    description: string;
    groundFloorPhoneNumber: string;
    pricePerDay: number;
    pricePerMonth: number;
    floorAssignments: FloorAssignment[],
    photos: File[]
}

export interface FloorAssignment{
    floorNumber: string;
    roomAssignments: RoomAssignment[];
}

export interface RoomAssignment {
    roomNumbers: string[];
    roomTypeId: string;
}

//outdated
export interface RoomGenerationShema {
    "numberOfFloors": number;
    "roomsPerFloor": number;
    "pricePerDay": number;
    "pricePerMonth": number;
}

export interface DormitoriesResponse {
    "data"?: Dormitory[];
    "total": number;
    "page": number;
    "last_page": number;
}

export interface DormitoryRequest {
    "name": string;
    "address": string;
    "groundFloorPhoneNumber": string;
    "roomGeneration": RoomGenerationShema;
    "photos"?: File[];
}

export interface DormitoryUpdateRequest {
    "name": string;
    "address": string;
    "groundFloorPhoneNumber": string;
}

export interface RoomTemplate {
    id: string;
    name: string;
    typeCode: string;
    description: string;
    capacity: number;
    equipment: string[],
    photos: string[],
    priceCategoryId?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface RoomTemplatePostData {
    name: string;
    typeCode: string;
    description: string;
    capacity: number;
    equipment: string[],
    photos: File[]
    priceCategoryId?: string | null;
}

export interface PriceCategory {
    id: string;
    name: string;
    description: string;
    pricePerMonth: number;
    pricePerDay: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PriceCategoryPostData {
    name: string;
    description: string;
    pricePerMonth: number;
    pricePerDay: number;
    isActive: boolean;
}

export interface PriceCategoryUpdateData {
    pricePerMonth: number;
    pricePerDay: number;
}