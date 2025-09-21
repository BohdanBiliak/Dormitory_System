import { RegisterForm } from '@/components/auth/RegisterForm.component'
import {SideMenu} from "@/components/ui/SideMenu.component";
import {MenuItem} from "@/types/ui.types";

export default function RegisterPage() {
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
            href: "/announcements"
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
      <RegisterForm />
    </SideMenu>
  )
}