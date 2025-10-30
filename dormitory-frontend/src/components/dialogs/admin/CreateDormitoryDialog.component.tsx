import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {AlertTriangle, ArrowBigLeftDash, ArrowBigRightDash, BuildingIcon, Pencil, Plus} from "lucide-react";
import React, {useEffect, useState, useRef} from "react";
import {useGetRoomTemplates, useMutateRoomTemplate} from "@/hooks/roomTemplates.hook";
import {
    DormitoryPostData,
    FloorAssignment,
    PriceCategory, PriceCategoryPostData, PriceCategoryUpdateData,
    RoomTemplate,
    RoomTemplatePostData
} from "@/types/dormitories.types";
import {toast} from "sonner";
import {useDormitories} from "@/hooks/dormitories.hook";
import {ImageCarouselComponent} from "@/components/ui/ImageCarousel.component";
import {CreateDormitoryTutorial} from "@/app/tutorials/dormitory/create-dormitory";
import {useLanguage, LanguageSelector} from "@/providers/language.provider";
import {DialogTutorial, DialogTutorialButton} from "@/components/ui/DialogTutorial.component";
import {useGetPriceCategories, useUpdatePriceCategory} from "@/hooks/priceCategories.hook";

export interface CreateDormitoryDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function CreateDormitoryDialogComponent({open, onClose}: CreateDormitoryDialogProps) {

    const {createDormitory} = useDormitories()
    const {createRoomTemplate, updateRoomTemplate, deleteRoomTemplate} = useMutateRoomTemplate()
    const {data: roomTemplates, isLoading: loadingRoomTemplates, error: roomTemplatesErrors} = useGetRoomTemplates();
    const { t } = useLanguage();

    const[activePart, setActivePart] = useState<'General Information' | 'Room Generation' | 'Price categories'>('General Information');
    const[newDormitory, setNewDormitory] = useState<DormitoryPostData>({
        name: '',
        address: '',
        description: '',
        groundFloorPhoneNumber: '',
        pricePerMonth: 0,
        pricePerDay: 0,
        floorAssignments: [],
        photos: [],
    });

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const[selectedFloor, setSelectedFloor] = useState<FloorAssignment | null>(null)
    const[selectedTemplate, setSelectedTemplate] = useState<RoomTemplate | null>(null)

    const[newFloorLabel, setNewFloorLabel] = useState<string>('');
    const[newRoomsNumbersLabel, setNewRoomsNumbersLabel] = useState<string>('');
    const[newRoomsNumbers,setNewRoomsNumbers] = useState<string[]>([]);
    const[newRoomsTemplateId, setNewRoomsTemplateId] = useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const validateRoomsNumbers = () => {
        try {
            // Enhanced validation for room numbers
            if (!newRoomsNumbersLabel.trim()) {
                toast.error(t('createDormitory.messages.enterRoomNumbers'));
                return false;
            }

            const roomArray = newRoomsNumbersLabel
                .split(',')
                .map(item => item.trim())
                .filter(item => item !== '');

            if (roomArray.length === 0) {
                toast.error(t('createDormitory.messages.enterRoomNumbers'));
                return false;
            }

            // Validate each room number format
            const invalidRooms = roomArray.filter(room => 
                !/^[A-Za-z0-9\-_]+$/.test(room) || room.length > 10
            );

            if (invalidRooms.length > 0) {
                toast.error(t('createDormitory.messages.invalidRoomFormat', { rooms: invalidRooms.join(', ') }));
                return false;
            }

            setNewRoomsNumbers(roomArray);
            console.log("Validated room numbers:", roomArray);
            return true;
        } catch (error) {
            toast.error(t('createDormitory.messages.invalidRoomNumbers'));
            return false;
        }
    }

    //room templates
    const[editRoomTemplate, setEditRoomTemplate] = useState<boolean>(false)
    const[roomTemplateNewPhotos, setRoomTemplatesNewPhotos] = useState<File[]>([])

    //new room template
    const[newRoomTemplate, setNewRoomTemplate] = useState<RoomTemplatePostData | null>(null)
    const handleCreateNewRoomTemplate = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(newRoomTemplate && newRoomTemplate.name !== '' && newRoomTemplate.typeCode !== '' && newRoomTemplate.description !== ''){
            createRoomTemplate(newRoomTemplate);
            setNewRoomTemplate(null);
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
    const handleEditTemplate = ({templateToEditId, editedTemplate}:{templateToEditId: string, editedTemplate: RoomTemplate}) => {
        const editedTemplateData: RoomTemplatePostData = {
            name: editedTemplate.name,
            typeCode: editedTemplate.typeCode,
            description: editedTemplate.description,
            equipment: editedTemplate.equipment,
            photos: roomTemplateNewPhotos,
            capacity: editedTemplate.capacity,
        }
        updateRoomTemplate({templateId:templateToEditId, newTemplate:editedTemplateData})
        setEditRoomTemplate(false)
    }

    const handleCancelTemplateChanges = (templateId: string) => {
        if(roomTemplates){
            const prevTemplate = roomTemplates.find(item => item.id === templateId);
            if(prevTemplate){
                setSelectedTemplate(prevTemplate)
            }
        }
        setEditRoomTemplate(false)
    }

    const handleDeleteTemplate = (templateId: string) => {
        deleteRoomTemplate(templateId)
        if(roomTemplates && roomTemplates.length > 0){
            setSelectedTemplate(roomTemplates[0])
        }
    }

    const handleSaveTemplate = (templateId: string) => {
    }

    const changeSelectedTemplateCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;

        if(selectedTemplate){
            setSelectedTemplate(prevState => {
                if(!prevState) return prevState;
                return {...prevState, priceCategoryId: value === '' ? null : value};
            })
        }
    }

