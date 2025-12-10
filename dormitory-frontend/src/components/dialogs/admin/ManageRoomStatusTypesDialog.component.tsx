'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Plus, Edit2 } from "lucide-react";
import { useState } from "react";
import { useGetRoomStatusTypes, useRoomStatusTypeManagement } from "@/hooks/roomStatusTypes.hook";
import { CreateRoomStatusTypeRequest } from "@/types/roomStatusTypes.types";
import { useLanguage } from "@/providers/language.provider";

interface ManageRoomStatusTypesDialogProps {
    open: boolean;
    onClose: () => void;
}

export function ManageRoomStatusTypesDialog({ open, onClose }: ManageRoomStatusTypesDialogProps) {
    const { t } = useLanguage();
    const { data: statusTypes, isLoading } = useGetRoomStatusTypes();
    const { createStatusType, updateStatusType } = useRoomStatusTypeManagement();
    
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateRoomStatusTypeRequest>({
        name: '',
        description: '',
        color: '#3B82F6',
        isActive: true
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateStatusType({ id: editingId, data: formData });
            setEditingId(null);
        } else {
            createStatusType(formData);
        }
        resetForm();
    };

    const handleEdit = (statusType: any) => {
        setEditingId(statusType.id);
        setFormData({
            name: statusType.name,
            description: statusType.description || '',
            color: statusType.color || '#3B82F6',
            isActive: statusType.isActive ?? true
        });
        setIsCreating(true);
    };

    const toggleActive = (id: string, currentStatus: boolean) => {
        updateStatusType({
            id,
            data: { isActive: !currentStatus }
        });
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', color: '#3B82F6', isActive: true });
        setIsCreating(false);
        setEditingId(null);
    };

    const predefinedColors = [
        '#3B82F6', // blue
        '#10B981', // green
        '#F59E0B', // yellow
        '#EF4444', // red
        '#8B5CF6', // purple
        '#EC4899', // pink
        '#6B7280', // gray
        '#14B8A6', // teal
    ];

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="bg-green-600 px-6 py-4 flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-white flex items-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {t('dialogs.roomStatusTypes.title')}
                        </DialogTitle>
                        <button onClick={onClose} className="text-white hover:text-green-100">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {!isCreating ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">{t('dialogs.roomStatusTypes.listTitle')}</h3>
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        {t('dialogs.roomStatusTypes.addNew')}
                                    </button>
                                </div>

                                {isLoading ? (
                                    <div className="text-center py-8">{t('dialogs.roomStatusTypes.loading')}</div>
                                ) : statusTypes && statusTypes.length > 0 ? (
                                    <div className="grid gap-4">
                                        {statusTypes.map((statusType) => (
                                            <div key={statusType.id} className="border rounded-lg p-4 flex justify-between items-start">
                                                <div className="flex items-start space-x-4 flex-1">
                                                    <div
                                                        className="w-12 h-12 rounded-lg flex-shrink-0"
                                                        style={{ backgroundColor: statusType.color }}
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-lg">{statusType.name}</h4>
                                                        {statusType.description && (
                                                            <p className="text-sm text-gray-600 mt-1">{statusType.description}</p>
                                                        )}
                                                        <div className="flex items-center space-x-3 mt-2">
                                                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                                                statusType.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                                {statusType.isActive ? t('dialogs.roomStatusTypes.status.active') : t('dialogs.roomStatusTypes.status.inactive')}
                                                            </span>
                                                            <button
                                                                onClick={() => toggleActive(statusType.id, statusType.isActive)}
                                                                className="text-sm text-blue-600 hover:text-blue-800"
                                                            >
                                                                {statusType.isActive ? t('dialogs.roomStatusTypes.actions.deactivate') : t('dialogs.roomStatusTypes.actions.activate')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleEdit(statusType)}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded ml-4"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        {t('dialogs.roomStatusTypes.noStatusTypes')}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <h3 className="text-lg font-semibold mb-4">
                                    {editingId ? t('dialogs.roomStatusTypes.formTitle.edit') : t('dialogs.roomStatusTypes.formTitle.create')}
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.roomStatusTypes.fields.name')}</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.roomStatusTypes.fields.description')}</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('dialogs.roomStatusTypes.fields.color')}</label>
                                    <div className="flex space-x-2 mb-3">
                                        {predefinedColors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, color })}
                                                className={`w-10 h-10 rounded-lg border-2 ${
                                                    formData.color === color ? 'border-gray-800 ring-2 ring-offset-2 ring-gray-800' : 'border-gray-300'
                                                }`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                    <input
                                        type="color"
                                        value={formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        className="w-full h-10 px-1 border border-gray-300 rounded-lg cursor-pointer"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">{t('dialogs.roomStatusTypes.fields.active')}</label>
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        {editingId ? t('dialogs.roomStatusTypes.buttons.update') : t('dialogs.roomStatusTypes.buttons.create')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                    >
                                        {t('dialogs.roomStatusTypes.buttons.cancel')}
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
