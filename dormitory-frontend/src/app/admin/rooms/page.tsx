'use client'

import {MenuItem} from "@/types/ui.types";
import {useParams} from "next/navigation";
import {SideMenu} from "@/components/ui/SideMenu.component";
import {AllRoomsPage} from "@/components/admin/AdminAllRooms.component";
export default function RoomDetailsPage({params}:{params:Promise<{id:string}>}){
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
                    href: '#'
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

    const {id} = useParams();

    return(
        <SideMenu menuItems={menuItems} activeItem={''}>
            <AllRoomsPage />
        </SideMenu>
    )
}