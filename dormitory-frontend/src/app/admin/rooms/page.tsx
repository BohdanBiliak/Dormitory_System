'use client'

import {MenuItem} from "@/types/ui.types";
import {useParams} from "next/navigation";
import {SideMenu} from "@/components/ui/SideMenu.component";
import AllRoomsPage from "@/components/admin/AdminAllRooms.component";
export default function RoomDetailsPage(){

    return(
        <AllRoomsPage />
    )
}