   const changeNewTemplateCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;

        if(newRoomTemplate){
            setNewRoomTemplate(prevState => {
                if(!prevState) return prevState;
                return {...prevState, priceCategoryId: value === '' ? null : value};
            });
        }
   }

    // Scroll handler for progress indicator
    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const element = scrollContainerRef.current;
                const scrollTop = element.scrollTop;
                const scrollHeight = element.scrollHeight - element.clientHeight;
                const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
                setScrollProgress(progress);
            }
        };

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            return () => scrollContainer.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleAddRoomTemplate = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedTemplate(null)
        setEditRoomTemplate(true)
        if(!newRoomTemplate){
            setNewRoomTemplate({
                name: '',
                typeCode: '',
                description: '',
                capacity: 1,
                equipment: [],
                photos: []
            })
        }
        //setEditRoomTemplate(true)
    }
    const handleTemplateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if (name.startsWith('equipment-')) {
            const index = parseInt(name.split('-')[1]);
            setSelectedTemplate(prevState =>
                prevState ? {
                    ...prevState,
                    equipment: prevState.equipment.map((item, i) =>
                        i === index ? value : item
                    )
                } : null
            );
        }else {
            setSelectedTemplate(prevState => {
                if (!prevState) return prevState;
                return {...prevState, [name]: value}
            })
        }
    }
    const handleNewTemplateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if (name.startsWith('equipment-')) {
            const index = parseInt(name.split('-')[1]);
            setNewRoomTemplate(prevState =>
                prevState ? {
                    ...prevState,
                    equipment: prevState.equipment.map((item, i) =>
                        i === index ? value : item
                    )
                } : null
            );
        }else{
            setNewRoomTemplate(prevState => {
                if(!prevState) return prevState;
                return{...prevState, [name]:value}
            })
        }
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

    //sections management
    const nextSection = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(activePart === 'General Information') setActivePart('Room Generation');
        if(activePart === 'Room Generation') setActivePart('Price categories');
    }

    const previousSection = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(activePart === 'Room Generation') setActivePart('General Information');
        if(activePart == 'Price categories') setActivePart('Room Generation');
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
        
        // Validate room numbers first
        if (!validateRoomsNumbers()) {
            return;
        }

        if (selectedFloor && newRoomsTemplateId !== '' && newRoomsNumbers.length > 0) {
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
            
            // Clear the input fields after successful addition
            setNewRoomsNumbersLabel('');
            setNewRoomsNumbers([]);
            setNewRoomsTemplateId('');
            
            toast.success(t('createDormitory.messages.roomsAdded', { count: newRoomsNumbers.length, floor: selectedFloor.floorNumber }));
        } else {
            if (!selectedFloor) {
                toast.error(t('createDormitory.messages.selectFloor'));
            } else if (newRoomsTemplateId === '') {
                toast.error(t('createDormitory.messages.selectTemplate'));
            }
        }
    }

    const handleCreateDormitory = () => {
        createDormitory({newDormitory: newDormitory})
    }

    const handleClearAll = () => {
        // Reset dormitory data
        setNewDormitory({
            name: '',
            address: '',
            description: '',
            groundFloorPhoneNumber: '',
            pricePerMonth: 0,
            pricePerDay: 0,
            floorAssignments: [],
            photos: [],
        });

        // Reset floor and room data
        setSelectedFloor(null);
        setNewFloorLabel('');
        setNewRoomsNumbersLabel('');
        setNewRoomsNumbers([]);
        setNewRoomsTemplateId('');

        // Reset template data
        setSelectedTemplate(null);
        setNewRoomTemplate(null);
        setEditRoomTemplate(false);

        // Reset to first section
        setActivePart('General Information');

        toast.success(t('createDormitory.messages.allFieldsCleared'));
    }


    //photo edit menus
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


    /*Price category*/
    const {data: priceCategories, isLoading: loadingPriceCategories, error: priceCategoriesError} = useGetPriceCategories();

    const {createPriceCategory, updatePriceCategory, deletePriceCategory, assigningRoomTemplate, assignRoom} = useUpdatePriceCategory()

    const [editPCategory, setEditPCategory] = useState<boolean>(false)
    const [pCategoriesList, setPCategoriesList] = useState<PriceCategory[]>([]);
    const [selectedPCategory, setSelectedPCategory] = useState<PriceCategory | null>(null);
    const [newPCategory, setNewPCategory] = useState<PriceCategoryPostData | null>(null);

    const addNewPCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        setNewPCategory({
            name: '',
            description: '',
            pricePerDay: 0,
            pricePerMonth: 0,
            isActive: true,
        })
        setSelectedPCategory(null)
        setEditPCategory(true)
    }


    useEffect(() => {
        if(priceCategories) {
            setPCategoriesList([...priceCategories])
        }
    }, [priceCategories]);

    const handleChangePriceCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSelectedPCategory(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    [name]: value
                }
        })
    }

    const handleChangeNewPriceCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewPCategory(prevState => {
            if(!prevState) return prevState;
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleCancelEditionPCategory = (id:string) => {
        if(pCategoriesList){
            const oldCategory = pCategoriesList.find((c) => c.id === id)
            if(oldCategory){
                setSelectedPCategory(oldCategory)
            }
        }
        setEditPCategory(false)
    }

    const handleDeletePCategory = (id:string) => {
        deletePriceCategory(id)
        if(pCategoriesList && pCategoriesList.filter(item => item.id !== id).length>0){
            setSelectedPCategory(pCategoriesList.filter(item => item.id !== id)[0])
        }else {
            setSelectedPCategory(null)
        }

    }

    const handleSaveEditionPCategory = (id:string, newChanges: PriceCategoryPostData) => {
        const updateRequest:PriceCategoryUpdateData = {
            pricePerMonth: newChanges.pricePerMonth,
            pricePerDay: newChanges.pricePerDay,
        }
        updatePriceCategory({categoryId: id, categoryUpdate: updateRequest});
        setEditPCategory(false)
    }



    // In-dialog tutorial state
    const [showTutorial, setShowTutorial] = useState(false);
    
    const tutorialSteps = [
        {
            id: 'header',
            title: t('createDormitory.tutorial.header.title'),
            description: t('createDormitory.tutorial.header.description'),
            target: 'header',
            position: 'bottom' as const
        },
        {
            id: 'navigation',
            title: t('createDormitory.tutorial.navigation.title'),
            description: t('createDormitory.tutorial.navigation.description'),
            target: 'navigation',
            position: 'bottom' as const
        },
        {
            id: 'general_name',
            title: t('createDormitory.tutorial.name.title'),
            description: t('createDormitory.tutorial.name.description'),
            target: 'general',
            position: 'right' as const,
            action: () => setActivePart('General Information')
        },
        {
            id: 'general_photos',
            title: t('createDormitory.tutorial.photos.title'),
            description: t('createDormitory.tutorial.photos.description'),
            target: 'general',
            position: 'top' as const
        },
        {
            id: 'room_floors',
            title: t('createDormitory.tutorial.floors.title'),
            description: t('createDormitory.tutorial.floors.description'),
            target: 'room',
            position: 'right' as const,
            action: () => setActivePart('Room Generation')
        },
        {
            id: 'room_templates',
            title: t('createDormitory.tutorial.templates.title'),
            description: t('createDormitory.tutorial.templates.description'),
            target: 'room',
            position: 'left' as const
        }
    ];



    return(
        <CreateDormitoryTutorial>
            <Dialog open={open} onClose={onClose} className={`relative z-50`}>
                <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" />
                <div className="fixed inset-0 flex items-center justify-center p-1 sm:p-4">
                    <DialogPanel className="w-full max-w-7xl max-h-[98vh] sm:max-h-[95vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full min-h-0 touch-pan-y">
                        <div className="flex flex-col h-full min-h-0">

                        {/*Dialog Header*/}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-4 sm:py-6 flex-shrink-0 create-dormitory-header">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full animate-in zoom-in-50 duration-300 delay-150">
                                        <BuildingIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-lg sm:text-xl font-semibold text-white animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-200">
                                            {t('createDormitory.title')}
                                        </DialogTitle>
                                        <Description className="text-blue-100 text-sm mt-1 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-250">
                                            {t('createDormitory.subtitle')}
                                        </Description>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => setShowTutorial(true)}
                                        className="flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white touch-target"
                                        title={t("createDormitory.buttons.tutorial")}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <div className="hidden sm:block">
                                        <LanguageSelector />
                                    </div>
                                    <button 
                                        onClick={onClose}
                                        className="flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white touch-target"
                                        aria-label="Close dialog"
                                    >
                                        <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*Dialog Body*/}
                        <div className="flex-1 overflow-hidden flex flex-col min-h-0">

                            {/*Navigation*/}
                            <div className="bg-gray-50 border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-4 flex-shrink-0 dormitory-navigation">
                                <div className="flex items-center justify-between max-w-md mx-auto">
                                    <button 
                                        onClick={previousSection} 
                                        disabled={activePart==='General Information'}
                                        className={`p-2 sm:p-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center ${
                                            activePart==='General Information' 
                                                ? 'text-gray-300 cursor-not-allowed' 
                                                : 'text-blue-600 hover:bg-blue-50 active:bg-blue-100'
                                        }`}
                                        aria-label="Previous section"
                                    >
                                        <ArrowBigLeftDash className="w-4 h-4 sm:w-6 sm:h-6" />
                                    </button>
                                    
                                    <div id="navigation" className="flex items-center space-x-1">
                                        <button 
                                            onClick={()=>setActivePart('General Information')} 
                                            className={`px-3 sm:px-3 py-2.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors min-h-[44px] sm:min-h-[40px] flex items-center justify-center ${
                                                activePart === 'General Information'
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 active:bg-gray-100'
                                            }`}
                                        >
                                            <span className="hidden sm:inline">{t('createDormitory.sections.generalInformation')}</span>
                                            <span className="sm:hidden">{t('createDormitory.buttons.general')}</span>
                                        </button>
                                        <button 
                                            onClick={()=>setActivePart('Room Generation')} 
                                            className={`px-3 sm:px-3 py-2.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors min-h-[44px] sm:min-h-[40px] flex items-center justify-center ${
                                                activePart === 'Room Generation'
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 active:bg-gray-100'
                                            }`}
                                        >
                                            <span className="hidden sm:inline">{t('createDormitory.sections.roomGeneration')}</span>
                                            <span className="sm:hidden">{t('createDormitory.buttons.rooms')}</span>
                                        </button>
                                        <button
                                            onClick={()=>setActivePart('Price categories')}
                                            className={`px-3 sm:px-3 py-2.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors min-h-[44px] sm:min-h-[40px] flex items-center justify-center ${
                                                activePart === 'Price categories'
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 active:bg-gray-100'
                                            }`}
                                        >
                                            Price categories
                                        </button>
                                    </div>
                                    
                                    <button 
                                        onClick={nextSection} 
                                        disabled={activePart==='Price categories'}
                                        className={`p-2 sm:p-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center ${
                                            activePart==='Room Generation' 
                                                ? 'text-gray-300 cursor-not-allowed' 
                                                : 'text-blue-600 hover:bg-blue-50 active:bg-blue-100'
                                        }`}
                                        aria-label="Next section"
                                    >
                                        <ArrowBigRightDash className="w-4 h-4 sm:w-6 sm:h-6" />
                                    </button>
                                </div>
                            </div>

                            {/*Body with Scroll*/}
                            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scroll-smooth">
                                {/* Scroll Indicator */}
                                <div className="sticky top-0 z-10 h-1 bg-gray-100">
                                    <div 
                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300" 
                                        style={{ width: `${scrollProgress}%` }}
                                    ></div>
                                </div>
                                <div className={`flex flex-row`}>
                                {activePart === 'General Information' && (
                                    <div id="general" className="dormitory-form-content p-3 sm:p-6 space-y-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                            <div className="lg:col-span-2 dormitory-name-field">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    {t('createDormitory.fields.name.label')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={newDormitory.name}
                                                    onChange={handleInputChange}
                                                    placeholder={t('createDormitory.fields.name.placeholder')}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                                />
                                            </div>
                                            
                                            <div className="dormitory-address-field">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={newDormitory.address}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter full address"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                                />
                                            </div>
                                            
                                            <div className="dormitory-description-field">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Description
                                                </label>
                                                <textarea
                                                    name="description"
                                                    value={newDormitory.description}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                                                    placeholder="Describe your dormitory..."
                                                />
                                            </div>
                                            
                                            <div className="dormitory-phone-field">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="groundFloorPhoneNumber"
                                                    value={newDormitory.groundFloorPhoneNumber}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter phone number"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                                />
                                            </div>
                                            
                                            <div className="dormitory-price-month-field">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Price per Month
                                                </label>
                                                <input
                                                    type="number"
                                                    name="pricePerMonth"
                                                    value={newDormitory.pricePerMonth}
                                                    onChange={handleInputChange}
                                                    placeholder="0.00"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                                />
                                            </div>
                                            
                                            <div className="dormitory-price-day-field">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Price per Day
                                                </label>
                                                <input
                                                    type="number"
                                                    name="pricePerDay"
                                                    value={newDormitory.pricePerDay}
                                                    onChange={handleInputChange}
                                                    placeholder="0.00"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="dormitory-photos-section">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Photos
                                            </label>
                                            <button
                                                onClick={openDormitoryPhotosEdit}
                                                className="flex items-center space-x-2 px-4 py-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                                <span>Add Images</span>
                                            </button>
                                            <div className="mt-3">
                                                <ImageCarouselComponent
                                                    photos={[]}
                                                    newPhotos={newDormitory.photos}
                                                    setNewPhotos={setNewPhotos} 
                                                    showEditMenu={showDormitoryPhotosEdit} 
                                                    closeEditMenu={closeDormitoryPhotosEdit} 
                                                    editionMenuLabels={{
                                                        title: "New Dormitory Photos", 
                                                        description: "Here you can add photos of your future dormitory"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activePart === 'Room Generation' && (
                                    <div id="room" className="p-4 sm:p-6">
                                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">

                                            {/*Floors list*/}
                                            <div className="space-y-4 floors-section">
                                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                    Floors
                                                </h3>
                                                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden max-h-64 sm:max-h-80">
                                                    <div className="divide-y divide-gray-200">
                                                        {newDormitory.floorAssignments.map((item, i) => (
                                                            <div className={`flex flex-row`} key={i}>
                                                                <div className={`grow p-3 hover:bg-gray-100 transition-colors ${selectedFloor === item ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}>
                                                                    <button
                                                                        onClick={(e)=>setSelectedFloor(item)}
                                                                        className="w-full text-left font-medium text-gray-900"
                                                                    >
                                                                        Floor: {item.floorNumber}
                                                                    </button>
                                                                </div>
                                                                <button
                                                                    className={`px-4`}
                                                                    onClick={()=>setNewDormitory(prevState => {
                                                                        if(!prevState) return prevState;
                                                                        return{
                                                                            ...prevState,
                                                                            floorAssignments: prevState.floorAssignments.filter((_, index) => index !== i)
                                                                        }
                                                                    })}
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="p-3 bg-gray-100 border-t border-gray-200">
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type='text'
                                                                name='newFloorLabel'
                                                                value={newFloorLabel}
                                                                placeholder="Floor number"
                                                                onChange={handleInputChange}
                                                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                            <button 
                                                                onClick={handleAddFloor}
                                                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                            >
                                                                <Plus className="w-4 h-4"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*Selected Floor*/}
                                            {selectedFloor && (
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                        Floor: {selectedFloor.floorNumber}
                                                    </h3>
                                                    <div className="bg-gray-50 border border-gray-200 rounded-lg">
                                                        <div className="p-3 space-y-3">
                                                            {selectedFloor.roomAssignments.map((roomAssignment, i) => (
                                                                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200" key={i}>
                                                                    <div className="flex items-center space-x-3">
                                                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                                                                            {roomTemplates && roomTemplates.find(template => template.id === roomAssignment.roomTypeId)?.typeCode}
                                                                        </span>
                                                                        <span className="text-gray-700">
                                                                            {roomAssignment.roomNumbers.join(", ")}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 p-3 bg-gray-100 rounded-lg">
                                                                <select
                                                                    name="roomsTemplate"
                                                                    onChange={handleSelectChange}
                                                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                >
                                                                    <option value="">Select template</option>
                                                                    {roomTemplates && roomTemplates.map((roomTemplate, i) => (
                                                                        <option key={i} value={roomTemplate.id}>{roomTemplate.typeCode}</option>
                                                                    ))}
                                                                </select>
                                                                <input
                                                                    type="text"
                                                                    name="newRoomsNumbers"
                                                                    value={newRoomsNumbersLabel}
                                                                    onChange={handleInputChange}
                                                                    onBlur={validateRoomsNumbers}
                                                                    placeholder="Room numbers (e.g., 101, 102, 103)"
                                                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                />
                                                                <button 
                                                                    onClick={handleAddRoomAssignment}
                                                                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                                >
                                                                    <Plus className="w-4 h-4"/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {(activePart === 'Room Generation' || activePart === 'Price categories')&& (
                                    <div>
                                        <div>
                                            {/*Room Templates*/}
                                            <div className="space-y-4 room-templates-section">
                                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                    Room Templates
                                                </h3>
                                                
                                                {/*Template Selection*/}
                                                <div className="flex flex-wrap gap-2">
                                                    {roomTemplates && roomTemplates.map((item, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={()=>{setSelectedTemplate(item); setEditRoomTemplate(false)}}
                                                            className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                                                                selectedTemplate === item 
                                                                    ? 'bg-blue-600 text-white border-blue-600' 
                                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {item.typeCode}
                                                        </button>
                                                    ))}
                                                    <button 
                                                        onClick={handleAddRoomTemplate}
                                                        className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                                                            newRoomTemplate 
                                                                ? 'bg-green-600 text-white border-green-600' 
                                                                : 'bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        {newRoomTemplate && newRoomTemplate.typeCode !== '' ? (
                                                            newRoomTemplate.typeCode
                                                        ) : (
                                                            <div className="flex items-center space-x-1">
                                                                <Plus className="w-4 h-4"/>
                                                                <span className="hidden sm:inline">New</span>
                                                            </div>
                                                        )}
                                                    </button>
                                                </div>

                                                {/*Selected Template*/}
                                                {selectedTemplate && (
                                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-semibold text-gray-900">Template Information</h4>
                                                            {!editRoomTemplate ? (
                                                                <div className="flex space-x-2">
                                                                    <button 
                                                                        onClick={()=>setEditRoomTemplate(true)}
                                                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={()=>handleDeleteTemplate(selectedTemplate.id)}
                                                                        className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={()=>handleEditTemplate({templateToEditId: selectedTemplate.id, editedTemplate:selectedTemplate})}
                                                                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                                    >
                                                                        Save
                                                                    </button>
                                                                    <button
                                                                        className="px-3 py-1 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                                                        onClick={()=>handleCancelTemplateChanges(selectedTemplate?.id)}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Template Name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={selectedTemplate.name}
                                                                        disabled={!editRoomTemplate}
                                                                        onChange={handleTemplateInputChange}
                                                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                                                            editRoomTemplate 
                                                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                                                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                                                        }`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Template Code
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="typeCode"
                                                                        value={selectedTemplate.typeCode}
                                                                        disabled={!editRoomTemplate}
                                                                        onChange={handleTemplateInputChange}
                                                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                                                            editRoomTemplate 
                                                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                                                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                                                        }`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Description
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="description"
                                                                        value={selectedTemplate.description}
                                                                        disabled={!editRoomTemplate}
                                                                        onChange={handleTemplateInputChange}
                                                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                                                            editRoomTemplate 
                                                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                                                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                                                        }`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Capacity
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="capacity"
                                                                        value={selectedTemplate.capacity}
                                                                        min={1}
                                                                        disabled={!editRoomTemplate}
                                                                        onChange={handleTemplateInputChange}
                                                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                                                            editRoomTemplate 
                                                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                                                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                                                        }`}
                                                                    />
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <label className="block text-sm font-medium text-gray-700">
                                                                            Photos
                                                                        </label>
                                                                        <button 
                                                                            onClick={openTemplatePhotosEdit}
                                                                            className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                                                                        >
                                                                            <Pencil className="w-4 h-4"/>
                                                                        </button>
                                                                    </div>
                                                                    <ImageCarouselComponent
                                                                        photos={selectedTemplate.photos}
                                                                        setPhotos={setTemplatePhotos}
                                                                        newPhotos={roomTemplateNewPhotos}
                                                                        setNewPhotos={setRoomTemplatesNewPhotos}
                                                                        showEditMenu={showTemplatePhotosEdit} 
                                                                        closeEditMenu={closeTemplatePhotosEdit}
                                                                        editionMenuLabels={{
                                                                            title:"Template Photos", 
                                                                            description:`Here you can edit photos of template ${selectedTemplate.typeCode}`
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Equipment
                                                                    </label>
                                                                    <div className="space-y-2 max-h-32 overflow-y-auto bg-white border border-gray-200 rounded-lg p-3">
                                                                        {selectedTemplate.equipment.map((item, index) => (
                                                                            <div className={`flex flex-row`} key={index}>
                                                                                <input
                                                                                    key={index}
                                                                                    type="text"
                                                                                    name={`equipment-${index}`}
                                                                                    value={item}
                                                                                    disabled={!editRoomTemplate}
                                                                                    onChange={handleTemplateInputChange}
                                                                                    className={`w-full px-2 py-1 text-sm border rounded transition-colors ${
                                                                                        editRoomTemplate 
                                                                                            ? 'border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500' 
                                                                                            : 'border-gray-200 bg-gray-50 text-gray-600'
                                                                                    }`}
                                                                                />
                                                                                {editRoomTemplate && (
                                                                                    <button
                                                                                        onClick={()=>
                                                                                            setSelectedTemplate(prevState => {
                                                                                                if(!prevState) return prevState;
                                                                                                return {
                                                                                                    ...prevState,
                                                                                                    equipment: [...prevState.equipment.filter((_, itemIndex) => itemIndex !== index)]
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                        className="flex-shrink-0 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                                    >
                                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                        </svg>
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                        {editRoomTemplate && (
                                                                            <button
                                                                                onClick={() => setSelectedTemplate(prevState => {
                                                                                    if (!prevState) return prevState; // or return a default object
                                                                                    return {
                                                                                        ...prevState,
                                                                                        equipment: [...prevState.equipment, ""]
                                                                                    };
                                                                                })}
                                                                                className={`w-full px-2 py-1 text-sm border rounded transition-colors border-gray-300 focus:ring-1 focus:ring-green-500 focus:border-green-500`}
                                                                            >
                                                                                Add new position
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <label>Room category:</label>
                                                                        <select
                                                                            value={selectedTemplate.priceCategoryId !== null? selectedTemplate.priceCategoryId : ''}
                                                                            onChange={changeSelectedTemplateCategory}
                                                                            disabled={!editRoomTemplate}
                                                                        >
                                                                            <option value={""}>--None--</option>
                                                                            {pCategoriesList.map(item=>
                                                                                <option value={item.id}>{item.name}</option>
                                                                            )}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>)}
                                                    </div>

                                                {(newRoomTemplate && !selectedTemplate) && (
                                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-semibold text-gray-900">New Template</h4>
                                                            <button 
                                                                onClick={handleCreateNewRoomTemplate}
                                                                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                                                            >
                                                                Create Template
                                                            </button>
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Template Name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={newRoomTemplate.name}
                                                                        disabled={!editRoomTemplate}
                                                                        onChange={handleNewTemplateInputChange}
                                                                        placeholder="Enter template name"
                                                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                                                            editRoomTemplate 
                                                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500' 
                                                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                                                        }`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Template Code
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="typeCode"
                                                                        value={newRoomTemplate.typeCode}
                                                                        disabled={!editRoomTemplate}
                                                                        onChange={handleNewTemplateInputChange}
                                                                        placeholder="Enter template code"
                                                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                                                            editRoomTemplate 
                                                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500' 
                                                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                                                        }`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Description
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="description"
                                                                        value={newRoomTemplate.description}
                                                                        disabled={!editRoomTemplate}
                                                                        onChange={handleNewTemplateInputChange}
                                                                        placeholder="Enter description"
                                                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                                                            editRoomTemplate 
                                                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500' 
                                                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                                                        }`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Capacity
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="capacity"
                                                                        min={1}
                                                                        value={newRoomTemplate.capacity}
                                                                        disabled={!editRoomTemplate}
                                                                        onChange={handleNewTemplateInputChange}
                                                                        placeholder="Enter capacity"
                                                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                                                            editRoomTemplate 
                                                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500' 
                                                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                                                        }`}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <label className="block text-sm font-medium text-gray-700">
                                                                            Photos
                                                                        </label>
                                                                        <button 
                                                                            onClick={openTemplatePhotosEdit}
                                                                            className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                                                                        >
                                                                            <Pencil className="w-4 h-4"/>
                                                                        </button>
                                                                    </div>
                                                                    <ImageCarouselComponent 
                                                                        photos={[]} 
                                                                        newPhotos={newRoomTemplate.photos} 
                                                                        setNewPhotos={handleUpdateNewRoomPhotos} 
                                                                        showEditMenu={showTemplatePhotosEdit} 
                                                                        closeEditMenu={closeTemplatePhotosEdit}
                                                                        editionMenuLabels={{
                                                                            title:"Template Photos", 
                                                                            description:"Here you can edit photos of new template"
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Equipment
                                                                    </label>
                                                                    <div className="space-y-2 max-h-32 overflow-y-auto bg-white border border-gray-200 rounded-lg p-3">
                                                                        {newRoomTemplate.equipment.map((item, index) => (
                                                                            <div className={`flex flex-row`} key={index}>
                                                                                <input
                                                                                    type="text"
                                                                                    name={`equipment-${index}`}
                                                                                    value={item}
                                                                                    disabled={!editRoomTemplate}
                                                                                    onChange={handleNewTemplateInputChange}
                                                                                    className={`w-full px-2 py-1 text-sm border rounded transition-colors ${
                                                                                        editRoomTemplate 
                                                                                            ? 'border-gray-300 focus:ring-1 focus:ring-green-500 focus:border-green-500' 
                                                                                            : 'border-gray-200 bg-gray-50 text-gray-600'
                                                                                    }`}
                                                                                />
                                                                                <button
                                                                                    onClick={()=>
                                                                                        setNewRoomTemplate(prevState => {
                                                                                            if(!prevState) return prevState;
                                                                                            return {
                                                                                                ...prevState,
                                                                                                equipment: [...prevState.equipment.filter((_, itemIndex) => itemIndex !== index)]
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                    className="flex-shrink-0 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                                >
                                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                        <button
                                                                            onClick={() => setNewRoomTemplate(prevState => {
                                                                                if (!prevState) return prevState; // or return a default object
                                                                                return {
                                                                                    ...prevState,
                                                                                    equipment: [...prevState.equipment, ""]
                                                                                };
                                                                            })}
                                                                            className={`w-full px-2 py-1 text-sm border rounded transition-colors border-gray-300 focus:ring-1 focus:ring-green-500 focus:border-green-500`}
                                                                        >
                                                                            Add new position
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <label>Room category:</label>
                                                                        <select
                                                                            value={newRoomTemplate.priceCategoryId !== null ? newRoomTemplate.priceCategoryId : ''}
                                                                            onChange={changeNewTemplateCategory}
                                                                            disabled={!editRoomTemplate}
                                                                        >
                                                                            <option value={""}>--None--</option>
                                                                            {pCategoriesList.map(item=>
                                                                                <option value={item.id}>{item.name}</option>
                                                                            )}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>)}
                                    </div>



                                {activePart === 'Price categories' && (
                                    <div className={`flex flex-row`}>
                                        {/*Selected category*/}
                                        <div>
                                            {selectedPCategory && (
                                                <div className={`flex flex-col space-y-4`}>
                                                    <div className={`flex flex-row space-x-6`}>
                                                        <div>
                                                            Selected Category:
                                                        </div>
                                                        {!editPCategory &&(
                                                            <div className={`flex flex-row space-x-1`}>
                                                                <button
                                                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                                    onClick={()=>setEditPCategory(true)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={()=>handleDeletePCategory(selectedPCategory.id)}
                                                                    className={"px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>)}
                                                        {editPCategory &&(
                                                            <div className={`flex flex-row space-x-1`}>
                                                                <button
                                                                    onClick={()=>handleCancelEditionPCategory(selectedPCategory.id)}
                                                                    className={"px-3 py-1 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"}
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    onClick={()=>handleSaveEditionPCategory(selectedPCategory.id, selectedPCategory)}
                                                                    className={"px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"}
                                                                >
                                                                    Save
                                                                </button>
                                                            </div>)}
                                                    </div>

                                                    <div className={`flex flex-row`}>
                                                        <div>Category name:</div>
                                                        <div>
                                                            <input
                                                                name={'name'}
                                                                value={selectedPCategory.name}
                                                                onChange={handleChangePriceCategoryInput}
                                                                disabled={!editPCategory}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className={`flex flex-row`}>
                                                        <div>Description:</div>
                                                        <div>
                                                            <input
                                                                name={'description'}
                                                                value={selectedPCategory.description}
                                                                onChange={handleChangePriceCategoryInput}
                                                                disabled={!editPCategory}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className={`flex flex-row`}>
                                                        <div>Price per month:</div>
                                                        <div>
                                                            <input
                                                                name={'pricePerMonth'}
                                                                value={selectedPCategory.pricePerMonth}
                                                                onChange={handleChangePriceCategoryInput}
                                                                disabled={!editPCategory}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className={`flex flex-row`}>
                                                        <div>Price per day:</div>
                                                        <div>
                                                            <input
                                                                name={'pricePerDay'}
                                                                value={selectedPCategory.pricePerDay}
                                                                onChange={handleChangePriceCategoryInput}
                                                                disabled={!editPCategory}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {(newPCategory && !selectedPCategory) && (
                                                <div className={`flex flex-col space-y-4`}>
                                                    <div className={`flex flex-row w-full`}>
                                                        <div className={`grow`}>
                                                            New Price Category:
                                                        </div>
                                                        <button
                                                            onClick={()=>{createPriceCategory(newPCategory); setNewPCategory(null); setSelectedPCategory(pCategoriesList[0])}}
                                                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                                                        >
                                                            Save price category
                                                        </button>
                                                    </div>
                                                    <div className={`flex flex-row space-x-4`}>
                                                        <div>Name:</div>
                                                        <div>
                                                            <input
                                                                type={`text`}
                                                                name={'name'}
                                                                value={newPCategory.name}
                                                                placeholder={`price category name`}
                                                                onChange={handleChangeNewPriceCategoryInput}
                                                                disabled={!editPCategory}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className={`flex flex-row space-x-4`}>
                                                        <div>Description:</div>
                                                        <div>
                                                            <input
                                                                type={`text`}
                                                                name={'description'}
                                                                value={newPCategory.description}
                                                                placeholder={`price category description`}
                                                                onChange={handleChangeNewPriceCategoryInput}
                                                                disabled={!editPCategory}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className={`flex flex-row space-x-4`}>
                                                        <div>Price per month:</div>
                                                        <div>
                                                            <input
                                                                type={`number`}
                                                                name={'pricePerMonth'}
                                                                value={newPCategory.pricePerMonth}
                                                                min={0}
                                                                onChange={handleChangeNewPriceCategoryInput}
                                                                disabled={!editPCategory}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className={`flex flex-row space-x-4`}>
                                                        <div>Price per day:</div>
                                                        <div>
                                                            <input
                                                                type={`number`}
                                                                name={'pricePerDay'}
                                                                value={newPCategory.pricePerDay}
                                                                min={0}
                                                                onChange={handleChangeNewPriceCategoryInput}
                                                                disabled={!editPCategory}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/*category list*/}
                                        <div className={`flex flex-col`}>
                                            {pCategoriesList.map((item, index) => (
                                                <button
                                                    onClick={() => {
                                                        setSelectedPCategory(item)
                                                        setNewPCategory(null)
                                                        setEditPCategory(false)
                                                    }}
                                                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                                                        selectedPCategory === item
                                                            ? 'bg-blue-600 text-white border-blue-600'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                            <button
                                                className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                                                        newPCategory ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                }`}
                                                onClick={addNewPCategory}
                                            >
                                                <div className={`flex flex-row`}>
                                                    <Plus/>
                                                    {newPCategory && newPCategory.name.length > 0 ? `${newPCategory.name}` : `New price category`}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>

                            {/* Footer with Create Button */}
                            <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
                                <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                                    <div className="text-sm text-gray-600">
                                        {activePart === 'General Information' 
                                            ? t('createDormitory.messages.fillBasicInfo')
                                            : t('createDormitory.messages.configureRooms')
                                        }
                                    </div>
                                    <div className="flex space-x-3">
                                        <button 
                                            onClick={onClose}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            {t('createDormitory.buttons.cancel')}
                                        </button>
                                        <button 
                                            onClick={handleClearAll}
                                            className="px-4 py-2 text-sm font-medium text-orange-700 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors flex items-center space-x-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span>{t('createDormitory.buttons.clearAll')}</span>
                                        </button>
                                        <button 
                                            onClick={handleCreateDormitory}
                                            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 create-dormitory-button"
                                        >
                                            <BuildingIcon className="w-4 h-4" />
                                            <span>{t('createDormitory.buttons.create')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            
                {/* In-Dialog Tutorial */}
                {showTutorial && (
                    <DialogTutorial
                        isOpen={showTutorial}
                        currentSection={activePart}
                        steps={tutorialSteps}
                        onClose={() => setShowTutorial(false)}
                    />
                )}
            </Dialog>
        </CreateDormitoryTutorial>
    )
}
