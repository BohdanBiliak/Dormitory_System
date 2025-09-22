import { SideMenu } from "@/components/ui/SideMenu.component";
import { UsersDormitoryDetailsPageComponent } from '@/components/guest/UsersDormitoryDetailsPage.component'
import { MenuItem } from "@/types/ui.types";
import {Suspense, use} from "react";


export default function GuestDormitories({params}:{params:Promise<{ id: string }>}){
    const {id} = use(params);
    return (
        <UsersDormitoryDetailsPageComponent id={id} />
    )
}