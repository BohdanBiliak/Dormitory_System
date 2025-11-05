import React from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { 
    RoomTemplate, 
    RoomTemplatePostData,
    PriceCategory 
} from "@/types/dormitories.types";
import { ImageCarouselComponent } from "@/components/ui/ImageCarousel.component";

interface RoomTemplatesProps {
    roomTemplates: RoomTemplate[] | undefined;
    selectedTemplate: RoomTemplate | null;
    newRoomTemplate: RoomTemplatePostData | null;
    editRoomTemplate: boolean;
    roomTemplateNewPhotos: File[];
    showTemplatePhotosEdit: boolean;
    pCategoriesList: PriceCategory[];
    onSelectTemplate: (template: RoomTemplate) => void;
    onAddRoomTemplate: () => void;
    onCreateNewRoomTemplate: () => void;
    onStartEditTemplate: () => void;
    onEditTemplate: (templateId: string, template: RoomTemplate) => void;
    onCancelTemplateChanges: (templateId: string) => void;
    onDeleteTemplate: (templateId: string) => void;
    onTemplateInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNewTemplateInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeSelectedTemplateCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeNewTemplateCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onOpenTemplatePhotosEdit: () => void;
    onCloseTemplatePhotosEdit: () => void;
    onSetTemplatePhotos: (photos: string[]) => void;
    onSetRoomTemplateNewPhotos: (photos: File[]) => void;
    onUpdateNewRoomPhotos: (files: File[]) => void;
    onAddEquipmentToTemplate: () => void;
    onRemoveEquipmentFromTemplate: (index: number) => void;
    onAddEquipmentToNewTemplate: () => void;
    onRemoveEquipmentFromNewTemplate: (index: number) => void;
}

