'use client'

import { useState, useEffect } from 'react';
import { X, Users, DollarSign, Calendar, FileText, Building2, Home } from 'lucide-react';
import { toast } from 'sonner';
import { useUpdatePayments, useGetOccupiedRooms } from '@/hooks/payment.hook';
import { useGetRooms } from '@/hooks/rooms.hook';
import { useGetPriceCategories } from '@/hooks/priceCategories.hook';
import { PaymentType, PaymentMethod, CreateBulkPaymentDto } from '@/types/payments.types';
import { useLanguage } from '@/providers/language.provider';

interface CreateBulkPaymentDialogProps {
  open: boolean;
  onClose: () => void;
}

type PricingStrategy = 'room' | 'category' | 'fixed' | 'custom';

export default function CreateBulkPaymentDialog({ open, onClose }: CreateBulkPaymentDialogProps) {
  const { t } = useLanguage();
  const { createBulkPayments, creatingBulkPayments } = useUpdatePayments();
  const { data: rooms, isLoading: loadingRooms } = useGetRooms();
  const { data: occupiedRooms, isLoading: loadingOccupiedRooms } = useGetOccupiedRooms();
  const { data: priceCategories, isLoading: loadingCategories } = useGetPriceCategories();

  const [pricingStrategy, setPricingStrategy] = useState<PricingStrategy>('room');
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [minDate, setMinDate] = useState<string>('');
  const [formData, setFormData] = useState<CreateBulkPaymentDto>({
    users: [],
    paymentType: PaymentType.MONTHLY_RENT,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    dueDate: '',
    description: '',
    useRoomPricing: true,
  });

  // Set minimum date on client side only to prevent hydration mismatch
  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

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
      toast.error(t('payments.bulkPayment.validation.selectDueDate'));
      return;
    }

    if (pricingStrategy === 'room' && selectedRooms.length === 0) {
      toast.error(t('payments.bulkPayment.validation.selectRooms'));
      return;
    }

    if (pricingStrategy === 'category' && !formData.priceCategoryId) {
      toast.error(t('payments.bulkPayment.validation.selectPriceCategory'));
      return;
    }

    if (pricingStrategy === 'fixed' && !formData.baseAmount) {
      toast.error(t('payments.bulkPayment.validation.enterAmount'));
      return;
    }

    if (formData.baseAmount && formData.baseAmount <= 0) {
      toast.error(t('payments.bulkPayment.validation.amountGreaterThanZero'));
      return;
    }

    const dueDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueDate < today) {
      toast.error(t('payments.bulkPayment.validation.dueDateNotPast'));
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
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{t('payments.create.bulkTitle')}</h2>
              <p className="text-blue-100 text-sm">{t('payments.create.bulkSubtitle')}</p>
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
                {t('payments.create.pricingStrategy')}
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
                  <div className="font-medium text-sm">{t('payments.create.roomBased')}</div>
                  <div className="text-xs text-slate-500">{t('payments.create.useRoomPriceCategory')}</div>
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
                  <div className="font-medium text-sm">{t('payments.create.fixedAmount')}</div>
                  <div className="text-xs text-slate-500">{t('payments.create.sameAmountForAll')}</div>
                </button>
              </div>
            </div>

            {/* Room Selection (if room-based) */}
            {pricingStrategy === 'room' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    {t('payments.create.selectRooms')} ({selectedRooms.length} {t('payments.create.selected')})
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={selectAllOccupiedRooms}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                    >
                      {t('payments.create.occupiedOnly')}
                    </button>
                    <button
                      type="button"
                      onClick={selectAllRooms}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      {t('payments.create.selectAll')}
                    </button>
                    {selectedRooms.length > 0 && (
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="text-xs text-slate-500 hover:text-slate-700 font-medium px-2 py-1 rounded hover:bg-slate-50 transition-colors"
                      >
                        {t('payments.create.clear')}
                      </button>
                    )}
                  </div>
                </div>
                <div className="border border-slate-200 rounded-lg max-h-48 overflow-y-auto">
                  {loadingRooms ? (
                    <div className="p-4 text-center text-slate-500">{t('payments.create.loadingRooms')}</div>
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
                    <div className="p-4 text-center text-slate-500">{t('payments.create.noRooms')}</div>
                  )}
                </div>
              </div>
            )}

            {/* Fixed Amount Input */}
            {pricingStrategy === 'fixed' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t('payments.create.baseAmount')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.baseAmount || ''}
                  onChange={(e) => setFormData({ ...formData, baseAmount: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t('payments.create.enterAmount')}
                  required
                />
              </div>
            )}

            {/* Payment Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t('payments.create.paymentType')}
              </label>
              <select
                value={formData.paymentType}
                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value as PaymentType })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {Object.values(PaymentType).map(type => (
                  <option key={type} value={type}>{t(`payments.types.${type}`)}</option>
                ))}
              </select>
            </div>

            {/* Daily Rent Period */}
            {formData.paymentType === PaymentType.DAILY_RENT && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t('payments.create.period')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.periodInDays || ''}
                  onChange={(e) => setFormData({ ...formData, periodInDays: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t('payments.create.numberOfDays')}
                  required
                />
              </div>
            )}

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t('payments.create.paymentMethod')}
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {Object.values(PaymentMethod).map(method => (
                  <option key={method} value={method}>{t(`payments.methods.${method}`)}</option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                {t('payments.create.dueDate')}
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                min={minDate}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                {t('payments.create.descriptionOptional')}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
                placeholder={t('payments.create.descriptionPlaceholder')}
              />
            </div>

            {/* Summary */}
            {pricingStrategy === 'room' && selectedRooms.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-900 mb-2">{t('payments.create.summary')}</div>
                <div className="text-sm text-blue-700">
                  {t('payments.create.summaryText')} <strong>{selectedRooms.length} {t('payments.create.roomsSelected')}</strong>.
                  {t('payments.create.summaryDetail')}
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
              {t('payments.create.cancel')}
            </button>
            <button
              type="submit"
              disabled={creatingBulkPayments || (pricingStrategy === 'room' && selectedRooms.length === 0)}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {creatingBulkPayments ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  {t('payments.create.creating')}
                </span>
              ) : (
                t('payments.create.createBulkPayments')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
