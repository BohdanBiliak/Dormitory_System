import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {AlertTriangle, ArrowBigLeftDash, ArrowBigRightDash, BuildingIcon, Pencil, Plus} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useGetRoomTemplates, useMutateRoomTemplate} from "@/hooks/roomTemplates.hook";
import {DormitoryPostData, FloorAssignment, RoomTemplate, RoomTemplatePostData} from "@/types/dormitories.types";
import {toast} from "sonner";
import {useDormitories} from "@/hooks/dormitories.hook";
import {ImageCarouselComponent} from "@/components/ui/ImageCarousel.component";

export interface CreateDormitoryDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function CreateDormitoryDialogComponent({open, onClose}: CreateDormitoryDialogProps) {

    const {createDormitory} = useDormitories()
    const {createRoomTemplate} = useMutateRoomTemplate()
    const {data: roomTemplates, isLoading: loadingRoomTemplates, error: roomTemplatesErrors} = useGetRoomTemplates();

    const[activePart, setActivePart] = useState<'General Information' | 'Room Generation'>('General Information');
    const[newDormitory, setNewDormitory] = useState<DormitoryPostData>({
        name: '',
        address: '',
        groundFloorPhoneNumber: '',
        pricePerMonth: 0,
        pricePerDay: 0,
        floorAssignments: [],
        photos: [],
    });

    const[selectedFloor, setSelectedFloor] = useState<FloorAssignment | null>(null)
    const[selectedTemplate, setSelectedTemplate] = useState<RoomTemplate | null>(null)

    const[newFloorLabel, setNewFloorLabel] = useState<string>('');
    const[newRoomsNumbersLabel, setNewRoomsNumbersLabel] = useState<string>('');
    const[newRoomsNumbers,setNewRoomsNumbers] = useState<string[]>([]);
    const[newRoomsTemplateId, setNewRoomsTemplateId] = useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if(name === 'name' || name === 'address' || name === 'groundFloorPhoneNumber') {
            setNewDormitory(prevState => {
                if(!prevState) return prevState;
                return {...prevState, [name]: value};
            })
        }else if(name === 'pricePerDay' || name === 'pricePerMonth') { //in case of additional number handling
            setNewDormitory(prevState => {
                if(!prevState) return prevState;
                return {...prevState, [name]: value};
            })
        }else if(name === 'newFloorLabel'){ //new floor
            setNewFloorLabel(value);
        }else if(name === 'newRoomsNumbers'){
            setNewRoomsNumbersLabel(value);
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;

        if(name === 'roomsTemplate' && value!== ''){
            setNewRoomsTemplateId(value);
        }
    }

    const validateRoomsNumbers = () =>{
        try{
            const roomArray = newRoomsNumbersLabel.split(',').map(item => item.trim()).filter(item => item !== '');
            setNewRoomsNumbers(roomArray);
            console.log("new rooms", roomArray);
        }catch (error){
            toast.error("This is not array")
        }
    }

    //room templates
    const[editRoomTemplate, setEditRoomTemplate] = useState<boolean>(false)
    const[roomTemplateNewPhotos, setRoomTemplatesNewPhotos] = useState<File[]>([])

