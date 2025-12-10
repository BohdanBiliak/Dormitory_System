import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {JSX, useEffect, useState} from "react";
import {Dormitory, DormitoryFloor} from "@/types/dormitories.types";
import {Room, RoomResident} from "@/types/rooms.types";
import { User } from "@/types/auth.types";
import {useGetActiveDormitories} from "@/hooks/dormitories.hook";
import {useGetRooms} from "@/hooks/rooms.hook";
import { useLanguage } from "@/providers/language.provider";

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
    resident?: RoomResident;
    room?: Room;
    floor?: DormitoryFloor;
    dormitory?: Dormitory;
    children?: AddresseeItem[];
}



export default function AddressesDialogComponent({open, onClose, onConfirm, preSelected}: AddressesDialogProps) {

    const { t } = useLanguage();
    const {data: activeDorms, isLoading: loadingDormitories, error: dormitoriesError} = useGetActiveDormitories()

    const [chosenAddresses, setChosenAddresses] = useState<AddresseeItem[]>([]);
    const [shownAddresses, setShownAddresses] = useState<AddresseeItem[]>([]);

    useEffect(() => {
        setShownAddresses([])

        if(activeDorms && activeDorms.data && activeDorms.data.length > 0){
            activeDorms.data.forEach(dorm=>
                setShownAddresses(prevState => {
                    if(!prevState) return prevState;
                    return [...prevState, {id:dorm.id, isChosen: false, showChildren: false, label:dorm.name, type:AddresseeType.Dormitory, dormitory:dorm,
                        children: dorm.floors.map<AddresseeItem>(function(floor):AddresseeItem{ return  {id:floor.id, isChosen: false, showChildren:false, label: floor.floorNumber, type:AddresseeType.Floor, floor:floor,
                            children: floor.rooms.map<AddresseeItem>(function (room):AddresseeItem{ return {id: room.id, isChosen: false, showChildren: false, label: room.number, type: AddresseeType.Room, room:room,
                                children: room.residents.map<AddresseeItem>(function (resident):AddresseeItem{ return {id:resident.id, isChosen:false, showChildren: false, label: resident.displayName+" "+resident.secondName, type:AddresseeType.Resident, resident:resident}})
                            }})
                        }})
                    }];
                })
            )
        }

    }, [activeDorms]);


    const toggleShowChildren = (item: AddresseeItem) => {
        const updateItemVisibilityRecursively = (items: AddresseeItem[]): AddresseeItem[] => {
            return items.map((addr) => {
                // If this is the item we're looking for, toggle its showChildren
                if (addr === item) {
                    return {
                        ...addr,
                        showChildren: !addr.showChildren
                    };
                }

                // If this item has children, recursively update them
                if (addr.children && addr.children.length > 0) {
                    return {
                        ...addr,
                        children: updateItemVisibilityRecursively(addr.children)
                    };
                }

                // Otherwise, return the item unchanged
                return addr;
            });
        };

        setShownAddresses(prevState => {
            if(!prevState) return prevState;
            return updateItemVisibilityRecursively(prevState);
        })
    }

    const toggleItemChosen = (item: AddresseeItem) => {
        const updateChosenItemRecursively = (items: AddresseeItem[]): AddresseeItem[] => {
            return items.map((addr) => {
                // If this is the item we're looking for, toggle its isChosen
                if (addr === item) {
                    const updatedItem = {
                        ...addr,
                        isChosen: !addr.isChosen
                    };

                    // Update chosenAddresses based on the new state
                    if (updatedItem.isChosen) {
                        // Add to chosen addresses
                        setChosenAddresses(prev => {
                            if (!prev) return [updatedItem];
                            // Check if it's not already in the list
                            if (!prev.some(chosen => chosen === item)) {
                                return [...prev, updatedItem];
                            }
                            return prev;
                        });
                    } else {
                        // Remove from chosen addresses
                        setChosenAddresses(prev => {
                            if (!prev) return prev;
                            return prev.filter(chosen => chosen !== item);
                        });
                    }

                    return updatedItem;
                }

                // If this item has children, recursively update them
                if (addr.children && addr.children.length > 0) {
                    return {
                        ...addr,
                        children: updateChosenItemRecursively(addr.children)
                    };
                }

                // Otherwise, return the item unchanged
                return addr;
            });
        };

        setShownAddresses(prevState => {
            if(!prevState) return prevState;
            return updateChosenItemRecursively(prevState);
        });
    }

    const renderItemWithChildren = (item: AddresseeItem, depth: number = 0, parentPath: string = ''): JSX.Element => {
        const paddingLeft = depth * 20;
        const hasChildren= item.children && item.children.length > 0;
        // Generate a unique key based on type and ID to avoid hydration mismatches
        const uniqueKey = `${parentPath}/${AddresseeType[item.type]}-${item.id}`;

        return (
            <div key={uniqueKey}>
                <div className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 rounded transition-colors" style={{ paddingLeft: `${paddingLeft}px` }}>
                    {hasChildren && (
                        <button
                            type="button"
                            onClick={() => (toggleShowChildren(item))}
                            className="flex-shrink-0 w-5 h-5 flex items-center justify-center hover:bg-gray-300 rounded"
                            aria-label={item.showChildren ? t('dialogs.addresses.ariaLabels.collapse') : t('dialogs.addresses.ariaLabels.expand')}
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
                        onChange={() => toggleItemChosen(item)}
                        className="w-4 h-4 cursor-pointer"
                        id={uniqueKey}
                    />

                    <label htmlFor={uniqueKey} className={`flex-1 text-sm cursor-pointer ${item.type === AddresseeType.Dormitory ? 'font-semibold text-blue-900' : item.type === AddresseeType.Floor ? 'font-medium text-gray-700' : 'text-gray-600'}`}>
                        {item.label}
                    </label>

                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {t(`dialogs.addresses.types.${AddresseeType[item.type]}`)}
                    </span>
                </div>

                {item.showChildren && hasChildren && (
                    <div className="border-l-2 border-gray-300 ml-4">
                        {item.children!.map(childItem => renderItemWithChildren(childItem, depth + 1, uniqueKey))}
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

    // useEffect(() => {
    //     if (preSelected && preSelected.length > 0 && shownItems.length > 0) {
    //         const updatedItems = setPreSelectedItems(shownItems, preSelected);
    //         setShownItems(updatedItems);
    //     }
    // }, [preSelected, open]);

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
        const selectedItems = getSelectedItems(shownAddresses);
        
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
                    <div className="bg-blue-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <DialogTitle className="text-xl font-semibold text-white">
                                        {t('dialogs.addresses.title')}
                                    </DialogTitle>
                                    <Description className="text-blue-100 text-sm mt-1">
                                        {t('dialogs.addresses.subtitle')}
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
                            {shownAddresses && shownAddresses.length > 0 ? (
                                shownAddresses.map((item) => renderItemWithChildren(item))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    {t('dialogs.addresses.noDormitories')}
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
                            {t('dialogs.addresses.buttons.cancel')}
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {t('dialogs.addresses.buttons.confirm')}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}