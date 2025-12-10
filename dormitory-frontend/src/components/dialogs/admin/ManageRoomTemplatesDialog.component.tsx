'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGetRoomTemplates, useMutateRoomTemplate } from "@/hooks/roomTemplates.hook";
import { RoomTemplatePostData } from "@/types/dormitories.types";
import { useLanguage } from "@/providers/language.provider";

interface ManageRoomTemplatesDialogProps {
    open: boolean;
    onClose: () => void;
}

export function ManageRoomTemplatesDialog({ open, onClose }: ManageRoomTemplatesDialogProps) {
    const { t } = useLanguage();
    const { data: roomTemplates, isLoading } = useGetRoomTemplates();
    const { createRoomTemplate, updateRoomTemplate, deleteRoomTemplate } = useMutateRoomTemplate();
    
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<RoomTemplatePostData>({
        name: '',
        typeCode: '',
        description: '',
        capacity: 1,
        equipment: [],
        photos: []
    });
    const [equipmentInput, setEquipmentInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateRoomTemplate({ templateId: editingId, newTemplate: formData });
            setEditingId(null);
        } else {
            createRoomTemplate(formData);
        }
        resetForm();
    };

    const handleEdit = (template: any) => {
        setEditingId(template.id);
        setFormData({
            name: template.name,
            typeCode: template.typeCode,
            description: template.description || '',
            capacity: template.capacity,
            equipment: template.equipment || [],
            photos: []
        });
        setIsCreating(true);
    };

    const handleDelete = (id: string) => {
        if (confirm(t('dialogs.roomTemplates.confirmDelete'))) {
            deleteRoomTemplate(id);
        }
    };

    const addEquipment = () => {
        if (equipmentInput.trim()) {
            setFormData({
                ...formData,
                equipment: [...formData.equipment, equipmentInput.trim()]
            });
            setEquipmentInput('');
        }
    };

    const removeEquipment = (index: number) => {
        setFormData({
            ...formData,
            equipment: formData.equipment.filter((_, i) => i !== index)
        });
    };

    const resetForm = () => {
        setFormData({ name: '', typeCode: '', description: '', capacity: 1, equipment: [], photos: [] });
        setEquipmentInput('');
        setIsCreating(false);
        setEditingId(null);
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="bg-purple-600 px-6 py-4 flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-white flex items-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {t('dialogs.roomTemplates.title')}
                        </DialogTitle>
                        <button onClick={onClose} className="text-white hover:text-purple-100">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {!isCreating ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">{t('dialogs.roomTemplates.listTitle')}</h3>
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        {t('dialogs.roomTemplates.addNew')}
                                    </button>
                                </div>

                                {isLoading ? (
                                    <div className="text-center py-8">{t('dialogs.roomTemplates.loading')}</div>
                                ) : roomTemplates && roomTemplates.length > 0 ? (
                                    <div className="grid gap-4">
                                        {roomTemplates.map((template) => (
                                            <div key={template.id} className="border rounded-lg p-4 flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-lg">{template.name}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {t('dialogs.roomTemplates.labels.capacity')} <span className="font-medium">{template.capacity} {t('dialogs.roomTemplates.labels.people')}</span>
                                                    </p>
                                                    {template.equipment && template.equipment.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-xs text-gray-500">{t('dialogs.roomTemplates.labels.equipment')}</p>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {template.equipment.map((item, idx) => (
                                                                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                                        {item}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex space-x-2 ml-4">
                                                    <button
                                                        onClick={() => handleEdit(template)}
                                                        className="p-2 text-purple-600 hover:bg-purple-50 rounded"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(template.id)}
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
                                        {t('dialogs.roomTemplates.noTemplates')}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <h3 className="text-lg font-semibold mb-4">
                                    {editingId ? t('dialogs.roomTemplates.formTitle.edit') : t('dialogs.roomTemplates.formTitle.create')}
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.roomTemplates.fields.name')}</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.roomTemplates.fields.typeCode')}</label>
                                    <input
                                        type="text"
                                        value={formData.typeCode}
                                        onChange={(e) => setFormData({ ...formData, typeCode: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                        placeholder={t('dialogs.roomTemplates.fields.typeCodePlaceholder')}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.roomTemplates.fields.description')}</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        rows={2}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.roomTemplates.fields.capacity')}</label>
                                    <input
                                        type="number"
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.roomTemplates.fields.equipment')}</label>
                                    <div className="flex space-x-2 mb-2">
                                        <input
                                            type="text"
                                            value={equipmentInput}
                                            onChange={(e) => setEquipmentInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder={t('dialogs.roomTemplates.fields.equipmentPlaceholder')}
                                        />
                                        <button
                                            type="button"
                                            onClick={addEquipment}
                                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                        >
                                            {t('dialogs.roomTemplates.buttons.add')}
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.equipment.map((item, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center">
                                                {item}
                                                <button
                                                    type="button"
                                                    onClick={() => removeEquipment(idx)}
                                                    className="ml-2 text-purple-600 hover:text-purple-800"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        {editingId ? t('dialogs.roomTemplates.buttons.update') : t('dialogs.roomTemplates.buttons.create')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                    >
                                        {t('dialogs.roomTemplates.buttons.cancel')}
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
