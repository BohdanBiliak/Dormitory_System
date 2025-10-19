'use client'

import {useParams} from "next/navigation";
import {RoomPage} from "@/components/admin/RoomPage.component";

export default function RoomDetailsPage({params}:{params:Promise<{id:string}>}){
    const {id} = useParams();
    return(
        <RoomPage roomId={id?.toString()!} />
    )
}