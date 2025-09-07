export interface Dormitory {
    id: string;
    name: string;
    address: string;
    groundFloorPhoneNumber: string;
    status: 'Active' | 'Deactivated';
    photos: string[];
    managerId?: string[];
    createdAt: string;
}

export interface RoomGenerationShema {
    "numberOfFloors": number;
    "roomsPerFloor": number;
    "pricePerDay": number;
    "pricePerMonth": number;
}