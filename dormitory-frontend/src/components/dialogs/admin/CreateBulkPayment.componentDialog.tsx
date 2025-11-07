'use client'

import { useState, useEffect } from 'react';
import { X, Users, DollarSign, Calendar, FileText, Building2, Home } from 'lucide-react';
import { toast } from 'sonner';
import { useUpdatePayments, useGetOccupiedRooms } from '@/hooks/payment.hook';
import { useGetRooms } from '@/hooks/rooms.hook';
import { useGetPriceCategories } from '@/hooks/priceCategories.hook';
import { PaymentType, PaymentMethod, CreateBulkPaymentDto } from '@/types/payments.types';

interface CreateBulkPaymentDialogProps {
  open: boolean;
  onClose: () => void;
}

type PricingStrategy = 'room' | 'category' | 'fixed' | 'custom';

export default function CreateBulkPaymentDialog({ open, onClose }: CreateBulkPaymentDialogProps) {
  const { createBulkPayments, creatingBulkPayments } = useUpdatePayments();
  const { data: rooms, isLoading: loadingRooms } = useGetRooms();
  const { data: occupiedRooms, isLoading: loadingOccupiedRooms } = useGetOccupiedRooms();
  const { data: priceCategories, isLoading: loadingCategories } = useGetPriceCategories();

  const [pricingStrategy, setPricingStrategy] = useState<PricingStrategy>('room');
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [formData, setFormData] = useState<CreateBulkPaymentDto>({
    users: [],
    paymentType: PaymentType.MONTHLY_RENT,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    dueDate: '',
    description: '',
    useRoomPricing: true,
  });

  useEffect(() => {
    if (open) {
      // Set default due date to end of current month
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      setFormData(prev => ({
        ...prev,
        dueDate: endOfMonth.toISOString().split('T')[0],
      }));
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.dueDate) {
      toast.error('Please select a due date');
      return;
    }

    if (pricingStrategy === 'room' && selectedRooms.length === 0) {
      toast.error('Please select at least one room');
      return;
    }

    if (pricingStrategy === 'category' && !formData.priceCategoryId) {
      toast.error('Please select a price category');
      return;
    }

    if (pricingStrategy === 'fixed' && !formData.baseAmount) {
      toast.error('Please enter an amount');
      return;
    }

    if (formData.baseAmount && formData.baseAmount <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }

    const dueDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueDate < today) {
      toast.error('Due date cannot be in the past');
      return;
    }
    
    const bulkPaymentData: CreateBulkPaymentDto = {
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString(),
    };

    // Add room IDs based on strategy
    if (pricingStrategy === 'room' && selectedRooms.length > 0) {
      bulkPaymentData.roomIds = selectedRooms;
      bulkPaymentData.useRoomPricing = true;
    }

    createBulkPayments(bulkPaymentData, {
      onSuccess: () => {
        onClose();
        // Reset form
        setFormData({
          users: [],
          paymentType: PaymentType.MONTHLY_RENT,
          paymentMethod: PaymentMethod.BANK_TRANSFER,
          dueDate: '',
          description: '',
          useRoomPricing: true,
        });
        setSelectedRooms([]);
        setPricingStrategy('room');
      },
    });
  };

  const toggleRoom = (roomId: string) => {
    setSelectedRooms(prev =>
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const selectAllRooms = () => {
    if (rooms) {
      setSelectedRooms(rooms.map(room => room.id));
    }
  };

  const selectAllOccupiedRooms = () => {
    if (occupiedRooms) {
      setSelectedRooms(occupiedRooms.map(room => room.id));
    }
  };

  const clearSelection = () => {
    setSelectedRooms([]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create Bulk Payments</h2>
              <p className="text-blue-100 text-sm">Create payments for multiple users at once</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-6 space-y-6">
            {/* Pricing Strategy */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pricing Strategy
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPricingStrategy('room')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    pricingStrategy === 'room'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Home className="w-5 h-5 mb-2 text-blue-600" />
                  <div className="font-medium text-sm">Room-Based</div>
                  <div className="text-xs text-slate-500">Use room's price category</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPricingStrategy('fixed')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    pricingStrategy === 'fixed'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <DollarSign className="w-5 h-5 mb-2 text-blue-600" />
                  <div className="font-medium text-sm">Fixed Amount</div>
                  <div className="text-xs text-slate-500">Same amount for all</div>
                </button>
              </div>
            </div>

            {/* Room Selection (if room-based) */}
            {pricingStrategy === 'room' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    Select Rooms ({selectedRooms.length} selected)
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={selectAllOccupiedRooms}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                    >
                      Occupied Only
                    </button>
                    <button
                      type="button"
                      onClick={selectAllRooms}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      Select All
                    </button>
                    {selectedRooms.length > 0 && (
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="text-xs text-slate-500 hover:text-slate-700 font-medium px-2 py-1 rounded hover:bg-slate-50 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                <div className="border border-slate-200 rounded-lg max-h-48 overflow-y-auto">
                  {loadingRooms ? (
                    <div className="p-4 text-center text-slate-500">Loading rooms...</div>
                  ) : rooms && rooms.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {rooms.map((room) => (
                        <label
                          key={room.id}
                          className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedRooms.includes(room.id)}
                            onChange={() => toggleRoom(room.id)}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-sm text-slate-900">
                              Room {room.number}
                            </div>
                            <div className="text-xs text-slate-500">
                              {room.dormitory?.name || 'N/A'} • {room.residents?.length || 0}/{room.capacity} occupied
                            </div>
                          </div>
                          {room.price && (
                            <div className="text-xs text-blue-600 font-medium">
                              ${room.price.pricePerMonth}/mo
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-500">No rooms available</div>
                  )}
                </div>
              </div>
            )}

            {/* Fixed Amount Input */}
            {pricingStrategy === 'fixed' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Base Amount (PLN)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.baseAmount || ''}
                  onChange={(e) => setFormData({ ...formData, baseAmount: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                  required
                />
              </div>
            )}

            {/* Payment Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Type
              </label>
              <select
                value={formData.paymentType}
                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value as PaymentType })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={PaymentType.MONTHLY_RENT}>Monthly Rent</option>
                <option value={PaymentType.DAILY_RENT}>Daily Rent</option>
                <option value={PaymentType.UTILITIES}>Utilities</option>
                <option value={PaymentType.MAINTENANCE_FEE}>Maintenance Fee</option>
                <option value={PaymentType.SECURITY_DEPOSIT}>Security Deposit</option>
                <option value={PaymentType.LATE_FEE}>Late Fee</option>
                <option value={PaymentType.CLEANING_FEE}>Cleaning Fee</option>
                <option value={PaymentType.OTHER}>Other</option>
              </select>
            </div>

            {/* Daily Rent Period */}
            {formData.paymentType === PaymentType.DAILY_RENT && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Period (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.periodInDays || ''}
                  onChange={(e) => setFormData({ ...formData, periodInDays: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Number of days"
                  required
                />
              </div>
            )}

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Method
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={PaymentMethod.BANK_TRANSFER}>Bank Transfer</option>
                <option value={PaymentMethod.CASH_TO_MANAGER}>Cash to Manager</option>
                <option value={PaymentMethod.STRIPE_CARD}>Stripe Card</option>
                <option value={PaymentMethod.OTHER}>Other</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
                placeholder="Add a description for these payments..."
              />
            </div>

            {/* Summary */}
            {pricingStrategy === 'room' && selectedRooms.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-900 mb-2">Summary</div>
                <div className="text-sm text-blue-700">
                  This will create payments for residents in <strong>{selectedRooms.length} room(s)</strong>.
                  Amounts will be calculated automatically based on each room's price category.
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-3 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
              disabled={creatingBulkPayments}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creatingBulkPayments || (pricingStrategy === 'room' && selectedRooms.length === 0)}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {creatingBulkPayments ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Creating...
                </span>
              ) : (
                'Create Bulk Payments'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
