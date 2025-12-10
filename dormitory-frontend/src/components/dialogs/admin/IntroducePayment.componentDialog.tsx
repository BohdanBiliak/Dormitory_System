import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {PaymentMethod, PaymentPostData, PaymentType} from "@/types/payments.types";
import React, {useEffect, useState} from "react";
import {Receipt} from "lucide-react";
import {useUpdatePayments} from "@/hooks/payment.hook";
import {User} from "@/types/auth.types";
import {useUserListQuery} from "@/hooks/userList.hook";
import { useLanguage } from '@/providers/language.provider';

export interface IntroducePaymentProps {
    open: boolean;
    onClose: () => void;
}

export default function IntroducePaymentComponentDialog({open, onClose}: IntroducePaymentProps) {
    const { t } = useLanguage();
    const {createPayment} = useUpdatePayments();

    const {data: users, isLoading: loadingUsers, error: usersError} = useUserListQuery();
    const [minDate, setMinDate] = useState<string>('')

    // Set minimum date on client side only to prevent hydration mismatch
    useEffect(() => {
        setMinDate(new Date().toISOString().split('T')[0])
    }, [])

    useEffect(() => {
        if(users && users.data && users.data.length > 0) {
            setUserList(users.data)
        }
    }, [users]);
    const[userList, setUserList] = useState<User[]>([]);

    useEffect(() => {
        if(userList && userList.length > 0){
            setNewPayment(prevState => {
                if(!prevState) return prevState;
                return {
                    ...prevState,
                    userId: userList[0].id
                }
            })
        }
    }, [userList]);


    const[newPayment, setNewPayment] = useState<PaymentPostData>({
        userId: '',
        amount: 0,
        paymentType: PaymentType.MONTHLY_RENT,
        description: '',
        dueDate: '',
        paymentMethod: PaymentMethod.OTHER
    })

    //inputChanges
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setNewPayment(prevState => {
            if(!prevState) return prevState;
            return { ...prevState, [name]: value };
        })
    }

    //buttons
    const handleCancel = () => {
        setNewPayment(prevState => {
            if(!prevState) return prevState;
            return {
                userId: '',
                amount: 0,
                paymentType: PaymentType.MONTHLY_RENT,
                description: '',
                dueDate: '',
                paymentMethod: PaymentMethod.OTHER,
            };
            }
        )
        onClose()
    }

    const handleSubmit = () => {
        createPayment(newPayment);
    }

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm " />
            <div className="fixed inset-0 flex items-center justify-center p-1 sm:p-4">
                <DialogPanel className="w-full max-w-7xl max-h-[98vh] sm:max-h-[95vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full min-h-0 touch-pan-y">
                    <div className="flex flex-col h-full min-h-0">
                        {/*Dialog Header*/}
                        <div className="bg-blue-600 px-4 sm:px-6 py-4 sm:py-6 flex-shrink-0 create-dormitory-header">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full animate-in zoom-in-50 duration-300 delay-150">
                                        <Receipt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-lg sm:text-xl font-semibold text-white delay-200">
                                            {t('payments.introduce.title')}
                                        </DialogTitle>
                                        <Description className="text-blue-100 text-sm mt-1 delay-250">
                                            {t('payments.introduce.subtitle')}
                                        </Description>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                        {/*<button*/}
                                        {/*    onClick={() => setShowTutorial(true)}*/}
                                        {/*    className="flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white touch-target"*/}
                                        {/*    title={t("createDormitory.buttons.tutorial")}*/}
                                        {/*>*/}
                                        {/*    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                                        {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />*/}
                                        {/*    </svg>*/}
                                        {/*</button>*/}
                                        {/*<div className="hidden sm:block">*/}
                                        {/*    <LanguageSelector />*/}
                                        {/*</div>*/}
                                    <button
                                        onClick={onClose}
                                        className="flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white touch-target"
                                        aria-label="Close dialog"
                                    >
                                        <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*Dialog Body*/}
                        <div className="flex-1 overflow-y-auto min-h-0 p-6">
                            <div className="max-w-4xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    
                                    {/* Payment Information Card */}
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 animate-in fade-in-0 slide-in-from-left-4 duration-500">
                                        <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                                            <Receipt className="w-5 h-5 mr-2 text-blue-600" />
                                            {t('payments.introduce.paymentInformation')}
                                        </h3>
                                        
                                        <div className="space-y-6">
                                            {/* Description */}
                                            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-100">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    {t('payments.details.description')}
                                                </label>
                                                <input
                                                    name="description"
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    value={newPayment.description}
                                                    placeholder="Enter payment description..."
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm"
                                                />
                                            </div>

                                            {/* Amount */}
                                            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-150">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    {t('payments.introduce.amount')}
                                                </label>
                                                <input
                                                    name="amount"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    onChange={handleInputChange}
                                                    value={newPayment.amount}
                                                    placeholder="0.00"
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm"
                                                />
                                            </div>

                                            {/* Payment Type */}
                                            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-200">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    {t('payments.create.paymentType')}
                                                </label>
                                                <select
                                                    value={newPayment.paymentType}
                                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                        setNewPayment(prevState => {
                                                            if (!prevState) return prevState;
                                                            return { ...prevState, paymentType: e.target.value as PaymentType }
                                                        })
                                                    }}
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm bg-white"
                                                >
                                                    {Object.values(PaymentType).map(value => (
                                                        <option key={value} value={value}>
                                                            {t(`payments.types.${value}`)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Due Date */}
                                            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-250">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    {t('payments.create.dueDate')}
                                                </label>
                                                <input
                                                    name="dueDate"
                                                    type="date"
                                                    onChange={handleInputChange}
                                                    value={newPayment.dueDate}
                                                    min={minDate}
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payer and Method Information Card */}
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 animate-in fade-in-0 slide-in-from-right-4 duration-500 delay-100">
                                        <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                                            <Receipt className="w-5 h-5 mr-2 text-blue-600" />
                                            {t('payments.introduce.payerDetails')}
                                        </h3>
                                        
                                        <div className="space-y-6">
                                            {/* Payer Selection */}
                                            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-300">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    {t('payments.introduce.selectPayer')}
                                                </label>
                                                {loadingUsers ? (
                                                    <div className="flex items-center justify-center py-8">
                                                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                                                        <span className="ml-2 text-slate-600">{t('payments.introduce.loadingUsers')}</span>
                                                    </div>
                                                ) : (
                                                    <select
                                                        value={newPayment.userId}
                                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                            setNewPayment(prevState => {
                                                                if (!prevState) return prevState;
                                                                return { ...prevState, userId: e.target.value }
                                                            })
                                                        }}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm bg-white"
                                                    >
                                                        {userList.map((item) => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.displayName} {item.secondName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>

                                            {/* Payment Method */}
                                            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-350">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    {t('payments.create.paymentMethod')}
                                                </label>
                                                <select
                                                    value={newPayment.paymentMethod}
                                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                        setNewPayment(prevState => {
                                                            if (!prevState) return prevState;
                                                            return { ...prevState, paymentMethod: e.target.value as PaymentMethod }
                                                        })
                                                    }}
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm bg-white"
                                                >
                                                    {Object.values(PaymentMethod).map((item) => (
                                                        <option key={item} value={item}>
                                                            {t(`payments.methods.${item}`)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Payment Summary */}
                                            <div className="bg-white rounded-lg p-4 border border-slate-200 delay-400">
                                                <h4 className="text-sm font-medium text-slate-700 mb-3">{t('payments.introduce.paymentSummary')}</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">{t('payments.details.amount')}:</span>
                                                        <span className="font-medium">${newPayment.amount || '0.00'}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">{t('payments.introduce.type')}:</span>
                                                        <span className="font-medium">{t(`payments.types.${newPayment.paymentType}`)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">{t('payments.create.dueDate')}:</span>
                                                        <span className="font-medium">
                                                            {newPayment.dueDate ? new Date(newPayment.dueDate).toLocaleDateString() : t('payments.introduce.notSet')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-6 border-t border-slate-200 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-500">
                                    <button
                                        onClick={handleCancel}
                                        className="px-6 py-3 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2  hover:scale-105 transform"
                                    >
                                        {t('payments.introduce.cancel')}
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!newPayment.userId || !newPayment.amount || !newPayment.dueDate}
                                        className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  hover:scale-105 transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {t('payments.introduce.createPayment')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}