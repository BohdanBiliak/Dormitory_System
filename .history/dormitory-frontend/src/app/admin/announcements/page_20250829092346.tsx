'use client'

import {MenuItem} from "@/types/ui.types";
import {SideMenu} from "@/components/ui/SideMenu.component";

export default function AnnouncementListPage(){
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
                    href: '/admin/announcements',
                },
                {
                    id:'messages',
                    label: 'Messages',
                    image:'/envelope.svg',
                    href: '#'
                }
            ]
        },
        // {
        //     id: 'users',
        //     image: '/users.svg',
        //     label: 'Users',
        //     subMenu: [
        //         {
        //             id:'',
        //             label: 'All Users',
        //             image:'',
        //             href: '/admin/users'
        //         },
        //         {
        //             id: '',
        //             label: 'Managers',
        //             image:'',
        //             href: '/admin/managers'
        //         },
        //         {
        //             id:'',
        //             label: 'Students', image:'',
        //             href: '/admin/students'
        //         }
        //     ]
        // },
        // {
        //     id: 'payments',
        //     image: '/cash.svg',
        //     label: 'Payments',
        //     subMenu: [
        //         {
        //             id:'',
        //             label: 'All Payments',
        //             image:'',
        //             href: '/admin/payments'
        //         },
        //         {
        //             id:'',
        //             label: 'Pending',
        //             image: '',
        //             href: '/admin/payments/pending'
        //         },
        //         {
        //             id:'',
        //             label: 'Overdue',
        //             image:'',
        //             href: '/admin/payments/overdue'
        //         }
        //     ]
        // },
        {
            id:'logout',
            image:'/sign-out.svg',
            label:'Logout',
        }
    ]
    return(
        <SideMenu menuItems={menuItems} activeItem={'announcements'}>
            <AnnouncementListPage />
        </SideMenu>
    )
}