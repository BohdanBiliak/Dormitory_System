import {MenuItem} from "@/types/ui.types";
import {SideMenu} from "@/components/ui/SideMenu.component";
import {UserPublicAnnouncements} from "@/components/guest/UserPublicAnnouncements.component";

export default function PublicAnnouncements(){
    const menuItems: MenuItem[] = [
        {
            id: 'dormitories',
            image: '/workplace.svg',
            label: 'Dormitories Information',
            href: "/dormitories",
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
    return(
        <SideMenu menuItems={menuItems} activeItem={'announcements'}>
            <UserPublicAnnouncements/>
        </SideMenu>
    )
}