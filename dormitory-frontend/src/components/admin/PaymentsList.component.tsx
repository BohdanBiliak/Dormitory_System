'use client'

import {useEffect, useState} from "react";
import {HandCoins, Search} from "lucide-react";
import {useGetPayments} from "@/hooks/payment.hook";
import {Payment} from "@/types/payments.types";
import IntroducePaymentComponentDialog from "@/components/dialogs/admin/IntroducePayment.componentDialog";
import {useUserProfile} from "@/hooks/userList.hook";

export function PaymentsListPage(){

    const[payments, setPayments] = useState<Payment[]>([]);
    const[searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [searchStatus, setSearchStatus] = useState('');
    const limit = 10;

    const {data: paymentsList, isLoading: loadingPayments, error: paymentsError}  = useGetPayments({
        status: searchStatus,
        offset: (page-1)*limit,
        limit: limit,
    })

    useEffect(() => {
        console.log("HUH", searchStatus);
        if(paymentsList){
            setPayments(paymentsList);
        }
    }, [paymentsList]);

    //Introduce payment dialog
    const [showCreateDialog, setShowCreateDialog] = useState(false);


    return (
        <div className={`flex-col border border-gray-600 w-full`}>

            {/*Header*/}
            <div className={`py-2 w-full border border-blue-600 drop-shadow`}>
                <h1 className={`align-middle text-center`}>Payments</h1>
            </div>

            {/*Filters*/}
            <div className={`bg-gray-400 w-full py-4 flex flex-row`}>
                <div className={`flex flex-row grow px-10`}>
                    <input
                        type={`text`}
                        placeholder={`Search`}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={`grow`}
                    />
                    <Search className={`w-5 h-5 mx-4`}/>
                </div>
                <div className={`bg-gray-200 border border-black flex flex-row`}>
                    <div className={`px-2`}>
                        <p>Status:</p>
                    </div>
                    <select
                        value={searchStatus}
                        onChange={(e) => setSearchStatus(e.target.value)}
                    >
                        <option value={""}>All</option>
                        <option value={"PAID"}>Paid</option>
                        <option value={"UNPAID"}>Unpaid</option>
                        <option value={"PENDING"}>Pending</option>
                    </select>
                </div>
            </div>

            {/*Body*/}
            <div className={`w-full flex flex-col space-3-4 py-3`}>
                {payments.length>0 && (
                    payments.map(((payment, index) => (
                        <div key={index} className={`flex flex-row w-full items-stretch space-x-4 border-gray-500 border`}>
                            <div className={`flex-1`}>
                                {payment.status}
                            </div>
                            <div className={`flex-1`}>
                                {payment.user.displayName}
                            </div>
                            <div className={`flex-1`}>
                                {payment.user.secondName}
                            </div>
                            <div className={`flex-1`}>
                                {payment.dueDate.substring(0, payment.dueDate.indexOf("T"))}
                            </div>
                        </div>
                    ))
                ))}
            </div>
            {/*Buttons*/}
            <div>
                <button onClick={()=>setShowCreateDialog(true)}>
                    <div className={`flex flex-row bg-blue-600 border border-black text-white align-middle px-3 py-2 space-x-2`}>
                        <HandCoins className={`h-6 w-6 align-middle`}/>
                        <div className={`text-wrap`}>
                            Create New Payment
                        </div>
                    </div>
                </button>
            </div>

            <IntroducePaymentComponentDialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} />
        </div>
    )
}