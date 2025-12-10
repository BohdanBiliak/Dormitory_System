'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Plus, Edit2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetPriceCategories, useUpdatePriceCategory } from "@/hooks/priceCategories.hook";
import { PriceCategoryPostData } from "@/types/dormitories.types";
import { useLanguage } from "@/providers/language.provider";

interface ManagePriceCategoriesDialogProps {
    open: boolean;
    onClose: () => void;
}

export function ManagePriceCategoriesDialog({ open, onClose }: ManagePriceCategoriesDialogProps) {
    const { t } = useLanguage();
    const { data: priceCategories, isLoading } = useGetPriceCategories();
    const { createPriceCategory, updatePriceCategory, deletePriceCategory } = useUpdatePriceCategory();
    
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<PriceCategoryPostData>({
        name: '',
        description: '',
        pricePerMonth: 0,
        pricePerDay: 0,
        isActive: true
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updatePriceCategory({ categoryId: editingId, categoryUpdate: formData });
            setEditingId(null);
        } else {
            createPriceCategory(formData);
        }
        resetForm();
    };

    const handleEdit = (category: any) => {
        setEditingId(category.id);
        setFormData({
            name: category.name,
            description: category.description || '',
            pricePerMonth: category.pricePerMonth,
            pricePerDay: category.pricePerDay,
            isActive: category.isActive
        });
        setIsCreating(true);
    };

    const handleDelete = (id: string) => {
        if (confirm(t('dialogs.priceCategories.confirmDelete'))) {
            deletePriceCategory(id);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', pricePerMonth: 0, pricePerDay: 0, isActive: true });
        setIsCreating(false);
        setEditingId(null);
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-white flex items-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {t('dialogs.priceCategories.title')}
                        </DialogTitle>
                        <button onClick={onClose} className="text-white hover:text-blue-100">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {!isCreating ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">{t('dialogs.priceCategories.listTitle')}</h3>
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        {t('dialogs.priceCategories.addNew')}
                                    </button>
                                </div>

                                {isLoading ? (
                                    <div className="text-center py-8">{t('dialogs.priceCategories.loading')}</div>
                                ) : priceCategories && priceCategories.length > 0 ? (
                                    <div className="grid gap-4">
                                        {priceCategories.map((category) => (
                                            <div key={category.id} className="border rounded-lg p-4 flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-semibold text-lg">{category.name}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                                                    <div className="mt-2">
                                                        <p className="text-lg font-bold text-blue-600">${category.pricePerMonth}/month</p>
                                                        <p className="text-sm text-gray-600">${category.pricePerDay}/day</p>
                                                    </div>
                                                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                                                        category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {category.isActive ? t('dialogs.priceCategories.status.active') : t('dialogs.priceCategories.status.inactive')}
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(category)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(category.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        {t('dialogs.priceCategories.noCategories')}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <h3 className="text-lg font-semibold mb-4">
                                    {editingId ? t('dialogs.priceCategories.formTitle.edit') : t('dialogs.priceCategories.formTitle.create')}
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.priceCategories.fields.name')}</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.priceCategories.fields.description')}</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.priceCategories.fields.pricePerMonth')}</label>
                                    <input
                                        type="number"
                                        value={formData.pricePerMonth}
                                        onChange={(e) => setFormData({ ...formData, pricePerMonth: parseFloat(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.priceCategories.fields.pricePerDay')}</label>
                                    <input
                                        type="number"
                                        value={formData.pricePerDay}
                                        onChange={(e) => setFormData({ ...formData, pricePerDay: parseFloat(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">{t('dialogs.priceCategories.fields.active')}</label>
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        {editingId ? t('dialogs.priceCategories.buttons.update') : t('dialogs.priceCategories.buttons.create')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                    >
                                        {t('dialogs.priceCategories.buttons.cancel')}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
