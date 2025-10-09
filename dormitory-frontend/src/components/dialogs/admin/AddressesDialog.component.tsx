import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {JSX, useEffect, useState} from "react";
import { Dormitory } from "@/types/dormitories.types";
import {Room, RoomResident} from "@/types/rooms.types";
import { User } from "@/types/auth.types";
import {useGetActiveDormitories} from "@/hooks/dormitories.hook";
import {useGetRooms} from "@/hooks/rooms.hook";

export interface AddressesDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: (selected: AddresseeItem[]) => void;
    preSelected?: string[];
}

export enum AddresseeType {
    'Resident', 'Room', 'Floor', 'Dormitory'
}

export interface AddresseeItem {
    id: string;
    isChosen: boolean;
    showChildren: boolean;
    label: string;
    type: AddresseeType;
    resident?: ResidentItem;
    room?: RoomItem;
    floor?: FloorItem;
    dormitory?: DormitoryItem;
    children?: AddresseeItem[];
}

interface ResidentItem{
    user: RoomResident;
}

interface RoomItem {
    room: Room;
    residents: ResidentItem[];
}

interface FloorItem {
    dormId: string;
    label: number;
    rooms: RoomItem[];
}

interface DormitoryItem {
    id: string;
    label: string;
    dormitory: Dormitory;
    floors: Set<FloorItem>;
}

