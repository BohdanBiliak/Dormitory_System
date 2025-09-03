import { Suspense } from 'react';
import { NewPasswordForm } from '@/components/auth/NewPasswordForm.component';
import { SideMenu } from '@/components/ui/SideMenu.component';
import { MenuItem } from '@/types/ui.types';

function LoadingSpinner() {
    return <div className="flex justify-center items-center p-8">Loading...</div>;
}

export default function NewPasswordPage() {
    const menuItems: MenuItem[] = [
        {
            id: 'dormitories',
            image: '/workplace.svg',
            label: 'Dormitories Information',
        },
        {
            id: 'announcements',
            image: '/clipboard-check.svg',
            label: 'Announcements',
        },
        {
            id: 'rooms',
            image: '/home.svg',
            label: 'Available rooms',
        },
        {
            id: 'signin',
            image: '/user.svg',
            label: 'Sign in',
            href: '/auth/login',
        },
    ];

    return (
        <SideMenu menuItems={menuItems} activeItem={'signin'}>
            <Suspense fallback={<LoadingSpinner />}>
                <NewPasswordForm />
            </Suspense>
        </SideMenu>
    );
}