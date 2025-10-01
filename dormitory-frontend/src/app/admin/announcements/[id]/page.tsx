'use client'

import {MenuItem} from "@/types/ui.types";
import {SideMenu} from "@/components/ui/SideMenu.component";
import AdminAnnouncement from "@/components/admin/AdminAnnouncement.component";
import { use } from 'react';

/*Shows detailed view of announcement*/
export default function AdminAnnouncementDetailsPage({params}:{params:Promise<{id:string}>}) {
    const { id } = use(params);

    return(
        <AdminAnnouncement id={id}/>
    )
}