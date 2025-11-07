import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { 
    Building2 as BuildingIcon, 
    ArrowBigLeftDash,
    ArrowBigRightDash,
    CheckCircle,
    Loader2
} from "lucide-react";

// Components
import GeneralInformationComponent from "./sections/GeneralInformation.component";
import RoomGenerationComponent from "./sections/RoomGeneration.component";
import RoomTemplatesComponent from "./sections/RoomTemplates.component";
import PriceCategoriesComponent from "./sections/PriceCategories.component";

// Hooks
import { useDormitories } from "../../../hooks/dormitories.hook";
import { useMutateRoomTemplate, useGetRoomTemplates } from "../../../hooks/roomTemplates.hook";
import { useUpdatePriceCategory, useGetPriceCategories } from "../../../hooks/priceCategories.hook";
import { useLanguage } from "../../../providers/language.provider";

// Types
import { 
    DormitoryPostData, 
    FloorAssignment, 
    RoomTemplate, 
    RoomTemplatePostData, 
    PriceCategory, 
    PriceCategoryPostData,
    PriceCategoryUpdateData 
} from "../../../types/dormitories.types";

// Validation types
interface ValidationErrors {
    name?: string;
    address?: string;
    groundFloorPhoneNumber?: string;
    floorNumber?: string;
    roomTemplates?: {
        name?: string;
        typeCode?: string;
        capacity?: string;
    };
    priceCategories?: {
        name?: string;
        pricePerMonth?: string;
        pricePerDay?: string;
    };
}

export interface CreateDormitoryDialogProps {
    open: boolean;
    onClose: () => void;
}

const validatePhoneNumber = (phone: string): boolean => {
    // Must start with + and have exactly 11 digits after +
    const phoneRegex = /^\+\d{11}$/;
    return phoneRegex.test(phone);
};

const validateFloorNumber = (floor: string): boolean => {
    return !isNaN(Number(floor)) && floor.trim() !== '';
};

const validateGeneralInformation = (data: DormitoryPostData): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!data.name.trim()) {
        errors.name = 'Dormitory name is required';
    }

    if (!data.address.trim()) {
        errors.address = 'Address is required';
    }

    if (!data.groundFloorPhoneNumber.trim()) {
        errors.groundFloorPhoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(data.groundFloorPhoneNumber)) {
        errors.groundFloorPhoneNumber = 'Phone number must start with + and contain exactly 11 digits (e.g., +48123456789)';
    }

    return errors;
};

const validateRoomTemplate = (template: RoomTemplatePostData | RoomTemplate): ValidationErrors => {
    const errors: ValidationErrors = { roomTemplates: {} };

    if (!template.name.trim()) {
        errors.roomTemplates!.name = 'Template name is required';
    }

    if (!template.typeCode.trim()) {
        errors.roomTemplates!.typeCode = 'Template code is required';
    }

    if (template.capacity < 1) {
        errors.roomTemplates!.capacity = 'Capacity must be at least 1';
    }

    return errors;
};

const validatePriceCategory = (category: PriceCategoryPostData | PriceCategory): ValidationErrors => {
    const errors: ValidationErrors = { priceCategories: {} };

    if (!category.name.trim()) {
        errors.priceCategories!.name = 'Category name is required';
    }

    if (category.pricePerMonth <= 0) {
        errors.priceCategories!.pricePerMonth = 'Price per month must be greater than 0';
    }

    if (category.pricePerDay <= 0) {
        errors.priceCategories!.pricePerDay = 'Price per day must be greater than 0';
    }

    return errors;
};

type ActiveSection = 'General Information' | 'Room Generation' | 'Room Templates' | 'Price Categories';

