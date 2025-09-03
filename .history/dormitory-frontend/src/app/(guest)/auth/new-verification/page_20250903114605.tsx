import { EmailVerificationForm } from '@/components/auth/EmailVerification.component'
import {SideMenu} from "@/components/ui/SideMenu.component";
import {MenuItem} from "@/types/ui.types";

export default function NewVerificationPage() {
    const menuItems:MenuItem[] = [
        {
            id: 'dormitories',
            image: '/workplace.svg',
            label: 'Dormitories Information'
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

            <SideMenu menuItems={menuItems} activeItem={''}>
          <EmailVerificationForm />
      </SideMenu>
        </Suspense>
      
  )
}