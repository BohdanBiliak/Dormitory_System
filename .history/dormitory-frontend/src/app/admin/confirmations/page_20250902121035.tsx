'use client'

import { ConfirmationsTable } from '@/components/admin/ConfirmationsTable.component'
import {SideMenu} from "@/components/ui/SideMenu.component";
import {MenuItem} from "@/types/ui.types";
//import { ProtectedRoute } from '@/app/lib/route/ProtectedRouteforAdmin'

export default function ConfirmationsPage() {
    const menuItems:MenuItem[] = [
        {
            id: 'profile',
            image: '/user.svg',
            label: 'My profile',
            href: '/admin/profile'
        },
        {
            id: 'dormitories',
            image: '/workplace.svg',
            label: 'Dormitory management',
            subMenu: [
                {
                    id: 'dormsInfo',
                    label: 'Information',
                    image: '/clipboard-text.svg',
                    href: '/admin/dormitories'
                },
                {
                    id: 'rooms',
                    label: 'Available rooms',
                    image: '/home.svg',
                    href: '#',
                },
                {
                    id: 'users',
                    label: 'User profiles',
                    image: '/users.svg',
                    href: '/admin/users',
                },
                {
                    id:'confirmations',
                    label: 'Confirmations',
                    image:'/clipboard-check.svg',
                    href: '#',
                },
                {
                    id:'payments',
                    label: 'Payments',
                    image: '/cash.svg',
                    href: '#'
                }
            ]
        },
        {
            id: 'communication',
            image: '/comments.svg',
            label: 'Communication',
            subMenu: [
                {
                    id: 'announcements',
                    label: 'Announcements',
                    image:'/comments.svg',
                    href: '/admin/announcements'
                },
                {
                    id:'messages',
                    label: 'Messages',
                    image:'/envelope.svg',
                    href: '#'
                }
            ]
        },
        {
            id:'logout',
            image:'/sign-out.svg',
            label:'Logout',
        }
    ]
    return (
   // <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
      <SideMenu menuItems={menuItems} activeItem={''}>
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Confirmations
          </h1>
          <ConfirmationsTable />
        </div>
      </SideMenu>
    //</ProtectedRoute>
  )
}
