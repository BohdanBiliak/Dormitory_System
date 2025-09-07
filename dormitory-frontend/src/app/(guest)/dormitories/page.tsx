import { SideMenu } from "@/components/ui/SideMenu.component";
import { GuestDormitoriesPage } from '@/components/guest/GuestDormitoriesPage'
import { MenuItem } from "@/types/ui.types";
import { Suspense } from "react";

export default function DormitoriesPage() {
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
                <GuestDormitoriesPage/>
            </SideMenu>
        </Suspense>
    )
}