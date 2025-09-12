import { SideMenu } from "@/components/ui/SideMenu.component";
import { UsersDormitoryDetailsPageComponent } from '@/components/guest/UsersDormitoryDetailsPage.component'
import { MenuItem } from "@/types/ui.types";
import {Suspense, use} from "react";


export default function GuestDormitories({params}:{params:Promise<{ id: string }>}){
    const {id} = use(params);
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
            label: 'Announcements',
            href: '/announcements-public',
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
                <UsersDormitoryDetailsPageComponent id={id} />
            </SideMenu>
        </Suspense>
    )
}