export default function AddressesDialogComponent({open, onClose, onConfirm, preSelected}: AddressesDialogProps) {

    const [addressesShema, setAddressesShema] = useState<DormitoryItem[]>([]);
    const [shownItems, setShownItems] = useState<AddresseeItem[]>([]);

    const {data: activeDorms, isLoading: loadingDormitories, error: dormitoriesError} = useGetActiveDormitories()
    const {data: rooms, isLoading: loadingRooms, error: roomsError} = useGetRooms()

    useEffect(() => {

        if (activeDorms && activeDorms.data && rooms) {
            const newAddresses:DormitoryItem[] = [];
            activeDorms.data.map((dorm) => (
                newAddresses.push({
                    id: dorm.id,
                    label: dorm.name,
                    dormitory: dorm,
                    floors: new Set<FloorItem>()
                })
            ));

            rooms.forEach((room) =>(
                newAddresses.forEach((dormAddressee) =>{
                    if(dormAddressee.dormitory.id === room.dormitoryId){
                        const floorExists = Array.from(dormAddressee.floors).some(floor => floor.label === room.floor);
                        if(!floorExists){
                            dormAddressee.floors.add({
                                dormId: dormAddressee.dormitory.id,
                                label: room.floor,
                                rooms: []
                            })
                        }
                    }
                })
            ))

            rooms.forEach((room) =>(
                newAddresses.forEach((dormAddressee) =>{
                    if(dormAddressee.dormitory.id === room.dormitoryId){
                        dormAddressee.floors.forEach((floor) =>{
                                if(floor.label === room.floor){
                                    const residents:ResidentItem[] = []
                                    room.residents.forEach((resident) =>{
                                        residents.push({user: resident})
                                    })
                                    floor.rooms.push({
                                        room: room,
                                        residents: residents
                                    })
                                }
                            }
                        )
                    }
                })
            ))

            setAddressesShema(newAddresses);

            // Build complete tree structure
            const startingShownAddressees: AddresseeItem[] = newAddresses.map((dormAddressee) => {
                const floorItems = Array.from(dormAddressee.floors).map((floor, floorIndex) => {
                    const roomItems = floor.rooms.map((roomItem, roomIndex) => {
                        const residentItems = roomItem.residents.map((resident, residentIndex) => ({
                            id: `resident-${dormAddressee.id}-${floor.label}-${roomItem.room.id}-${resident.user.id}`,
                            isChosen: false,
                            showChildren: false,
                            label: resident.user.displayName || "Unknown Resident",
                            type: AddresseeType.Resident,
                            resident: resident,
                            children: []
                        }));

                        return {
                            id: `room-${dormAddressee.id}-${floor.label}-${roomItem.room.id}`,
                            isChosen: false,
                            showChildren: false,
                            label: `Room ${roomItem.room.number}`,
                            type: AddresseeType.Room,
                            room: roomItem,
                            children: residentItems
                        };
                    });

                    return {
                        id: `floor-${dormAddressee.id}-${floor.label}`,
                        isChosen: false,
                        showChildren: false,
                        label: `Floor ${floor.label}`,
                        type: AddresseeType.Floor,
                        floor: floor,
                        children: roomItems
                    };
                });

                return {
                    id: `dorm-${dormAddressee.id}`,
                    isChosen: false,
                    showChildren: false,
                    label: dormAddressee.label,
                    type: AddresseeType.Dormitory,
                    dormitory: dormAddressee,
                    children: floorItems
                };
            });

            setShownItems(startingShownAddressees)
        } else {
            setAddressesShema([]);
            setShownItems([])
        }

    }, [activeDorms, rooms]);

    const toggleShowChildren = (id: string, items: AddresseeItem[]): AddresseeItem[] => {
        return items.map(item => {
            if (item.id === id) {
                return {...item, showChildren: !item.showChildren};
            }
            if (item.children && item.children.length > 0) {
                return {...item, children: toggleShowChildren(id, item.children)};
            }
            return item;
        });
    }

    const toggleItemChosen = (id: string, items: AddresseeItem[]): AddresseeItem[] => {
        return items.map(item => {
            if (item.id === id) {
                return {...item, isChosen: !item.isChosen};
            }
            if (item.children && item.children.length > 0) {
                return {...item, children: toggleItemChosen(id, item.children)};
            }
            return item;
        });
    }

    const renderItemWithChildren = (item: AddresseeItem, depth: number = 0): JSX.Element => {
        const paddingLeft = depth * 20;
        const hasChildren = item.children && item.children.length > 0;

        return (
            <div key={item.id}>
                <div className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 rounded transition-colors" style={{ paddingLeft: `${paddingLeft}px` }}>
                    {hasChildren && (
                        <button
                            onClick={() => setShownItems(toggleShowChildren(item.id, shownItems))}
                            className="flex-shrink-0 w-5 h-5 flex items-center justify-center hover:bg-gray-300 rounded"
                        >
                            <svg
                                className={`w-4 h-4 transition-transform ${item.showChildren ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                    {!hasChildren && <div className="w-5" />}

                    <input
                        type="checkbox"
                        checked={item.isChosen}
                        onChange={() => setShownItems(toggleItemChosen(item.id, shownItems))}
                        className="w-4 h-4 cursor-pointer"
                    />

                    <span className={`flex-1 text-sm ${item.type === AddresseeType.Dormitory ? 'font-semibold text-blue-900' : item.type === AddresseeType.Floor ? 'font-medium text-gray-700' : 'text-gray-600'}`}>
                        {item.label}
                    </span>

                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {item.type}
                    </span>
                </div>

                {item.showChildren && hasChildren && (
                    <div className="border-l-2 border-gray-300 ml-4">
                        {item.children!.map(childItem => renderItemWithChildren(childItem, depth + 1))}
                    </div>
                )}
            </div>
        );
    }

    const setPreSelectedItems = (items: AddresseeItem[], preSelectedIds: string[]): AddresseeItem[] => {
        return items.map(item => {
            let isChosen = preSelectedIds.includes(item.id);
            let children = item.children;

            if (item.children && item.children.length > 0) {
                children = setPreSelectedItems(item.children, preSelectedIds);
            }

            return {...item, isChosen, children};
        });
    }

    useEffect(() => {
        if (preSelected && preSelected.length > 0 && shownItems.length > 0) {
            const updatedItems = setPreSelectedItems(shownItems, preSelected);
            setShownItems(updatedItems);
        }
    }, [preSelected, open]);

    const getSelectedItems = (items: AddresseeItem[]): AddresseeItem[] => {
        let selected: AddresseeItem[] = [];

        items.forEach(item => {
            if (item.isChosen) {
                selected.push({
                    ...item,
                    children: undefined
                });
            }
            if (item.children && item.children.length > 0) {
                selected = selected.concat(getSelectedItems(item.children));
            }
        });

        return selected;
    }

    const handleConfirm = () => {
        const selectedItems = getSelectedItems(shownItems);
        if (onConfirm) {
            onConfirm(selectedItems);
        }
        onClose();
    }

    return(
        <Dialog onClose={onClose} open={open} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">

                    {/*header*/}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <DialogTitle className="text-xl font-semibold text-white">
                                        Select Recipients
                                    </DialogTitle>
                                    <Description className="text-blue-100 text-sm mt-1">
                                        Choose dormitories, floors, rooms, or residents to contact
                                    </Description>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/*body*/}
                    <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                        <div className="p-4 bg-white space-y-1">
                            {shownItems && shownItems.length > 0 ? (
                                shownItems.map((item) => renderItemWithChildren(item))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No dormitories available
                                </div>
                            )}
                        </div>
                    </div>

                    {/*footer*/}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Confirm Selection
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}