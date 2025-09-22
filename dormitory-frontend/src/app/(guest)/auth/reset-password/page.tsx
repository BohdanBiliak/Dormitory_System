import { PasswordResetForm } from '@/components/auth/PasswordReset.component'
import {MenuItem} from "@/types/ui.types";
import {SideMenu} from "@/components/ui/SideMenu.component";

export default function PasswordRecoveryPage() {
    const menuItems:MenuItem[] = [
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
    <SideMenu menuItems={menuItems} activeItem={''}>
      <PasswordResetForm />
    </SideMenu>
  )
}