export default function CreateDormitoryDialogComponent({open, onClose}: CreateDormitoryDialogProps) {
    const {createDormitory} = useDormitories();
    const {createRoomTemplate, updateRoomTemplate, deleteRoomTemplate} = useMutateRoomTemplate();
    const {data: roomTemplates, isLoading: loadingRoomTemplates, error: roomTemplatesErrors} = useGetRoomTemplates();
    const {data: priceCategories, isLoading: loadingPriceCategories, error: priceCategoriesError} = useGetPriceCategories();
    const {createPriceCategory, updatePriceCategory, deletePriceCategory} = useUpdatePriceCategory();
    const { t } = useLanguage();

    // Main state
    const [activeSection, setActiveSection] = useState<ActiveSection>('General Information');
    const [newDormitory, setNewDormitory] = useState<DormitoryPostData>({
        name: '',
        address: '',
        description: '',
        groundFloorPhoneNumber: '',
        floorAssignments: [],
        photos: [],
    });

    // Room generation state
    const [selectedFloor, setSelectedFloor] = useState<FloorAssignment | null>(null);
    const [newFloorLabel, setNewFloorLabel] = useState<string>('');
    const [newRoomsNumbersLabel, setNewRoomsNumbersLabel] = useState<string>('');
    const [newRoomsNumbers, setNewRoomsNumbers] = useState<string[]>([]);
    const [newRoomsTemplateId, setNewRoomsTemplateId] = useState<string>('');

    // Room template state
    const [selectedTemplate, setSelectedTemplate] = useState<RoomTemplate | null>(null);
    const [newRoomTemplate, setNewRoomTemplate] = useState<RoomTemplatePostData | null>(null);
    const [editRoomTemplate, setEditRoomTemplate] = useState<boolean>(false);
    const [roomTemplateNewPhotos, setRoomTemplateNewPhotos] = useState<File[]>([]);
    const [showTemplatePhotosEdit, setShowTemplatePhotosEdit] = useState<boolean>(false);

    // Price categories state
    const [pCategoriesList, setPCategoriesList] = useState<PriceCategory[]>([]);
    const [selectedPCategory, setSelectedPCategory] = useState<PriceCategory | null>(null);
    const [newPCategory, setNewPCategory] = useState<PriceCategoryPostData | null>(null);
    const [editPCategory, setEditPCategory] = useState<boolean>(false);

    // Photo management state
    const [showDormitoryPhotosEdit, setShowDormitoryPhotosEdit] = useState(false);

    // Animation and loading states
    const [isCreating, setIsCreating] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    //Validation
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // Initialize price categories from API data
    useEffect(() => {
        if (priceCategories) {
            setPCategoriesList(priceCategories);
        }
    }, [priceCategories]);

    // Navigation sections
    const sections: { key: ActiveSection; label: string; icon: React.ReactNode }[] = [
        {
            key: 'General Information',
            label: 'General Information',
            icon: <BuildingIcon className="w-4 h-4" />
        },
        {
            key: 'Room Generation',
            label: 'Room Generation',
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        },
        {
            key: 'Room Templates',
            label: 'Room Templates',
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        },
        {
            key: 'Price Categories',
            label: 'Price Categories',
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        }
    ];

    // General Information handlers
    //Input change with validation
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        if (['name', 'address', 'description', 'groundFloorPhoneNumber'].includes(name)) {
            setNewDormitory(prevState => ({
                ...prevState,
                [name]: value
            }));

            // Clear validation error for this field
            if (validationErrors[name as keyof ValidationErrors]) {
                setValidationErrors(prev => {
                    const newErrors = {...prev};
                    delete newErrors[name as keyof ValidationErrors];
                    return newErrors;
                });
            }
        } else if (name === 'newFloorLabel') {
            setNewFloorLabel(value);

            // Validate floor number in real-time
            if (value && !validateFloorNumber(value)) {
                setValidationErrors(prev => ({
                    ...prev,
                    floorNumber: 'Floor number must be a valid number (e.g., 0, 1, 2)'
                }));
            } else {
                setValidationErrors(prev => {
                    const newErrors = {...prev};
                    delete newErrors.floorNumber;
                    return newErrors;
                });
            }
        } else if (name === 'newRoomsNumbers') {
            setNewRoomsNumbersLabel(value);
        }
    };

    const setNewPhotos = (files: File[]) => {
        setNewDormitory(prevState => ({
            ...prevState,
            photos: files
        }));
    };

    const openDormitoryPhotosEdit = () => setShowDormitoryPhotosEdit(true);
    const closeDormitoryPhotosEdit = () => setShowDormitoryPhotosEdit(false);

    // Room Generation handlers
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'roomsTemplate') {
            setNewRoomsTemplateId(value);
        }
    };

    const handleSetSelectedFloor = (floor: FloorAssignment) => {
        setSelectedFloor(floor);
    };

    const handleAddFloor = () => {
        if (!newFloorLabel.trim()) {
            setValidationErrors(prev => ({
                ...prev,
                floorNumber: 'Floor number is required'
            }));
            return;
        }

        if (!validateFloorNumber(newFloorLabel)) {
            setValidationErrors(prev => ({
                ...prev,
                floorNumber: 'Floor number must be a valid number'
            }));
            return;
        }

        const newFloor: FloorAssignment = {
            floorNumber: newFloorLabel.trim(),
            roomAssignments: []
        };
        setNewDormitory(prevState => ({
            ...prevState,
            floorAssignments: [...prevState.floorAssignments, newFloor]
        }));
        setNewFloorLabel('');

        // Clear validation error
        setValidationErrors(prev => {
            const newErrors = {...prev};
            delete newErrors.floorNumber;
            return newErrors;
        });
    };


    const handleDeleteFloor = (index: number) => {
        setNewDormitory(prevState => ({
            ...prevState,
            floorAssignments: prevState.floorAssignments.filter((_, i) => i !== index)
        }));
        setSelectedFloor(null);
    };

    const handleAddRoomAssignment = () => {
        if (newRoomsNumbersLabel.trim() && newRoomsTemplateId && selectedFloor) {
            const roomNumbers = newRoomsNumbersLabel
                .split(',')
                .map(item => item.trim())
                .filter(item => item !== '');

            const newRoomAssignment = {
                roomNumbers: roomNumbers,
                roomTypeId: newRoomsTemplateId
            };

            setNewDormitory(prevState => ({
                ...prevState,
                floorAssignments: prevState.floorAssignments.map(floor => 
                    floor === selectedFloor 
                        ? { ...floor, roomAssignments: [...floor.roomAssignments, newRoomAssignment] }
                        : floor
                )
            }));

            setSelectedFloor(prev => prev ? {
                ...prev,
                roomAssignments: [...prev.roomAssignments, newRoomAssignment]
            } : prev);

            setNewRoomsNumbersLabel('');
            setNewRoomsNumbers([]);
            setNewRoomsTemplateId('');
        }
    };

    // Room Template handlers
    const handleSelectTemplate = (template: RoomTemplate) => {
        setSelectedTemplate(template);
        setNewRoomTemplate(null);
        setEditRoomTemplate(false);
    };

    const handleStartEditTemplate = () => {
        setEditRoomTemplate(true);
    };

    const handleAddRoomTemplate = () => {
        if (!newRoomTemplate) {
            setNewRoomTemplate({
                name: '',
                typeCode: '',
                description: '',
                capacity: 1,
                equipment: [],
                photos: [],
                priceCategoryId: null
            });
            setSelectedTemplate(null);
            setEditRoomTemplate(true);
        }
    };

    const handleCreateNewRoomTemplate = () => {
        if (newRoomTemplate) {
            const errors = validateRoomTemplate(newRoomTemplate);

            if (Object.keys(errors.roomTemplates || {}).length > 0) {
                setValidationErrors(errors);
                setShowValidationErrors(true);
                return;
            }

            // Clean up equipment array
            const cleanEquipment = newRoomTemplate.equipment
                .filter(item => item.trim() !== '')
                .map(item => item.trim());

            if (cleanEquipment.length === 0) {
                cleanEquipment.push('Bed');
            }

            const templateToCreate = {
                ...newRoomTemplate,
                equipment: cleanEquipment,
                name: newRoomTemplate.name.trim(),
                typeCode: newRoomTemplate.typeCode.trim(),
                description: newRoomTemplate.description.trim()
            };

            createRoomTemplate(templateToCreate);
            setNewRoomTemplate(null);
            setEditRoomTemplate(false);
            setValidationErrors({});
            setShowValidationErrors(false);
        }
    };

    const handleEditTemplate = (templateId: string, template: RoomTemplate) => {
        const errors = validateRoomTemplate(template);

        if (Object.keys(errors.roomTemplates || {}).length > 0) {
            setValidationErrors(errors);
            setShowValidationErrors(true);
            return;
        }

        // Clean up equipment array
        const cleanEquipment = template.equipment
            .filter(item => item.trim() !== '')
            .map(item => item.trim());

        if (cleanEquipment.length === 0) {
            cleanEquipment.push('Bed');
        }

        const templateUpdate: RoomTemplatePostData = {
            name: template.name.trim(),
            typeCode: template.typeCode.trim(),
            description: template.description.trim(),
            capacity: template.capacity,
            equipment: cleanEquipment,
            photos: [],
            priceCategoryId: template.priceCategoryId
        };
        updateRoomTemplate({ templateId, newTemplate: templateUpdate });
        setEditRoomTemplate(false);
        setValidationErrors({});
        setShowValidationErrors(false);
    };

    const handleCancelTemplateChanges = (templateId: string) => {
        setEditRoomTemplate(false);
        // Reset to original template from the list
        const originalTemplate = roomTemplates?.find(t => t.id === templateId);
        if (originalTemplate) {
            setSelectedTemplate(originalTemplate);
        }
    };

    const handleDeleteTemplate = (templateId: string) => {
        deleteRoomTemplate(templateId);
        setSelectedTemplate(null);
    };

    const handleTemplateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (selectedTemplate) {
            if (name.startsWith('equipment-')) {
                const index = parseInt(name.split('-')[1]);
                const newEquipment = [...selectedTemplate.equipment];
                newEquipment[index] = value;
                setSelectedTemplate(prev => prev ? {
                    ...prev,
                    equipment: newEquipment
                } : prev);
            } else {
                setSelectedTemplate(prev => prev ? {
                    ...prev,
                    [name]: name === 'capacity' ? Number(value) : value
                } : prev);

                // Clear validation error for this field
                if (name === 'capacity' && validationErrors.roomTemplates?.capacity) {
                    setValidationErrors(prev => ({
                        ...prev,
                        roomTemplates: {
                            ...prev.roomTemplates,
                            capacity: undefined
                        }
                    }));
                }
            }
        }
    };

    const handleNewTemplateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (newRoomTemplate) {
            if (name.startsWith('equipment-')) {
                const index = parseInt(name.split('-')[1]);
                const newEquipment = [...newRoomTemplate.equipment];
                newEquipment[index] = value;
                setNewRoomTemplate(prev => prev ? {
                    ...prev,
                    equipment: newEquipment
                } : prev);
            } else {
                setNewRoomTemplate(prev => prev ? {
                    ...prev,
                    [name]: name === 'capacity' ? Number(value) : value
                } : prev);

                // Clear validation error for this field
                if (validationErrors.roomTemplates?.[name as keyof typeof validationErrors.roomTemplates]) {
                    setValidationErrors(prev => ({
                        ...prev,
                        roomTemplates: {
                            ...prev.roomTemplates,
                            [name]: undefined
                        }
                    }));
                }
            }
        }
    };

    const handleChangeSelectedTemplateCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (selectedTemplate) {
            setSelectedTemplate(prev => prev ? {
                ...prev,
                priceCategoryId: value || null
            } : prev);
        }
    };

    const handleChangeNewTemplateCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (newRoomTemplate) {
            setNewRoomTemplate(prev => prev ? {
                ...prev,
                priceCategoryId: value || null
            } : prev);
        }
    };

    const handleOpenTemplatePhotosEdit = () => setShowTemplatePhotosEdit(true);
    const handleCloseTemplatePhotosEdit = () => setShowTemplatePhotosEdit(false);

    const handleSetTemplatePhotos = (photos: string[]) => {
        if (selectedTemplate) {
            setSelectedTemplate(prev => prev ? {
                ...prev,
                photos
            } : prev);
        }
    };

    const handleSetRoomTemplateNewPhotos = (photos: File[]) => {
        setRoomTemplateNewPhotos(photos);
    };

    const handleAddEquipmentToTemplate = () => {
        if (selectedTemplate) {
            setSelectedTemplate(prev => prev ? {
                ...prev,
                equipment: [...prev.equipment, '']
            } : prev);
        }
    };

    const handleRemoveEquipmentFromTemplate = (index: number) => {
        if (selectedTemplate) {
            setSelectedTemplate(prev => prev ? {
                ...prev,
                equipment: prev.equipment.filter((_, i) => i !== index)
            } : prev);
        }
    };

    const handleAddEquipmentToNewTemplate = () => {
        if (newRoomTemplate) {
            setNewRoomTemplate(prev => prev ? {
                ...prev,
                equipment: [...prev.equipment, '']
            } : prev);
        }
    };

    const handleRemoveEquipmentFromNewTemplate = (index: number) => {
        if (newRoomTemplate) {
            setNewRoomTemplate(prev => prev ? {
                ...prev,
                equipment: prev.equipment.filter((_, i) => i !== index)
            } : prev);
        }
    };

    const handleUpdateNewRoomPhotos = (files: File[]) => {
        if (newRoomTemplate) {
            setNewRoomTemplate(prev => prev ? {
                ...prev,
                photos: files
            } : prev);
        }
    };

    // Price Categories handlers
    const handleSelectCategory = (category: PriceCategory) => {
        setSelectedPCategory(category);
        setNewPCategory(null);
        setEditPCategory(false);
    };

    const handleAddNewCategory = () => {
        if (!newPCategory) {
            setNewPCategory({
                name: '',
                description: '',
                pricePerMonth: 0,
                pricePerDay: 0,
                isActive: true
            });
            setSelectedPCategory(null);
        }
    };

    const handleChangePriceCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (selectedPCategory) {
            setSelectedPCategory(prev => prev ? {
                ...prev,
                [name]: name === 'pricePerMonth' || name === 'pricePerDay' ? Number(value) : value
            } : prev);

            // Clear validation error
            if (validationErrors.priceCategories?.[name as keyof typeof validationErrors.priceCategories]) {
                setValidationErrors(prev => ({
                    ...prev,
                    priceCategories: {
                        ...prev.priceCategories,
                        [name]: undefined
                    }
                }));
            }
        }
    };

    const handleChangeNewPriceCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (newPCategory) {
            setNewPCategory(prev => prev ? {
                ...prev,
                [name]: name === 'pricePerMonth' || name === 'pricePerDay' ? Number(value) : value
            } : prev);

            // Clear validation error
            if (validationErrors.priceCategories?.[name as keyof typeof validationErrors.priceCategories]) {
                setValidationErrors(prev => ({
                    ...prev,
                    priceCategories: {
                        ...prev.priceCategories,
                        [name]: undefined
                    }
                }));
            }
        }
    };

    const handleCancelEdition = (id: string) => {
        setEditPCategory(false);
        // Reset to original category
        const originalCategory = priceCategories?.find(c => c.id === id);
        if (originalCategory) {
            setSelectedPCategory(originalCategory);
        }
    };

    const handleDeleteCategory = (id: string) => {
        deletePriceCategory(id);
        setSelectedPCategory(null);
    };

    const handleSaveEdition = (id: string, changes: PriceCategoryPostData) => {
        const errors = validatePriceCategory(changes);

        if (Object.keys(errors.priceCategories || {}).length > 0) {
            setValidationErrors(errors);
            setShowValidationErrors(true);
            return;
        }

        const updateData: PriceCategoryUpdateData = {
            name: changes.name,
            description: changes.description,
            pricePerMonth: changes.pricePerMonth,
            pricePerDay: changes.pricePerDay,
            isActive: changes.isActive
        };
        updatePriceCategory({ categoryId: id, categoryUpdate: updateData });
        setEditPCategory(false);
        setValidationErrors({});
        setShowValidationErrors(false);
    };


    const handleCreateCategory = (category: PriceCategoryPostData) => {
        const errors = validatePriceCategory(category);

        if (Object.keys(errors.priceCategories || {}).length > 0) {
            setValidationErrors(errors);
            setShowValidationErrors(true);
            return;
        }

        createPriceCategory(category);
        setNewPCategory(null);
        setValidationErrors({});
        setShowValidationErrors(false);
    };


    const handleSetEditMode = (edit: boolean) => {
        setEditPCategory(edit);
    };

    const handleCreateDormitory = async () => {
        // Validate General Information
        const errors = validateGeneralInformation(newDormitory);

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            setShowValidationErrors(true);
            setActiveSection('General Information');

            // Show error notification
            alert('Please fill in all required fields correctly in General Information section');
            return;
        }

        setIsCreating(true);
        try {
            await createDormitory({ newDormitory });
            setIsSuccess(true);
            setTimeout(() => {
                setIsCreating(false);
                setIsSuccess(false);
                setValidationErrors({});
                setShowValidationErrors(false);
                onClose();
            }, 2000);
        } catch (error) {
            setIsCreating(false);
            setIsSuccess(false);
            console.error('Error creating dormitory:', error);
        }
    };

    const handleClearAll = () => {
        setNewDormitory({
            name: '',
            address: '',
            description: '',
            groundFloorPhoneNumber: '',
            floorAssignments: [],
            photos: [],
        });
        setActiveSection('General Information');
        setSelectedFloor(null);
        setNewFloorLabel('');
        setNewRoomsNumbersLabel('');
        setNewRoomsNumbers([]);
        setNewRoomsTemplateId('');
        setSelectedTemplate(null);
        setNewRoomTemplate(null);
        setEditRoomTemplate(false);
        setRoomTemplateNewPhotos([]);
        setShowTemplatePhotosEdit(false);
        setSelectedPCategory(null);
        setNewPCategory(null);
        setEditPCategory(false);
        setValidationErrors({});
        setShowValidationErrors(false);
    };

    // Enhanced section navigation with minimal animation
    const navigateToSection = (sectionKey: ActiveSection) => {
        setActiveSection(sectionKey);
    };

    // Calculate progress percentage
    const calculateProgress = () => {
        const currentIndex = sections.findIndex(s => s.key === activeSection);
        return ((currentIndex + 1) / sections.length) * 100;
    };

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'General Information':
                return (
                    <GeneralInformationComponent
                        dormitoryData={newDormitory}
                        onInputChange={handleInputChange}
                        showDormitoryPhotosEdit={showDormitoryPhotosEdit}
                        onOpenPhotosEdit={openDormitoryPhotosEdit}
                        onClosePhotosEdit={closeDormitoryPhotosEdit}
                        onSetPhotos={setNewPhotos}
                        validationErrors={validationErrors}
                    />
                );

            case 'Room Generation':
                return (
                    <RoomGenerationComponent
                        dormitoryData={newDormitory}
                        selectedFloor={selectedFloor}
                        roomTemplates={roomTemplates}
                        newFloorLabel={newFloorLabel}
                        newRoomsNumbersLabel={newRoomsNumbersLabel}
                        newRoomsTemplateId={newRoomsTemplateId}
                        pCategoriesList={pCategoriesList}
                        onInputChange={handleInputChange}
                        onSelectChange={handleSelectChange}
                        onSetSelectedFloor={handleSetSelectedFloor}
                        onAddFloor={handleAddFloor}
                        onDeleteFloor={handleDeleteFloor}
                        onAddRoomAssignment={handleAddRoomAssignment}
                        validationErrors={validationErrors}
                    />
                );

            case 'Room Templates':
                return (
                    <RoomTemplatesComponent
                        roomTemplates={roomTemplates}
                        selectedTemplate={selectedTemplate}
                        newRoomTemplate={newRoomTemplate}
                        editRoomTemplate={editRoomTemplate}
                        roomTemplateNewPhotos={roomTemplateNewPhotos}
                        showTemplatePhotosEdit={showTemplatePhotosEdit}
                        pCategoriesList={pCategoriesList}
                        onSelectTemplate={handleSelectTemplate}
                        onAddRoomTemplate={handleAddRoomTemplate}
                        onCreateNewRoomTemplate={handleCreateNewRoomTemplate}
                        onStartEditTemplate={handleStartEditTemplate}
                        onEditTemplate={handleEditTemplate}
                        onCancelTemplateChanges={handleCancelTemplateChanges}
                        onDeleteTemplate={handleDeleteTemplate}
                        onTemplateInputChange={handleTemplateInputChange}
                        onNewTemplateInputChange={handleNewTemplateInputChange}
                        onChangeSelectedTemplateCategory={handleChangeSelectedTemplateCategory}
                        onChangeNewTemplateCategory={handleChangeNewTemplateCategory}
                        onOpenTemplatePhotosEdit={handleOpenTemplatePhotosEdit}
                        onCloseTemplatePhotosEdit={handleCloseTemplatePhotosEdit}
                        onSetTemplatePhotos={handleSetTemplatePhotos}
                        onSetRoomTemplateNewPhotos={handleSetRoomTemplateNewPhotos}
                        onUpdateNewRoomPhotos={handleUpdateNewRoomPhotos}
                        onAddEquipmentToTemplate={handleAddEquipmentToTemplate}
                        onRemoveEquipmentFromTemplate={handleRemoveEquipmentFromTemplate}
                        onAddEquipmentToNewTemplate={handleAddEquipmentToNewTemplate}
                        onRemoveEquipmentFromNewTemplate={handleRemoveEquipmentFromNewTemplate}
                        validationErrors={validationErrors}
                    />
                );

            case 'Price Categories':
                return (
                    <PriceCategoriesComponent
                        pCategoriesList={pCategoriesList}
                        selectedPCategory={selectedPCategory}
                        newPCategory={newPCategory}
                        editPCategory={editPCategory}
                        onSelectCategory={handleSelectCategory}
                        onAddNewCategory={handleAddNewCategory}
                        onChangePriceCategoryInput={handleChangePriceCategoryInput}
                        onChangeNewPriceCategoryInput={handleChangeNewPriceCategoryInput}
                        onCancelEdition={handleCancelEdition}
                        onDeleteCategory={handleDeleteCategory}
                        onSaveEdition={handleSaveEdition}
                        onCreateCategory={handleCreateCategory}
                        onSetEditMode={handleSetEditMode}
                        validationErrors={validationErrors}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-0 xs:p-1 sm:p-4">
                <DialogPanel
                    className="w-full h-full xs:h-[98vh] sm:h-[95vh] bg-white xs:rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col border-0 xs:border sm:border-2 xs:border-slate-200 sm:border-blue-100 max-w-full xs:max-w-[98vw] sm:max-w-7xl"
                    style={{ 
                        width: '100vw',
                        maxWidth: '100vw',
                        height: '100vh',
                        minHeight: '100vh'
                    }}
                    data-media="(max-width: 475px)"
                >
                    <style jsx>{`
                        @media (min-width: 475px) {
                            [data-media="(max-width: 475px)"] {
                                width: 98vw !important;
                                max-width: 98vw !important;
                                height: 98vh !important;
                                min-height: 98vh !important;
                            }
                        }
                        @media (min-width: 640px) {
                            [data-media="(max-width: 475px)"] {
                                width: 95vw !important;
                                max-width: 1400px !important;
                                height: 90vh !important;
                                min-height: 800px !important;
                            }
                        }
                    `}</style>
                    
                    {/* Simplified Header */}
                    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-2 xs:px-4 sm:px-6 py-2 xs:py-4 sm:py-6 flex-shrink-0 relative overflow-hidden">
                        {/* Decorative background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12"></div>
                            <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-white rounded-full translate-y-10"></div>
                        </div>
                        <div className="flex items-start justify-between relative z-10 gap-2 xs:gap-4">
                            <div className="flex items-start space-x-2 xs:space-x-3 sm:space-x-4 flex-1 min-w-0">
                                <div className="flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full backdrop-blur-sm flex-shrink-0">
                                    {isSuccess ? (
                                        <CheckCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
                                    ) : (
                                        <BuildingIcon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <DialogTitle className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white truncate">
                                        {isSuccess ? (
                                            <span>Dormitory Created Successfully!</span>
                                        ) : (
                                            <span>{t('createDormitory.title')}</span>
                                        )}
                                    </DialogTitle>
                                    <Description className="text-blue-100 text-xs sm:text-sm mt-0.5 xs:mt-1 line-clamp-2">
                                        {isSuccess ? (
                                            <span>Your dormitory has been created and is ready for use</span>
                                        ) : (
                                            <span>Create and configure your new dormitory</span>
                                        )}
                                    </Description>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 flex-shrink-0">
                                {isCreating && (
                                    <div className="hidden sm:flex items-center space-x-2 text-white">
                                        <Loader2 className="w-3 h-3 xs:w-4 xs:h-4" />
                                        <span className="text-xs xs:text-sm">Creating...</span>
                                    </div>
                                )}
                                <button 
                                    onClick={onClose}
                                    className="flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                                    aria-label="Close dialog"
                                >
                                    <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        {/* Simple Progress Bar */}
                        {!isSuccess && (
                            <div className="mt-2 xs:mt-4 sm:mt-6 relative z-10">
                                <div className="w-full bg-white/20 rounded-full h-1.5 xs:h-2 sm:h-3 shadow-inner">
                                    <div 
                                        className="bg-white rounded-full h-1.5 xs:h-2 sm:h-3  ease-out shadow-sm"
                                        style={{ width: `${calculateProgress()}%` }}
                                    />
                                </div>
                                <div className="flex justify-between mt-1 xs:mt-2 sm:mt-3 text-xs sm:text-sm text-blue-100">
                                    <span className="font-medium">Krok {sections.findIndex(s => s.key === activeSection) + 1} z {sections.length}</span>
                                    <span className="font-medium">{Math.round(calculateProgress())}% Ukończone</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Simplified Progress Navigation */}
                    <div className="bg-gray-50 border-b border-gray-200 px-1 xs:px-2 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-5 flex-shrink-0 shadow-sm">
                        <div className="flex items-center justify-between w-full">
                            {/* Previous Button */}
                            <button 
                                onClick={() => {
                                    const currentIndex = sections.findIndex(s => s.key === activeSection);
                                    if (currentIndex > 0) {
                                        setActiveSection(sections[currentIndex - 1].key);
                                    }
                                }}
                                disabled={activeSection === 'General Information'}
                                className={`p-1 xs:p-1.5 sm:p-2 rounded-md xs:rounded-lg transition-colors flex items-center justify-center ${
                                    activeSection === 'General Information'
                                        ? 'text-gray-300 cursor-not-allowed' 
                                        : 'text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                <ArrowBigLeftDash className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                            </button>
                            
                            {/* Section Pills */}
                            <div className="flex items-center space-x-0.5 xs:space-x-1 sm:space-x-3 overflow-x-auto max-w-[calc(100vw-60px)] xs:max-w-[calc(100vw-80px)] sm:max-w-none scrollbar-hide">
                                {sections.map((section, index) => (
                                    <button 
                                        key={section.key}
                                        onClick={() => setActiveSection(section.key)}
                                        className={`px-1.5 xs:px-2 sm:px-5 py-1.5 xs:py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-md xs:rounded-lg sm:rounded-xl  flex items-center space-x-1 sm:space-x-2 shadow-sm whitespace-nowrap min-w-0 ${
                                            activeSection === section.key
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                                        }`}
                                    >
                                        <span className="flex-shrink-0">{section.icon}</span>
                                        <span className="hidden xs:inline text-xs sm:text-sm truncate max-w-16 xs:max-w-20 sm:max-w-none">{section.label}</span>
                                    </button>
                                ))}
                            </div>
                            
                            {/* Next Button */}
                            <button 
                                onClick={() => {
                                    const currentIndex = sections.findIndex(s => s.key === activeSection);
                                    if (currentIndex < sections.length - 1) {
                                        setActiveSection(sections[currentIndex + 1].key);
                                    }
                                }}
                                disabled={activeSection === 'Price Categories'}
                                className={`p-1 xs:p-1.5 sm:p-2 rounded-md xs:rounded-lg transition-colors flex items-center justify-center ${
                                    activeSection === 'Price Categories'
                                        ? 'text-gray-300 cursor-not-allowed' 
                                        : 'text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                <ArrowBigRightDash className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto bg-gray-50">
                        <div 
                            key={activeSection} 
                            className="h-full p-2 xs:p-3 sm:p-6"
                            style={{ minHeight: '300px' }}
                        >
                            {renderActiveSection()}
                        </div>
                    </div>

                    {/* Footer with Create Button */}
                    <div className="bg-gray-50 border-t border-gray-200 px-2 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-5 flex-shrink-0 shadow-lg">
                        <div className="flex flex-col gap-2 xs:gap-3 sm:gap-0 sm:flex-row items-stretch sm:items-center justify-between">
                            <div className="text-xs sm:text-sm text-gray-600 flex items-center space-x-2 justify-center sm:justify-start order-2 sm:order-1">
                                <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-center sm:text-left text-xs xs:text-sm">
                                    {activeSection === 'General Information' 
                                        ? 'Wypełnij podstawowe informacje o akademiku'
                                        : activeSection === 'Room Generation'
                                        ? 'Skonfiguruj piętra i rozmieszczenie pokoi'
                                        : activeSection === 'Room Templates'
                                        ? 'Zarządzaj szablonami pokoi'
                                        : 'Ustaw kategorie cenowe'
                                    }
                                </span>
                            </div>
                            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 order-1 sm:order-2">
                                <button 
                                    onClick={onClose}
                                    className="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 text-xs xs:text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg xs:rounded-xl hover:bg-gray-50 hover:border-gray-400  shadow-sm"
                                >
                                    Anuluj
                                </button>
                                <button 
                                    onClick={handleClearAll}
                                    className="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 text-xs xs:text-sm font-medium text-orange-700 bg-orange-50 border-2 border-orange-200 rounded-lg xs:rounded-xl hover:bg-orange-100 hover:border-orange-300  flex items-center justify-center space-x-1 xs:space-x-2 shadow-sm"
                                >
                                    <svg className="w-3 h-3 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span>Wyczyść wszystko</span>
                                </button>
                                <button 
                                    onClick={handleCreateDormitory}
                                    disabled={isCreating}
                                    className={`px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 text-xs xs:text-sm font-semibold text-white border-2 rounded-lg xs:rounded-xl  flex items-center justify-center space-x-1 xs:space-x-2 shadow-lg ${
                                        isCreating 
                                            ? 'bg-gray-400 border-gray-400 cursor-not-allowed' 
                                            : 'bg-blue-600 border-transparent hover:bg-blue-700 shadow-blue-500/25'
                                    }`}
                                >
                                    {isCreating ? (
                                        <>
                                            <Loader2 className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                                            <span>Tworzenie...</span>
                                        </>
                                    ) : (
                                        <>
                                            <BuildingIcon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                                            <span>Utwórz Akademik</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

//Helper component to show error
export const ValidationError = ({ error }: { error?: string }) => {
    if (!error) return null;

    return (
        <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
        </p>
    );
};