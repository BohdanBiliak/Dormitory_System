import {MenuItem} from "@/types/ui.types";
import {SideMenu} from "@/components/ui/SideMenu.component";
import {SignedInProfile} from "@/components/signedIn/Profile.component";

export default function Profile() {
    const menuItems:MenuItem[] = [
        {
            id: 'profile',
            image: '/user.svg',
            label: 'My profile',
            href: '/profile'
        },
        {
            id: 'dormitories',
            image: '/workplace.svg',
            label: 'Dormitories',
            href: '/dormitories',
        },
        {
            id: 'announcements',
            image: '/clipboard-text.svg',
            label: 'Announcements',
            href: '#',
        },
        {
            id: 'messages',
            image: 'envelope.svg',
            label: 'Messages',
            href: '#',
        },
        {
            id:'rooms',
            image: '/home.svg',
            label: 'Available rooms',
            href: '#',
        },
        {
            id:'notification',
            image: '/bell.svg',
            label: 'Notification',
            href: '#',
        },
        {
            id:'logout',
            image:'/sign-out.svg',
            label:'Logout',
        }
    ]
    return (
        <SideMenu menuItems={menuItems} activeItem={'profile'}>
            <SignedInProfile />
        </SideMenu>
    )
}