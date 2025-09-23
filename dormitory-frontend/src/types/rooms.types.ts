export interface Room{
    "id": string,
    "number": string,
    "floor": number,
    "capacity": number,
    "roomEquipment": string[],
    "photos": string[],
    "dormitoryId": string,
    "createdAt": string,
    "statuses": RoomStatus[],
    "dormitory": {
        "id": string,
        "name": string,
        "address": string
    },
    "residents": string[],
    "price": {
        "pricePerDay": number,
        "pricePerMonth": number,
    }
}

export interface AvailableRoomsRequest {
    roomId: string,
    from: string,
    to: string,
}

export interface RoomStatus{
    id: string,
    roomId: string,
    dateOfStart: string,
    dateOfEnd: string,
    description: string,
}

export interface UpdateRoomData {
    number?: string,
    floor?: string,
    capacity?: number,
    roomEquipment?: string[],
    photos?: string[],

}