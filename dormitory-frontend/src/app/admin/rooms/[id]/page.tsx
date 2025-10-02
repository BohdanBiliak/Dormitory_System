'use client'

import {MenuItem} from "@/types/ui.types";
import {useParams} from "next/navigation";
import {SideMenu} from "@/components/ui/SideMenu.component";
import {RoomPage} from "@/components/admin/RoomPage.component";

export default function RoomDetailsPage({params}:{params:Promise<{id:string}>}){
    const {id} = useParams();
    return(
        <RoomPage roomId={id?.toString()!} />
    )
}