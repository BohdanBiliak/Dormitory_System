import {
    DormitoryPostData,
    FloorAssignment,
    RoomTemplate,
    PriceCategory
} from "@/types/dormitories.types";
import { useLanguage } from "@/providers/language.provider";
import {Plus, Trash2} from "lucide-react";

interface ValidationErrors {
    floorNumber?: string;
}

interface RoomGenerationProps {
    dormitoryData: DormitoryPostData;
    selectedFloor: FloorAssignment | null;
    roomTemplates: RoomTemplate[] | undefined;
    newFloorLabel: string;
    newRoomsNumbersLabel: string;
    newRoomsTemplateId: string;
    pCategoriesList: PriceCategory[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSetSelectedFloor: (floor: FloorAssignment) => void;
    onAddFloor: () => void;
    onDeleteFloor: (index: number) => void;
    onAddRoomAssignment: () => void;
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

export default function RoomGenerationComponent({
                                                    dormitoryData,
                                                    selectedFloor,
                                                    roomTemplates,
                                                    newFloorLabel,
                                                    newRoomsNumbersLabel,
                                                    newRoomsTemplateId,
                                                    pCategoriesList,
                                                    onInputChange,
                                                    onSelectChange,
                                                    onSetSelectedFloor,
                                                    onAddFloor,
                                                    onDeleteFloor,
                                                    onAddRoomAssignment,
                                                    validationErrors = {}
                                                }: RoomGenerationProps) {
    const { t } = useLanguage();

    return (
        <div className="w-full h-full min-h-[600px]">
            <div className="p-6 space-y-8 max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {t('dormitories.createDormitory.sections.roomGeneration')}
                    </h2>
                    <p className="text-gray-600">
                        {t('dormitories.createDormitory.hints.roomGeneration')}
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Floors Management */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Building Floors
                                </h3>
                            </div>

                            <div className="max-h-80 overflow-y-auto">
                                {dormitoryData.floorAssignments.length === 0 ? (
                                    <div className="p-6 text-center text-gray-500">
                                        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <p className="font-medium text-red-600">No floors added yet</p>
                                        <p className="text-sm">At least one floor is required</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-200">
                                        {dormitoryData.floorAssignments.map((floor, index) => {
                                            const hasRooms = floor.roomAssignments.length > 0;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                                                        selectedFloor === floor
                                                            ? 'bg-blue-50 border-l-4 border-l-blue-500'
                                                            : !hasRooms
                                                                ? 'bg-red-50 border-l-4 border-l-red-500'
                                                                : ''
                                                    }`}
                                                    onClick={() => onSetSelectedFloor(floor)}
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2">
                                                            <h4 className="font-medium text-gray-900">
                                                                Floor {floor.floorNumber}
                                                            </h4>
                                                            {!hasRooms && (
                                                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                                                No rooms
                                                            </span>
                                                            )}
                                                        </div>
                                                        <p className={`text-sm ${hasRooms ? 'text-gray-500' : 'text-red-600'}`}>
                                                            {floor.roomAssignments.length} room assignment(s)
                                                            {!hasRooms && ' - At least 1 required'}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onDeleteFloor(index);
                                                        }}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete floor"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Add Floor Section */}
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="flex flex-col space-y-2">
                                    <div className="flex space-x-3">
                                        <input
                                            type="text"
                                            name="newFloorLabel"
                                            value={newFloorLabel}
                                            placeholder="1, 2, 3 lub -1 dla piwnicy"
                                            onChange={onInputChange}
                                            className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-sm ${
                                                validationErrors.floorNumber
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                        />
                                        <button
                                            onClick={onAddFloor}
                                            disabled={!newFloorLabel.trim()}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span className="hidden sm:inline">Add Floor</span>
                                        </button>
                                    </div>
                                    <ValidationError error={validationErrors.floorNumber} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selected Floor Management */}
                    <div className="space-y-6">
                        {selectedFloor ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Floor {selectedFloor.floorNumber} - Room Assignments
                                    </h3>
                                </div>

                                <div className="p-6 space-y-4">
                                    {/* Existing Room Assignments */}
                                    {selectedFloor.roomAssignments.length > 0 && (
                                        <div className="space-y-3">
                                            {selectedFloor.roomAssignments.map((roomAssignment, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                                        {roomTemplates?.find(template => template.id === roomAssignment.roomTypeId)?.typeCode || 'Unknown'}
                                                    </span>
                                                        <div>
                                                            <p className="text-gray-900 font-medium">
                                                                Rooms: {roomAssignment.roomNumbers.join(", ")}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {roomAssignment.roomNumbers.length} room(s)
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Add Room Assignment */}
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h4 className="font-medium text-gray-900 mb-3">Add Room Assignment</h4>
                                        <div className="grid grid-cols-1 gap-3">
                                            <select
                                                name="roomsTemplate"
                                                value={newRoomsTemplateId}
                                                onChange={onSelectChange}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            >
                                                <option value="">Select room template</option>
                                                {roomTemplates?.map((template) => (
                                                    <option key={template.id} value={template.id}>
                                                        {template.typeCode} - {template.name}
                                                    </option>
                                                ))}
                                            </select>

                                            <input
                                                type="text"
                                                name="newRoomsNumbers"
                                                value={newRoomsNumbersLabel}
                                                onChange={onInputChange}
                                                placeholder="Room numbers (e.g., 101, 102, 103)"
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            />

                                            <button
                                                onClick={onAddRoomAssignment}
                                                disabled={!newRoomsTemplateId || !newRoomsNumbersLabel.trim()}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                                            >
                                                <Plus className="w-4 h-4" />
                                                <span>Add Rooms</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Floor</h3>
                                <p className="text-gray-500">Choose a floor from the left to manage its room assignments</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}