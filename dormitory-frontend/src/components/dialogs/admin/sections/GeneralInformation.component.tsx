import React from "react";
import { Plus } from "lucide-react";
import { DormitoryPostData } from "@/types/dormitories.types";
import { ImageCarouselComponent } from "@/components/ui/ImageCarousel.component";
import { useLanguage } from "@/providers/language.provider";

interface ValidationErrors {
    name?: string;
    address?: string;
    groundFloorPhoneNumber?: string;
}

interface GeneralInformationProps {
    dormitoryData: DormitoryPostData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    showDormitoryPhotosEdit: boolean;
    onOpenPhotosEdit: () => void;
    onClosePhotosEdit: () => void;
    onSetPhotos: (files: File[]) => void;
    validationErrors?: ValidationErrors;
}

const ValidationError = ({ error }: { error?: string }) => {
    if (!error) return null;

    return (
        <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
        </p>
    );
};

export default function GeneralInformationComponent({
                                                        dormitoryData,
                                                        onInputChange,
                                                        showDormitoryPhotosEdit,
                                                        onOpenPhotosEdit,
                                                        onClosePhotosEdit,
                                                        onSetPhotos,
                                                        validationErrors = {}
                                                    }: GeneralInformationProps) {
    const { t } = useLanguage();

    return (
        <div className="w-full h-full min-h-[600px]">
            <div className="p-6 space-y-8 max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Informacje podstawowe
                    </h2>
                    <p className="text-gray-600">
                        Uzupełnij podstawowe informacje o akademiku
                    </p>
                </div>

                {/* Basic Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Dormitory Name - Full Width */}
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Nazwa akademiku <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={dormitoryData.name}
                            onChange={onInputChange}
                            placeholder="Wprowadź nazwę akademiku"
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent  text-gray-900 placeholder-gray-500 shadow-sm ${
                                validationErrors.name
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                            }`}
                            required
                        />
                        <ValidationError error={validationErrors.name} />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Adres <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={dormitoryData.address}
                            onChange={onInputChange}
                            placeholder="Wprowadź pełny adres"
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent  text-gray-900 placeholder-gray-500 shadow-sm ${
                                validationErrors.address
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                            }`}
                            required
                        />
                        <ValidationError error={validationErrors.address} />
                    </div>

                    {/* Phone Number - Full Width */}
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Numer telefonu <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="groundFloorPhoneNumber"
                            value={dormitoryData.groundFloorPhoneNumber}
                            onChange={onInputChange}
                            placeholder="+48123456789"
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent  text-gray-900 placeholder-gray-500 shadow-sm ${
                                validationErrors.groundFloorPhoneNumber
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                            }`}
                            required
                        />
                        <ValidationError error={validationErrors.groundFloorPhoneNumber} />
                        <p className="mt-2 text-xs text-gray-500">
                            💡 Ceny pokoi są ustawiane przez kategorie cenowe w osobnej zakładce
                        </p>
                    </div>

                    {/* Description - Full Width */}
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Opis
                        </label>
                        <textarea
                            name="description"
                            value={dormitoryData.description}
                            onChange={onInputChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900 placeholder-gray-500 resize-none shadow-sm"
                            placeholder="Opisz swój akademik szczegółowo..."
                        />
                    </div>
                </div>

                {/* Photos Section */}
                <div className="border-t pt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Zdjęcia akademiku
                        </h3>
                        <button
                            onClick={onOpenPhotosEdit}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Dodaj zdjęcia</span>
                        </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                        <ImageCarouselComponent
                            photos={[]}
                            newPhotos={dormitoryData.photos}
                            setNewPhotos={onSetPhotos}
                            showEditMenu={showDormitoryPhotosEdit}
                            closeEditMenu={onClosePhotosEdit}
                            editionMenuLabels={{
                                title: "Zdjęcia akademiku",
                                description: "Dodaj zdjęcia prezentujące Twój akademik"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}