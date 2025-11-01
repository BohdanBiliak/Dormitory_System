import React from "react";
import { Plus } from "lucide-react";
import { DormitoryPostData } from "@/types/dormitories.types";
import { ImageCarouselComponent } from "@/components/ui/ImageCarousel.component";
import { useLanguage } from "@/providers/language.provider";

interface GeneralInformationProps {
    dormitoryData: DormitoryPostData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    showDormitoryPhotosEdit: boolean;
    onOpenPhotosEdit: () => void;
    onClosePhotosEdit: () => void;
    onSetPhotos: (files: File[]) => void;
}

export default function GeneralInformationComponent({
    dormitoryData,
    onInputChange,
    showDormitoryPhotosEdit,
    onOpenPhotosEdit,
    onClosePhotosEdit,
    onSetPhotos
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm"
                        required
                    />
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Numer telefonu
                    </label>
                    <input
                        type="text"
                        name="groundFloorPhoneNumber"
                        value={dormitoryData.groundFloorPhoneNumber}
                        onChange={onInputChange}
                        placeholder="Wprowadź numer telefonu"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm"
                    />
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none shadow-sm"
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