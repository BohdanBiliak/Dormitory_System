import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {Currencies, PaymentPostData, PaymentType} from "@/types/payments.types";
import React, {useState} from "react";
import {Receipt} from "lucide-react";
import {useUpdatePayments} from "@/hooks/payment.hook";

export interface IntroducePaymentProps {
    open: boolean;
    onClose: () => void;
}

export default function IntroducePaymentComponentDialog({open, onClose}: IntroducePaymentProps) {
    const {createPayment} = useUpdatePayments();

    const[newPayment, setNewPayment] = useState<PaymentPostData>({
        userId: '',
        amount: 0,
        currency: Currencies.USD,
        type: PaymentType.MONTHLY_RENT,
        description: '',
        dueDate: '',
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
                currency: Currencies.USD,
                type: PaymentType.MONTHLY_RENT,
                description: '',
                dueDate: '',
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
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" />
            <div className="fixed inset-0 flex items-center justify-center p-1 sm:p-4">
                <DialogPanel className="w-full max-w-7xl max-h-[98vh] sm:max-h-[95vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full min-h-0 touch-pan-y">
                    <div className="flex flex-col h-full min-h-0">
                        {/*Dialog Header*/}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-4 sm:py-6 flex-shrink-0 create-dormitory-header">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full animate-in zoom-in-50 duration-300 delay-150">
                                        <Receipt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-lg sm:text-xl font-semibold text-white animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-200">
                                            Introduce Payment
                                        </DialogTitle>
                                        <Description className="text-blue-100 text-sm mt-1 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-250">
                                            Here you can introduce new payments
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
                        <div className={`flex flex-col w-full`}>
                            {/*Main inputs*/}
                            <div className={`flex flex-row space-x-10 my-4 mx-6`}>

                                <div className={`flex flex-col bg-gray-300 h-full px-10 py-5 space-y-3`}>
                                    <div className={`text-2xl`}>
                                        Payment Info
                                    </div>
                                    <div className={`flex flex-row`}>
                                        <div className={`px-2`}>
                                            Description:
                                        </div>
                                        <div>
                                            <input
                                                name="description"
                                                type={'text'}
                                                onChange={handleInputChange}
                                                value={newPayment.description}
                                                placeholder={'Payment Description'}

                                            />
                                        </div>
                                    </div>
                                    <div className={`flex flex-row`}>
                                        <div className={`px-2`}>
                                            Amount:
                                        </div>
                                        <div className={`flex flex-row space-x-1`}>
                                            <input
                                                name="amount"
                                                type={'number'}
                                                onChange={handleInputChange}
                                                value={newPayment.description}
                                                placeholder={'Payment Description'}

                                            />
                                            <select
                                                value={newPayment.currency}
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setNewPayment(prevState => {
                                                    if(!prevState) return prevState;
                                                    return {...prevState, currency: e.target.value as Currencies}
                                                })}}
                                            >
                                                {Object.values(Currencies).map(value => (
                                                    <option key={value} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={`flex flex-row`}>
                                        <div className={`px-2`}>
                                            Type:
                                        </div>
                                        <div>
                                            <select
                                                value={newPayment.type}
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setNewPayment(prevState => {
                                                    if(!prevState) return prevState;
                                                    return {...prevState, type: e.target.value as PaymentType}
                                                })}}
                                            >
                                                {Object.values(PaymentType).map(value => (
                                                    <option key={value} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={`flex flex-row`}>
                                        <div className={`px-2`}>
                                            Due Date:
                                        </div>
                                        <div>
                                            <input
                                                name="dueDate"
                                                type={'date'}
                                                onChange={handleInputChange}
                                                value={newPayment.dueDate}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className={`flex flex-col bg-gray-500 h-full`}>

                                </div>
                            </div>


                            {/*Buttons*/}
                            <div className={`flex flex-row-reverse right-0 w-full px-10`}>
                                <button
                                    onClick={handleSubmit}
                                    className={`bg-blue-600 border border-white px-5 py-2 text-white`}
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className={`bg-gray-500 border border-black px-5 py-2`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}