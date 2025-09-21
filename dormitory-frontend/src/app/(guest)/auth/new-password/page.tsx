import { NewPasswordForm } from '@/components/auth/NewPasswordForm.component'
import { MenuItem } from "@/types/ui.types";
import { SideMenu } from "@/components/ui/SideMenu.component";
import { Suspense } from "react";
export default function NewPasswordPage() {
    const menuItems: MenuItem[] = [
        {
            id: 'dormitories',
            image: '/workplace.svg',
            label: 'Dormitories Information',
            href: "/dormitories"
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
              <SideMenu menuItems={menuItems} activeItem={''}>
            <NewPasswordForm />
        </SideMenu>
        </Suspense>



    )
}