'use client'

import {MenuItem} from "@/types/ui.types";
import {SideMenu} from "@/components/ui/SideMenu.component";
import {AdminDormitoriesList} from "@/components/admin/AdminDormitories.component";

export default  function DormitoryPage(){
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
        <SideMenu menuItems={menuItems} activeItem='dormsInfo'>
            <AdminDormitoriesList />
        </SideMenu>
    )
}