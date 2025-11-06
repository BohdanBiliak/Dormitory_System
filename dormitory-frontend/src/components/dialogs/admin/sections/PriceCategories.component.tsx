import React from "react";
import { Plus, Edit, Trash2, Save, X, DollarSign } from "lucide-react";
import { PriceCategory, PriceCategoryPostData } from "@/types/dormitories.types";

interface ValidationErrors {
    priceCategories?: {
        name?: string;
        pricePerMonth?: string;
        pricePerDay?: string;
    };
}

interface PriceCategoriesProps {
    pCategoriesList: PriceCategory[];
    selectedPCategory: PriceCategory | null;
    newPCategory: PriceCategoryPostData | null;
    editPCategory: boolean;
    onSelectCategory: (category: PriceCategory) => void;
    onAddNewCategory: () => void;
    onChangePriceCategoryInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeNewPriceCategoryInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCancelEdition: (id: string) => void;
    onDeleteCategory: (id: string) => void;
    onSaveEdition: (id: string, changes: PriceCategoryPostData) => void;
    onCreateCategory: (category: PriceCategoryPostData) => void;
    onSetEditMode: (edit: boolean) => void;
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

export default function PriceCategoriesComponent({
                                                     pCategoriesList,
                                                     selectedPCategory,
                                                     newPCategory,
                                                     editPCategory,
                                                     onSelectCategory,
                                                     onAddNewCategory,
                                                     onChangePriceCategoryInput,
                                                     onChangeNewPriceCategoryInput,
                                                     onCancelEdition,
                                                     onDeleteCategory,
                                                     onSaveEdition,
                                                     onCreateCategory,
                                                     onSetEditMode,
                                                     validationErrors = {}
                                                 }: PriceCategoriesProps) {

    return (
        <div className="w-full h-full min-h-[600px]">
            <div className="p-6 space-y-8 max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Kategorie Cenowe
                    </h2>
                    <p className="text-gray-600">
                        Zarządzaj poziomami cenowymi dla różnych typów pokoi
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Categories List */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                                    Kategorie
                                </h3>
                            </div>

                            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                                {pCategoriesList.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>Brak kategorii</p>
                                        <p className="text-sm">Utwórz swoją pierwszą kategorię</p>
                                    </div>
                                ) : (
                                    pCategoriesList.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => onSelectCategory(category)}
                                            className={`w-full text-left p-4 rounded-lg border transition-colors ${
                                                selectedPCategory === category
                                                    ? 'bg-green-50 border-green-200 text-green-900'
                                                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            <div className="font-medium">{category.name}</div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {category.pricePerMonth} zł/miesiąc • {category.pricePerDay} zł/dzień
                                            </div>
                                        </button>
                                    ))
                                )}

                                <button
                                    onClick={onAddNewCategory}
                                    className={`w-full p-4 rounded-lg border-2 border-dashed transition-colors ${
                                        newPCategory
                                            ? 'border-green-300 bg-green-50 text-green-700'
                                            : 'border-gray-300 hover:border-gray-400 text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <Plus className="w-4 h-4" />
                                        <span>
                                        {newPCategory && newPCategory.name
                                            ? newPCategory.name
                                            : 'Nowa kategoria'
                                        }
                                    </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Category Details */}
                    <div className="lg:col-span-2">
                        {selectedPCategory && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Szczegóły kategorii
                                        </h3>
                                        {!editPCategory ? (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => onSetEditMode(true)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit category"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => onDeleteCategory(selectedPCategory.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete category"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => onSaveEdition(selectedPCategory.id, selectedPCategory)}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Save changes"
                                                >
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => onCancelEdition(selectedPCategory.id)}
                                                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                                    title="Cancel changes"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Nazwa kategorii <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="name"
                                                value={selectedPCategory.name}
                                                onChange={onChangePriceCategoryInput}
                                                disabled={!editPCategory}
                                                className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                                                    editPCategory
                                                        ? validationErrors.priceCategories?.name
                                                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        : 'border-gray-200 bg-gray-50 text-gray-600'
                                                }`}
                                                required
                                            />
                                            {editPCategory && <ValidationError error={validationErrors.priceCategories?.name} />}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Opis
                                            </label>
                                            <input
                                                name="description"
                                                value={selectedPCategory.description}
                                                onChange={onChangePriceCategoryInput}
                                                disabled={!editPCategory}
                                                className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                                                    editPCategory
                                                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        : 'border-gray-200 bg-gray-50 text-gray-600'
                                                }`}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Cena za miesiąc (zł) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="pricePerMonth"
                                                value={selectedPCategory.pricePerMonth}
                                                onChange={onChangePriceCategoryInput}
                                                disabled={!editPCategory}
                                                min="0"
                                                step="0.01"
                                                className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                                                    editPCategory
                                                        ? validationErrors.priceCategories?.pricePerMonth
                                                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        : 'border-gray-200 bg-gray-50 text-gray-600'
                                                }`}
                                                required
                                            />
                                            {editPCategory && <ValidationError error={validationErrors.priceCategories?.pricePerMonth} />}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Cena za dzień (zł) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="pricePerDay"
                                                value={selectedPCategory.pricePerDay}
                                                onChange={onChangePriceCategoryInput}
                                                disabled={!editPCategory}
                                                min="0"
                                                step="0.01"
                                                className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                                                    editPCategory
                                                        ? validationErrors.priceCategories?.pricePerDay
                                                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        : 'border-gray-200 bg-gray-50 text-gray-600'
                                                }`}
                                                required
                                            />
                                            {editPCategory && <ValidationError error={validationErrors.priceCategories?.pricePerDay} />}
                                        </div>
                                    </div>

