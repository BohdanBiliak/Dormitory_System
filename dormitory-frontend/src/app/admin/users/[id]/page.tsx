'use client'

import {SideMenu} from "@/components/ui/SideMenu.component";
import {MenuItem} from "@/types/ui.types";
import {UserProfileForm} from "@/components/admin/UserProfileForm.component";
import {useParams} from "next/navigation";

export default function UserProfile({params}:{params:Promise<{id:string}>}){
    const {id} = useParams();

    return(
        <UserProfileForm userId={id?.toString()!}/>
    )

}