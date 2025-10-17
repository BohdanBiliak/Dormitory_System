'use client'

import AdminAnnouncement from "@/components/admin/AdminAnnouncement.component";
import { use } from 'react';

/*Shows detailed view of announcement*/
export default function AdminAnnouncementDetailsPage({params}:{params:Promise<{id:string}>}) {
    const { id } = use(params);

    return(
        <AdminAnnouncement id={id}/>
    )
}