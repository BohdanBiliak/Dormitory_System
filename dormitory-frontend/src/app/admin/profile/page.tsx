'use client'

import { AdminLayout } from '@/components/admin/AdminLayout-component'
import { AdminProfileForm } from '@/components/admin/AdminProfileForm.components'
import {SideMenu} from "@/components/ui/SideMenu.component";
import { MenuItem } from '@/types/ui.types';
//import { ProtectedRoute } from '@/app/lib/route/ProtectedRouteforAdmin'

export default function AdminProfilePage() {

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
            label: 'Dormitories',
            subMenu: [
                {
                    id: '',
                    label: 'All Dormitories',
                    image: '',
                    href: '/admin/dormitories',
                },
                {
                    id: '',
                    label: 'Add Dormitory',
                    image: '',
                    href: '/admin/dormitories/create',
                },
                {
                    id:'',
                    label: 'Manage Rooms',
                    image:'',
                    href: '/admin/rooms',
                },
            ]
        },
        {
            id: 'communication',
            image: '/comments.svg',
            label: 'Communication',
            subMenu: [
                {
                    id: '',
                    label: 'Announcements',
                    image:'',
                    href: '/admin/announcements'
                },
                {
                    id:'',
                    label: 'Messages',
                    image:'',
                    href: '/admin/messages'
                },
                {
                    id:'',
                    label: 'Confirmations',
                    image:'',
                    href: '/admin/confirmations'
                },
                {
                    id:'',
                    label: 'Notifications',
                    image:'',
                    href: '/admin/notifications'
                }
            ]
        },
        {
            id: 'users',
            image: '/users.svg',
            label: 'Users',
            subMenu: [
                {
                    id:'',
                    label: 'All Users',
                    image:'',
                    href: '/admin/users'
                },
                {
                    id: '',
                    label: 'Managers',
                    image:'',
                    href: '/admin/managers'
                },
                {
                    id:'',
                    label: 'Students', image:'',
                    href: '/admin/students'
                }
            ]
        },
        {
            id: 'payments',
            image: '/cash.svg',
            label: 'Payments',
            subMenu: [
                {
                    id:'',
                    label: 'All Payments',
                    image:'',
                    href: '/admin/payments'
                },
                {
                    id:'',
                    label: 'Pending',
                    image: '',
                    href: '/admin/payments/pending'
                },
                {
                    id:'',
                    label: 'Overdue',
                    image:'',
                    href: '/admin/payments/overdue'
                }
            ]
        },{
            id:'logout',
            image:'/sign-out.svg',
            label:'Logout',
        }
    ]
  return (
    //<ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
      <SideMenu menuItems={menuItems} activeItem={'profile'}>
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Admin Profile
          </h1>
          <AdminProfileForm />
        </div>
      </SideMenu>
    //</ProtectedRoute>
  )
}