export interface Room{
    "id": string,
    "number": string,
    "floor": number,
    "capacity": number,
    "roomEquipment": string[],
    "photos": string[],
    "dormitoryId": string,
    "createdAt": string,
    "statuses": string[],
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