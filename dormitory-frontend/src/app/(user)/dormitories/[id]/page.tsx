import { UsersDormitoryDetailsPageComponent } from '@/components/guest/UsersDormitoryDetailsPage.component'
import {Suspense, use} from "react";


export default function GuestDormitories({params}:{params:Promise<{ id: string }>}){
    const {id} = use(params);
    return (
        <UsersDormitoryDetailsPageComponent id={id} />
    )
}