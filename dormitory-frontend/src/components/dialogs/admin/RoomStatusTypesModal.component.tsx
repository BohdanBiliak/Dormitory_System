"use client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useGetRoomStatusTypes, useRoomStatusTypeManagement } from "@/hooks/roomStatusTypes.hook";
import { CreateRoomStatusTypeRequest, UpdateRoomStatusTypeRequest, RoomStatusType } from "@/types/roomStatusTypes.types";
import { Plus, Trash2, Check, X, Edit3, Power, PowerOff } from "lucide-react";
import { useLanguage } from '@/providers/language.provider';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function RoomStatusTypesModal({ open, onClose }: Props) {
    const { t } = useLanguage();

    const { data: statusTypes, isLoading } = useGetRoomStatusTypes(true);
    const {
        createStatusType,
        updateStatusType,
        deleteStatusType,
        activateStatusType,
        deactivateStatusType
    } = useRoomStatusTypeManagement();

    const [newType, setNewType] = useState<CreateRoomStatusTypeRequest>({
        name: "",
        description: "",
        color: "#16a34a",
        isActive: true
    });

    const [editId, setEditId] = useState<string | null>(null);
    const [editData, setEditData] = useState<UpdateRoomStatusTypeRequest>({});

    const handleCreate = () => {
        createStatusType(newType);
        setNewType({ name: "", description: "", color: "#16a34a", isActive: true });
    };

    const handleEditSave = () => {
        if (!editId) return;
        updateStatusType({ id: editId, data: editData });
        setEditId(null);
        setEditData({});
    };

    const startEdit = (type: RoomStatusType) => {
        setEditId(type.id);
        setEditData({
            name: type.name,
            description: type.description,
            color: type.color,
            isActive: type.isActive
        });
    };

    return (
        <Dialog onClose={onClose} open={open} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in-90">
                    
                    <DialogTitle className="text-xl font-semibold text-slate-900 mb-4 flex items-center justify-between">
                        {t('rooms.statusTypes.title')}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-slate-100 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </DialogTitle>

                    {/* Existing types */}
                    <div className="space-y-3 max-h-80 overflow-y-auto mb-5">
                        {isLoading ? (
                            <p className="text-center text-slate-400 py-6">{t('common.loading')}</p>
                        ) : (
                            statusTypes?.map(type => (
                                <div key={type.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                                    
                                    {editId === type.id ? (
                                        <div className="flex-1 mr-3 space-y-2">
                                            <input
                                                type="text"
                                                value={editData.name || ""}
                                                onChange={e => setEditData(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full border px-3 py-1 rounded"
                                            />
                                            <input
                                                type="text"
                                                value={editData.description || ""}
                                                onChange={e => setEditData(prev => ({ ...prev, description: e.target.value }))}
                                                className="w-full border px-3 py-1 rounded text-sm"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="font-medium text-slate-800">{type.name}</div>
                                            <div className="text-xs text-slate-500">{type.description}</div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2">

                                        {editId === type.id ? (
                                            <>
                                                <button
                                                    onClick={handleEditSave}
                                                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setEditId(null)}
                                                    className="p-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => startEdit(type)}
                                                    className="p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>

                                                {type.isActive ? (
                                                    <button
                                                        onClick={() => deactivateStatusType(type.id)}
                                                        className="p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
                                                    >
                                                        <PowerOff className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => activateStatusType(type.id)}
                                                        className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                                                    >
                                                        <Power className="w-4 h-4" />
                                                    </button>
                                                )}

                                                {!type.isSystem && (
                                                    <button
                                                        onClick={() => deleteStatusType(type.id)}
                                                        className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </>
                                        )}

                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Create new type */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
                        <h3 className="font-medium text-emerald-900 text-sm flex items-center">
                            <Plus className="w-4 h-4 mr-1" /> {t('rooms.statusTypes.createNew')}
                        </h3>

                        <input
                            type="text"
                            placeholder={t('rooms.statusTypes.namePlaceholder')}
                            value={newType.name}
                            onChange={e => setNewType(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-emerald-300 rounded-lg"
                        />

                        <input
                            type="text"
                            placeholder={t('rooms.statusTypes.descriptionPlaceholder')}
                            value={newType.description}
                            onChange={e => setNewType(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-sm"
                        />

                        <button
                            onClick={handleCreate}
                            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
                        >
                            {t('rooms.statusTypes.createButton')}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
