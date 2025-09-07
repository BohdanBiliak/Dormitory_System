import { SideMenu } from "@/components/ui/SideMenu.component";
import { GuestDormitoryDetailsPage } from '@/components/guest/GuestDormitoryDetailsPage'
import { MenuItem } from "@/types/ui.types";
import { Suspense } from "react";

interface PageProps {
    params: { id: string }
}

export default function DormitoryDetailsPage({ params }: PageProps) {
    const menuItems: MenuItem[] = [
        {
            id: 'dormitories',
            image: '/workplace.svg',
            label: 'Dormitories Information',
            href: "/dormitories",
        },
        {
            id: 'announcements',
            image: '/clipboard-check.svg',
            label: 'Announcements'
        },
        {
            id: 'rooms',
            image: '/home.svg',
            label: 'Available rooms'
        },
        {
            id: 'signin',
            image: '/user.svg',
            label: 'Sign in',
            href: "/auth/login",
        }
    ]

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SideMenu menuItems={menuItems} activeItem={'dormitories'}>
                <GuestDormitoryDetailsPage params={params} />
            </SideMenu>
        </Suspense>
    )
}