                                    {/* Preview Card */}
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                                        <h4 className="font-semibold text-gray-900 mb-4">Podgląd cen</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {selectedPCategory.pricePerMonth} zł
                                                </div>
                                                <div className="text-sm text-gray-600">za miesiąc</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {selectedPCategory.pricePerDay} zł
                                                </div>
                                                <div className="text-sm text-gray-600">za dzień</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* New Category Creation */}
                        {newPCategory && !selectedPCategory && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Utwórz nową kategorię
                                        </h3>
                                        <button
                                            onClick={() => onCreateCategory(newPCategory)}
                                            disabled={!newPCategory.name.trim()}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Utwórz kategorię
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Nazwa kategorii <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={newPCategory.name}
                                                placeholder="np. Premium, Standard, Budżetowy"
                                                onChange={onChangeNewPriceCategoryInput}
                                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent ${
                                                    validationErrors.priceCategories?.name
                                                        ? 'border-red-500 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-green-500'
                                                }`}
                                                required
                                            />
                                            <ValidationError error={validationErrors.priceCategories?.name} />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Opis
                                            </label>
                                            <input
                                                type="text"
                                                name="description"
                                                value={newPCategory.description}
                                                placeholder="Krótki opis kategorii"
                                                onChange={onChangeNewPriceCategoryInput}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Cena za miesiąc (zł) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="pricePerMonth"
                                                value={newPCategory.pricePerMonth}
                                                min="0"
                                                step="0.01"
                                                placeholder="Minimum 0"
                                                onChange={onChangeNewPriceCategoryInput}
                                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent ${
                                                    validationErrors.priceCategories?.pricePerMonth
                                                        ? 'border-red-500 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-green-500'
                                                }`}
                                                required
                                            />
                                            <ValidationError error={validationErrors.priceCategories?.pricePerMonth} />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Cena za dzień (zł) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="pricePerDay"
                                                value={newPCategory.pricePerDay}
                                                min="0"
                                                step="0.01"
                                                placeholder="Minimum 0"
                                                onChange={onChangeNewPriceCategoryInput}
                                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent ${
                                                    validationErrors.priceCategories?.pricePerDay
                                                        ? 'border-red-500 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-green-500'
                                                }`}
                                                required
                                            />
                                            <ValidationError error={validationErrors.priceCategories?.pricePerDay} />
                                        </div>
                                    </div>

                                    {/* Preview Card */}
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                                        <h4 className="font-semibold text-gray-900 mb-4">Podgląd cen</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {newPCategory.pricePerMonth || 0} zł
                                                </div>
                                                <div className="text-sm text-gray-600">za miesiąc</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {newPCategory.pricePerDay || 0} zł
                                                </div>
                                                <div className="text-sm text-gray-600">za dzień</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {!selectedPCategory && !newPCategory && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                                <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Wybierz kategorię</h3>
                                <p className="text-gray-500">Wybierz kategorię z lewej strony, aby wyświetlić i edytować jej szczegóły</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}