    //new room template
    const[newRoomTemplate, setNewRoomTemplate] = useState<RoomTemplatePostData | null>(null)
    const handleCreateNewRoomTemplate = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(newRoomTemplate){
            createRoomTemplate(newRoomTemplate)
        }
    }

    const handleUpdateNewRoomPhotos = (files: File[]) => {
        setNewRoomTemplate(prevState => {
            if(!prevState) return prevState;
            return {...prevState, photos: files};
        })
    }

    //templates edit
    const[showTemplatePhotosEdit, setShowTemplatePhotosEdit] = useState<boolean>(false)
    const handleAddRoomTemplate = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedTemplate(null)
        setEditRoomTemplate(true)
        if(!newRoomTemplate){
            setNewRoomTemplate({
                name: '',
                typeCode: '',
                description: '',
                capacity: 1,
                category: '',
                equipment: [],
                photos: []
            })
        }
        //setEditRoomTemplate(true)
    }
    const handleTemplateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewRoomTemplate(prevState => {
            if(!prevState) return prevState;
            return{...prevState, [name]:value}
        })
    }
    const closeTemplatePhotosEdit = () => {
        setShowTemplatePhotosEdit(false);
    }
    const openTemplatePhotosEdit = () => {
        setShowTemplatePhotosEdit(true);
    }
    const setTemplatePhotos = (photos: string[]) => {
        if(selectedTemplate) {
            setSelectedTemplate(prevState => {
                if (!prevState) return prevState;
                return {...prevState, photos: photos};
            })
        }
    }

    //sections managment
    const nextSection = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(activePart === 'General Information') setActivePart('Room Generation');
    }

    const previousSection = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(activePart === 'Room Generation') setActivePart('General Information');
    }

    const handleAddFloor = (e: React.MouseEvent<HTMLButtonElement>) => {

        if(newFloorLabel !== ""){
            setNewDormitory(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    floorAssignments: [...prevState.floorAssignments, {floorNumber: newFloorLabel, roomAssignments: []}]
                }
            })
            setNewFloorLabel("")
            console.log("Added new floor: ", newFloorLabel)
        }
    }

    const handleAddRoomAssignment = (e: React.MouseEvent<HTMLButtonElement>) => {

        console.log(newRoomsTemplateId);
        if(selectedFloor && newRoomsTemplateId !== '') {
            const updatedFloorAssignment: FloorAssignment = {
                floorNumber: selectedFloor.floorNumber,
                roomAssignments: [...selectedFloor.roomAssignments, {roomNumbers: newRoomsNumbers, roomTypeId: newRoomsTemplateId}],
            }

            setNewDormitory(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    floorAssignments: prevState.floorAssignments.map(assignment =>
                        assignment === selectedFloor ? updatedFloorAssignment: assignment
                    )
                };
            })

            setSelectedFloor(updatedFloorAssignment);
        }
    }

    const handleCreateDormitory = () => {
        createDormitory({newDormitory: newDormitory})
    }


    //photos edit menus
    const[showDormitoryPhotosEdit, setShowDormitoryPhotosEdit] = useState(false);
    const closeDormitoryPhotosEdit = () => {
        setShowDormitoryPhotosEdit(false);
    }
    const openDormitoryPhotosEdit = () => {
        setShowDormitoryPhotosEdit(true);
    }
    const setNewPhotos = (file:File[])=>{
        setNewDormitory(prevState => {
            if(!prevState) return prevState;
            return {...prevState, photos: file}
        })
    }



    return(
        <Dialog open={open} onClose={onClose} className={`relative z-50`}>
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in-0 duration-300 slide-in-from-bottom-4">
                    <div className="p-6">

                        {/*Dialog Header*/}
                        <div className={`flex flex-row`}>
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full animate-in zoom-in-50 duration-300 delay-150">
                                <BuildingIcon className="w-6 h-6" />
                            </div>
                            <DialogTitle className="text-lg font-semibold text-slate-900 text-center mb-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-200">
                                Create New Dormitory
                            </DialogTitle>
                            <Description className="text-slate-600 text-center mb-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-250">
                                This window allows you to create a new dormitory. For more information click "Help" button
                            </Description>
                            <button onClick={onClose}>
                                X
                            </button>
                        </div>

                        {/*Dialog Body*/}
                        <div>

                            {/*Navigation*/}
                            <div className={'flex flex-row'}>
                                <button onClick={previousSection} disabled={activePart==='General Information'}>
                                    <ArrowBigLeftDash className={`w-6 h-6 stroke-2 ${activePart==='General Information' ? 'stroke-gray-400': 'stroke-blue-600'}`} />
                                </button>
                                <button onClick={()=>setActivePart('General Information')} className={`border border-blue-600 px-1`}>
                                    General Information
                                </button>
                                <button onClick={()=>setActivePart('Room Generation')} className={`border border-blue-600 px-1`}>
                                    Room Generation
                                </button>
                                <button onClick={nextSection} disabled={activePart==='Room Generation'}>
                                    <ArrowBigRightDash className={`w-6 h-6 stroke-2 ${activePart==='Room Generation' ? 'stroke-gray-400': 'stroke-blue-600'}`} />
                                </button>
                            </div>

                            {/*Body*/}
                            <div>
                                {activePart === 'General Information' && (
                                    <div className={`flex flex-col`}>
                                        <div>
                                            <div>
                                                Name
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={newDormitory.name}
                                                onChange={handleInputChange}
                                                className={`border border-blue-600 px-1`}
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                Address
                                            </div>
                                            <input
                                                type="text"
                                                name="address"
                                                value={newDormitory.address}
                                                onChange={handleInputChange}
                                                className={`border border-blue-600 px-1`}
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                Ground floor phone number
                                            </div>
                                            <input
                                                type="text"
                                                name="groundFloorPhoneNumber"
                                                value={newDormitory.groundFloorPhoneNumber}
                                                onChange={handleInputChange}
                                                className={`border border-blue-600 px-1`}
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                Price per month
                                            </div>
                                            <input
                                                type="number"
                                                name="pricePerMonth"
                                                value={newDormitory.pricePerMonth}
                                                onChange={handleInputChange}
                                                className={`border border-blue-600 px-1`}
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                Price per day
                                            </div>
                                            <input
                                                type="number"
                                                name="pricePerDay"
                                                value={newDormitory.pricePerDay}
                                                onChange={handleInputChange}
                                                className={`border border-blue-600 px-1`}
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                Photos
                                            </div>
                                            <button
                                                onClick={openDormitoryPhotosEdit}
                                            >
                                                Add Images
                                            </button>
                                            <ImageCarouselComponent
                                                photos={[]}
                                                newPhotos={newDormitory.photos}
                                                setNewPhotos={setNewPhotos} showEditMenu={showDormitoryPhotosEdit} closeEditMenu={closeDormitoryPhotosEdit} editionMenuLabels={{title: "New Dormitory Photos", description: "Here you can add photos of your future dormitory"}}/>
                                        </div>
                                    </div>
                                )}
                                {activePart === 'Room Generation' && (
                                    <div className={`flex`}>
                                        <div className={`flex flex-row space-x-10`}>

                                            {/*Floors list*/}
                                            <div className={`flex flex-col`}>
                                                <div>
                                                    Floors
                                                </div>
                                                <div className={`border border-blue-600`}>
                                                    {newDormitory.floorAssignments.map((item, i) => (
                                                        <div key={i} className={`${selectedFloor === item ? 'bg-gray-400' : ''}`}>
                                                            <button onClick={(e)=>setSelectedFloor(item)}>
                                                                {`Floor: ${item.floorNumber}`}
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <div className={`bg-gray-100`}>
                                                        <input
                                                            type='text'
                                                            name='newFloorLabel'
                                                            value={newFloorLabel}
                                                            placeholder={"Input your new floor number"}
                                                            onChange={handleInputChange}
                                                            className={`bg-gray-100 px-2`}
                                                        />
                                                        <button onClick={handleAddFloor}>
                                                            <Plus className={`h-6 w-6`}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*Selected Floor*/}
                                            {selectedFloor &&(
                                                <div className={`flex flex-col`}>
                                                    <div>
                                                        {`Floor: ${selectedFloor.floorNumber}`}
                                                    </div>

                                                    <div>
                                                        {selectedFloor.roomAssignments.map((roomAssignment, i) => (
                                                            <div className={`flex flex-row`} key={i}>
                                                                <div className={`px-2`}>
                                                                    {roomTemplates && roomTemplates.find(template => template.id === roomAssignment.roomTypeId)?.typeCode}
                                                                </div>
                                                                <div>
                                                                    {roomAssignment.roomNumbers.join(", ")}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className={`flex flex-row`}>
                                                            <select
                                                                name={`roomsTemplate`}
                                                                onChange={handleSelectChange}
                                                            >
                                                                {roomTemplates && roomTemplates.map((roomTemplate, i) => (
                                                                    <option key={i} value={roomTemplate.id}>{roomTemplate.typeCode}</option>
                                                                ))}
                                                            </select>
                                                            <input
                                                                type="text"
                                                                name={`newRoomsNumbers`}
                                                                value={newRoomsNumbersLabel}
                                                                onChange={handleInputChange}
                                                                onBlur={validateRoomsNumbers}
                                                            />
                                                            <button onClick={handleAddRoomAssignment}>
                                                                <Plus className={`h-6 w-6`}/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/*Room Templates*/}
                                            <div className={`flex flex-col`}>
                                                {/*Template Selection*/}
                                                <div className={`flex flex-row`}>
                                                    {roomTemplates && roomTemplates.map((item, index) => (
                                                        <div key={index} className={`px-1 border border-blue-600 ${selectedTemplate === item ? 'bg-gray-500' : ''}`}>
                                                            <button onClick={()=>{setSelectedTemplate(item); setEditRoomTemplate(false)}}>{item.typeCode}</button>
                                                        </div>
                                                    ))}
                                                    <div className={`px-1 border border-blue-600 ${newRoomTemplate ? 'bg-gray-500' : ''}`}>
                                                        <button onClick={handleAddRoomTemplate}>
                                                            {newRoomTemplate && newRoomTemplate.typeCode !== '' ? newRoomTemplate.typeCode : <Plus className={`h-6 w-6`}/>}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/*Selected Template*/}
                                                {selectedTemplate && (
                                                    <div className={`flex flex-row space-x-10`}>
                                                        <div className={`flex flex-col`}>
                                                            <div>
                                                                Template information:
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Template name
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={selectedTemplate.name}
                                                                    disabled={!editRoomTemplate}
                                                                    onChange={handleTemplateInputChange}
                                                                    className={`border border-blue-600 px-1`}

                                                                />
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Template code
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="typeCode"
                                                                    value={selectedTemplate.typeCode}
                                                                    disabled={!editRoomTemplate}
                                                                    onChange={handleTemplateInputChange}
                                                                    className={`border border-blue-600 px-1`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Description
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="description"
                                                                    value={selectedTemplate.description}
                                                                    disabled={!editRoomTemplate}
                                                                    onChange={handleTemplateInputChange}
                                                                    className={`border border-blue-600 px-1`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Capacity
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="capacity"
                                                                    value={selectedTemplate.capacity}
                                                                    disabled={!editRoomTemplate}
                                                                    onChange={handleTemplateInputChange}
                                                                    className={`border border-blue-600 px-1`}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={`flex flex-col`}>
                                                            <div>
                                                                <div className={`flex flex-row`}>
                                                                    <div>
                                                                        Photos:
                                                                    </div>
                                                                    <div>
                                                                        <Pencil className={`w-6 h-6`} onClick={openTemplatePhotosEdit}/>
                                                                    </div>
                                                                </div>
                                                                <ImageCarouselComponent
                                                                    photos={selectedTemplate.photos}
                                                                    setPhotos={setTemplatePhotos}
                                                                    newPhotos={roomTemplateNewPhotos}
                                                                    setNewPhotos={setRoomTemplatesNewPhotos}
                                                                    showEditMenu={showTemplatePhotosEdit} closeEditMenu={closeTemplatePhotosEdit}
                                                                    editionMenuLabels={{title:"Template Photos", description:`Here you can edit photos of template ${selectedTemplate.typeCode}`}}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Equipment
                                                                </div>
                                                                <div className={`bg-gray-200 border border-blue-600`}>
                                                                    {selectedTemplate.equipment.map((item, index) => (
                                                                        <input
                                                                            key={index}
                                                                            type="text"
                                                                            name={`equipment${index}`}
                                                                            value={item}
                                                                            disabled={!editRoomTemplate}
                                                                            onChange={handleTemplateInputChange}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {!editRoomTemplate && (
                                                            <div className={`flex flex-row`}>
                                                                <button onClick={()=>setEditRoomTemplate(true)}>
                                                                    Edit this template
                                                                </button>
                                                                <button>
                                                                    Delete this template
                                                                </button>
                                                            </div>
                                                        )}
                                                        {editRoomTemplate && (
                                                            <div className={`flex flex-row`}>
                                                                <button>
                                                                    Save changes
                                                                </button>
                                                                <button>
                                                                    Cancel Changes
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {(newRoomTemplate && !selectedTemplate) && (
                                                    <div className={`flex flex-row space-x-10`}>
                                                        <div className={`flex flex-col`}>
                                                            <div>
                                                                Template information:
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Template name
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={newRoomTemplate.name}
                                                                    disabled={!editRoomTemplate}
                                                                    onChange={handleTemplateInputChange}
                                                                    className={`border border-blue-600 px-1`}

                                                                />
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Template code
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="typeCode"
                                                                    value={newRoomTemplate.typeCode}
                                                                    disabled={!editRoomTemplate}
                                                                    onChange={handleTemplateInputChange}
                                                                    className={`border border-blue-600 px-1`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Description
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="description"
                                                                    value={newRoomTemplate.description}
                                                                    disabled={!editRoomTemplate}
                                                                    onChange={handleTemplateInputChange}
                                                                    className={`border border-blue-600 px-1`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Capacity
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="capacity"
                                                                    value={newRoomTemplate.capacity}
                                                                    disabled={!editRoomTemplate}
                                                                    onChange={handleTemplateInputChange}
                                                                    className={`border border-blue-600 px-1`}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={`flex flex-col`}>
                                                            <div>
                                                                <div className={`flex flex-row`}>
                                                                    <div>
                                                                        Photos:
                                                                    </div>
                                                                    <div>
                                                                        <Pencil className={`w-6 h-6`} onClick={openTemplatePhotosEdit}/>
                                                                    </div>
                                                                </div>
                                                                <ImageCarouselComponent photos={[]} newPhotos={newRoomTemplate.photos} setNewPhotos={handleUpdateNewRoomPhotos} showEditMenu={showTemplatePhotosEdit} closeEditMenu={closeTemplatePhotosEdit} editionMenuLabels={{title:"Template Photos", description:`Here you can edit photos of new template`}}/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Equipment
                                                                </div>
                                                                <div className={`bg-gray-200 border border-blue-600`}>
                                                                    {newRoomTemplate.equipment.map((item, index) => (
                                                                        <input
                                                                            key={index}
                                                                            type="text"
                                                                            name={`equipment${index}`}
                                                                            value={item}
                                                                            disabled={!editRoomTemplate}
                                                                            onChange={handleTemplateInputChange}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className={`flex flex-row`}>
                                                                <button onClick={handleCreateNewRoomTemplate}>
                                                                    Create Room Template
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>

                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <button onClick={handleCreateDormitory}>
                                        Create Dormitory
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}