export default function RoomTemplatesComponent({
    roomTemplates,
    selectedTemplate,
    newRoomTemplate,
    editRoomTemplate,
    roomTemplateNewPhotos,
    showTemplatePhotosEdit,
    pCategoriesList,
    onSelectTemplate,
    onAddRoomTemplate,
    onCreateNewRoomTemplate,
    onStartEditTemplate,
    onEditTemplate,
    onCancelTemplateChanges,
    onDeleteTemplate,
    onTemplateInputChange,
    onNewTemplateInputChange,
    onChangeSelectedTemplateCategory,
    onChangeNewTemplateCategory,
    onOpenTemplatePhotosEdit,
    onCloseTemplatePhotosEdit,
    onSetTemplatePhotos,
    onSetRoomTemplateNewPhotos,
    onUpdateNewRoomPhotos,
    onAddEquipmentToTemplate,
    onRemoveEquipmentFromTemplate,
    onAddEquipmentToNewTemplate,
    onRemoveEquipmentFromNewTemplate
}: RoomTemplatesProps) {

    return (
        <div className="w-full h-full min-h-[600px]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        Szablony Pokoi
                        <span className="ml-3 text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {roomTemplates?.length || 0} dostępnych
                        </span>
                    </h3>
                </div>

                <div className="p-6 space-y-6">
                    {/* Template Selection */}
                    <div className="flex flex-wrap gap-3">
                        {roomTemplates?.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => onSelectTemplate(template)}
                                className={`px-4 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                                    selectedTemplate === template 
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/25' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50 hover:border-purple-300'
                                }`}
                            >
                                <div className="flex flex-col items-center space-y-1">
                                    <span className="font-semibold">{template.typeCode}</span>
                                    <span className="text-xs opacity-75">{template.capacity} osób</span>
                                </div>
                            </button>
                        ))}
                        <button 
                            onClick={onAddRoomTemplate}
                            className={`px-4 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                                newRoomTemplate 
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-transparent shadow-lg shadow-green-500/25' 
                                    : 'bg-white text-gray-600 border-dashed border-gray-300 hover:bg-green-50 hover:border-green-300'
                            }`}
                        >
                            {newRoomTemplate && newRoomTemplate.typeCode ? (
                                <div className="flex flex-col items-center space-y-1">
                                    <span className="font-semibold">{newRoomTemplate.typeCode}</span>
                                    <span className="text-xs opacity-75">Nowy</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Plus className="w-4 h-4" />
                                    <span>Nowy szablon</span>
                                </div>
                            )}
                        </button>
                    </div>                {/* Selected Template Details */}
                {selectedTemplate && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">Informacje o szablonie</h4>
                            {!editRoomTemplate ? (
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={onStartEditTemplate}
                                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                                        title="Edytuj szablon"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDeleteTemplate(selectedTemplate.id)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                        title="Usuń szablon"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onEditTemplate(selectedTemplate.id, selectedTemplate)}
                                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                        title="Zapisz zmiany"
                                    >
                                        <Save className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onCancelTemplateChanges(selectedTemplate.id)}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Anuluj zmiany"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nazwa szablonu
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={selectedTemplate.name}
                                        disabled={!editRoomTemplate}
                                        onChange={onTemplateInputChange}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                            editRoomTemplate 
                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500' 
                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kod szablonu
                                    </label>
                                    <input
                                        type="text"
                                        name="typeCode"
                                        value={selectedTemplate.typeCode}
                                        disabled={!editRoomTemplate}
                                        onChange={onTemplateInputChange}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                            editRoomTemplate 
                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500' 
                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Opis
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={selectedTemplate.description}
                                        disabled={!editRoomTemplate}
                                        onChange={onTemplateInputChange}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                            editRoomTemplate 
                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500' 
                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pojemność
                                    </label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        value={selectedTemplate.capacity}
                                        min={1}
                                        disabled={!editRoomTemplate}
                                        onChange={onTemplateInputChange}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                            editRoomTemplate 
                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500' 
                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategoria cenowa
                                    </label>
                                    <select
                                        value={selectedTemplate.priceCategoryId || ''}
                                        onChange={onChangeSelectedTemplateCategory}
                                        disabled={!editRoomTemplate}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                                            editRoomTemplate 
                                                ? 'border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500' 
                                                : 'border-gray-200 bg-gray-50 text-gray-600'
                                        }`}
                                    >
                                        <option value="">--Brak--</option>
                                        {pCategoriesList.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name} ({item.pricePerMonth} zł/miesiąc, {item.pricePerDay} zł/dzień)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Zdjęcia
                                        </label>
                                        <button 
                                            onClick={onOpenTemplatePhotosEdit}
                                            className="p-1 text-gray-600 hover:text-purple-600 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <ImageCarouselComponent
                                        photos={selectedTemplate.photos}
                                        setPhotos={onSetTemplatePhotos}
                                        newPhotos={roomTemplateNewPhotos}
                                        setNewPhotos={onSetRoomTemplateNewPhotos}
                                        showEditMenu={showTemplatePhotosEdit} 
                                        closeEditMenu={onCloseTemplatePhotosEdit}
                                        editionMenuLabels={{
                                            title:"Zdjęcia szablonu", 
                                            description:`Zdjęcia dla szablonu ${selectedTemplate.typeCode}`
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Wyposażenie
                                    </label>
                                    <div className="space-y-2 max-h-32 overflow-y-auto bg-white border border-gray-200 rounded-lg p-3">
                                        {selectedTemplate.equipment.map((item, index) => (
                                            <div className="flex flex-row space-x-2" key={index}>
                                                <input
                                                    type="text"
                                                    name={`equipment-${index}`}
                                                    value={item}
                                                    disabled={!editRoomTemplate}
                                                    onChange={onTemplateInputChange}
                                                    className={`flex-1 px-2 py-1 text-sm border rounded transition-colors ${
                                                        editRoomTemplate 
                                                            ? 'border-gray-300 focus:ring-1 focus:ring-purple-500 focus:border-purple-500' 
                                                            : 'border-gray-200 bg-gray-50 text-gray-600'
                                                    }`}
                                                />
                                                {editRoomTemplate && (
                                                    <button
                                                        onClick={() => onRemoveEquipmentFromTemplate(index)}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {editRoomTemplate && (
                                            <button
                                                onClick={onAddEquipmentToTemplate}
                                                className="w-full px-2 py-1 text-sm border border-dashed border-gray-300 rounded text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-colors"
                                            >
                                                Dodaj nowe wyposażenie
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* New Template Creation */}
                {newRoomTemplate && !selectedTemplate && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">Utwórz nowy szablon</h4>
                            <button 
                                onClick={onCreateNewRoomTemplate}
                                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Utwórz szablon
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nazwa szablonu
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newRoomTemplate.name}
                                        onChange={onNewTemplateInputChange}
                                        placeholder="Wprowadź nazwę szablonu"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kod szablonu
                                    </label>
                                    <input
                                        type="text"
                                        name="typeCode"
                                        value={newRoomTemplate.typeCode}
                                        onChange={onNewTemplateInputChange}
                                        placeholder="Wprowadź kod szablonu"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Opis
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={newRoomTemplate.description}
                                        onChange={onNewTemplateInputChange}
                                        placeholder="Wprowadź opis"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pojemność
                                    </label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        min={1}
                                        value={newRoomTemplate.capacity}
                                        onChange={onNewTemplateInputChange}
                                        placeholder="Wprowadź pojemność"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategoria cenowa
                                    </label>
                                    <select
                                        value={newRoomTemplate.priceCategoryId || ''}
                                        onChange={onChangeNewTemplateCategory}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="">--Brak--</option>
                                        {pCategoriesList.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name} ({item.pricePerMonth} zł/miesiąc, {item.pricePerDay} zł/dzień)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Zdjęcia
                                        </label>
                                        <button 
                                            onClick={onOpenTemplatePhotosEdit}
                                            className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <ImageCarouselComponent 
                                        photos={[]} 
                                        newPhotos={newRoomTemplate.photos} 
                                        setNewPhotos={onUpdateNewRoomPhotos} 
                                        showEditMenu={showTemplatePhotosEdit} 
                                        closeEditMenu={onCloseTemplatePhotosEdit}
                                        editionMenuLabels={{
                                            title:"Zdjęcia szablonu", 
                                            description:"Zdjęcia dla nowego szablonu"
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Wyposażenie
                                    </label>
                                    <div className="space-y-2 max-h-32 overflow-y-auto bg-white border border-gray-200 rounded-lg p-3">
                                        {newRoomTemplate.equipment.map((item, index) => (
                                            <div className="flex flex-row space-x-2" key={index}>
                                                <input
                                                    type="text"
                                                    name={`equipment-${index}`}
                                                    value={item}
                                                    onChange={onNewTemplateInputChange}
                                                    placeholder="Wprowadź wyposażenie"
                                                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <button
                                                    onClick={() => onRemoveEquipmentFromNewTemplate(index)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={onAddEquipmentToNewTemplate}
                                            className="w-full px-2 py-1 text-sm border border-dashed border-gray-300 rounded text-gray-500 hover:border-green-400 hover:text-green-600 transition-colors"
                                        >
                                            Dodaj nowe wyposażenie
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}