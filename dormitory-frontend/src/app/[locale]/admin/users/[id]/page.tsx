'use client'

import {UserProfileForm} from "@/components/admin/UserProfileForm.component";
import {useParams} from "next/navigation";

export default function UserProfile({params}:{params:Promise<{id:string}>}){
    const {id} = useParams();

    return(
        <UserProfileForm userId={id?.toString()!}/>
    )

}