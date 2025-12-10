'use client'

import {MenuItem} from "@/types/ui.types";
import {useAuth} from "@/hooks/auth.hook";
import React, {useMemo, useState} from "react";
import {useCurrentUserProfile} from "@/hooks/user.hook";
import Link from "next/link";
import {UserRole} from "@/types/auth.types";
import {useLanguage} from "@/providers/language.provider";
import {TranslationButton} from "./TranslationButton.component";

interface AdminSideMenuProps {
    children: React.ReactNode;
    /*activeItem: string;*/
}

export function AdminSideMenu ({children}:AdminSideMenuProps){
    const { logout, isLoggingOut } = useAuth()
    const { t } = useLanguage()
    const [openMenu, setOpenMenu] = useState<string>()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMenu = (menuKey: string) => {
        setOpenMenu(prev =>
            prev===menuKey ? '' : menuKey
        )
    }

    const handleLogout = () => {
        logout()
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const {data: user, isLoading, error} = useCurrentUserProfile()

    const getAdminMenuItems = ():MenuItem[] => [
        {
            id: 'profile',
            image: '/user.svg',
            label: t('sideMenu.myProfile'),
            href: '/admin/profile'
        },
        {
            id: 'dormitories',
            image: '/workplace.svg',
            label: t('sideMenu.dormitoryManagement'),
            subMenu: [
                {
                    id: 'dormsInfo',
                    label: t('sideMenu.information'),
                    image: '/clipboard-text.svg',
                    href: '/admin/dormitories'
                },
                {
                    id: 'rooms',
                    label: t('sideMenu.availableRooms'),
                    image: '/home.svg',
                    href: '/admin/rooms',
                },
                {
                    id: 'users',
                    label: t('sideMenu.userProfiles'),
                    image: '/users.svg',
                    href: '/admin/users',
                }
            ]
        },
        {
            id: 'operations',
            image: '/cash.svg',
            label: t('sideMenu.operations'),
            subMenu: [
                {
                    id:'confirmations',
                    label: t('sideMenu.confirmations'),
                    image:'/clipboard-check.svg',
                    href: '/admin/confirmations',
                },
                {
                    id:'payments',
                    label: t('sideMenu.payments'),
                    image: '/cash.svg',
                    href: '/admin/payments'
                },
                {
                    id:'maintenance',
                    label: t('sideMenu.maintenance'),
                    image: '/wrench.svg',
                    href: '/admin/maintenance'
                }
            ]
        },
        {
            id: 'communication',
            image: '/comments.svg',
            label: t('sideMenu.communication'),
            subMenu: [
                {
                    id: 'announcements',
                    label: t('sideMenu.announcements'),
                    image:'/comments.svg',
                    href: '/admin/announcements'
                },
                {
                    id: 'messaging',
                    label: t('sideMenu.messaging'),
                    image: '/envelope.svg',
                    href: '/admin/messaging'
                },
                {
                    id:'notifications',
                    label: t('sideMenu.notifications'),
                    image:'/bell.svg',
                    href: '/admin/notifications'
                }
            ]
        },
        {
            id:'logout',
            image:'/sign-out.svg',
            label: t('sideMenu.logout'),
        }
    ]

    const getGuestMenuItems = (): MenuItem[] => [
        {
            id: 'dormitories',
            image: '/workplace.svg',
            label: t('sideMenu.dormitoriesInformation'),
            href: "/dormitories",
        },
        {
            id: 'announcements',
            image: '/clipboard-check.svg',
            label: t('sideMenu.announcements'),
            href: "/announcements-public"
        },
        {
            id: 'rooms',
            image: '/home.svg',
            label: t('sideMenu.availableRooms'),
            href: '/rooms'
        },
        {
            id: 'signin',
            image: '/user.svg',
            label: t('sideMenu.signIn'),
            href: "/auth/login",
        }
    ]

    const currentMenuItems = useMemo(() => {
        if(user){
            switch (user.role){
                case UserRole.SuperAdmin: return getAdminMenuItems(); break;
                case UserRole.Admin: return getAdminMenuItems(); break;
                default: return getGuestMenuItems(); break;
            }
        }else{
            return getGuestMenuItems();
        }
    }, [user, t])

    return(
        <div className="min-h-screen bg-white flex flex-col md:flex-row">
            {/* Mobile Header with Burger Menu */}
                <div className="md:hidden bg-blue-900 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img
                        src="/icon.svg"
                        alt="Dormitory Logo"
                        className="w-8 h-8 filter brightness-0 invert"
                    />
                    <h1 className="text-lg font-bold">Dormitory System</h1>
                </div>
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 hover:bg-blue-800 rounded-md transition-colors"
                >
                    <div className="w-6 h-6 flex flex-col justify-center items-center">
                        <span className={`block w-5 h-0.5 bg-white transform transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`block w-5 h-0.5 bg-white mt-1 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-5 h-0.5 bg-white mt-1 transform transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </div>
                </button>
            </div>

            {/* Sidebar - Desktop & Mobile Overlay */}
            <div className={`
                fixed md:static inset-y-0 left-0 z-50 md:z-auto
                w-80 sm:w-96 md:w-1/3 md:max-w-sm 
                flex flex-col text-white transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                md:mt-0 ${isMobileMenuOpen ? 'mt-0' : ''}
            `} style={{ backgroundColor: '#013366' }}>

                {/* Desktop Header */}
                <div className="hidden md:flex items-center space-x-3 mb-4 p-6">
                    <div className="mr-6 lg:mr-10">
                        <img
                            src="/icon.svg"
                            alt="Dormitory Logo"
                            className="w-16 h-16 lg:w-24 lg:h-24 filter brightness-0 invert"
                        />
                    </div>
                    <h1 className="text-lg lg:text-xl font-bold">Dormitory System</h1>
                </div>

                {/* Mobile Header inside sidebar */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-blue-800">
                    <div className="flex items-center space-x-3">
                        <img
                            src="/icon.svg"
                            alt="Dormitory Logo"
                            className="w-10 h-10 filter brightness-0 invert"
                        />
                        <h1 className="text-lg font-bold">Dormitory System</h1>
                    </div>
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 hover:bg-blue-800 rounded-md"
                    >
                        ✕
                    </button>
                </div>

                <nav className="space-y-2 md:space-y-4 flex-1 p-4 md:px-0">
                    {currentMenuItems.map((item) => (
                        <div key={item.id} className="mb-2">
                            {item.subMenu? (
                                <>
                                    <button
                                        onClick={() => toggleMenu(item.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2 md:py-3 rounded text-left hover:bg-blue-800 transition-colors ${
                                            openMenu === item.id ? 'bg-blue-800' : ''
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img src={item.image} alt={item.label} className="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert"/>
                                            <span className="text-sm md:text-base">{item.label}</span>
                                        </div>

                                        <img src='/chevron-up.png' className={`w-6 h-6 md:w-8 md:h-8 transform transition-transform ${
                                            openMenu === item.id? 'rotate-180':''}`}
                                        />
                                    </button>

                                    {openMenu === item.id && (
                                        <div className="ml-4 md:ml-6 mt-1 space-y-1">
                                            {item.subMenu.map((subItem, index) => (
                                                <Link
                                                    key={index}
                                                    href={subItem.href || '#'}
                                                    className="block px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-blue-800 rounded transition-colors"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <img src={subItem.image} alt={subItem.label} className="w-6 h-6 md:w-8 md:h-8 filter brightness-0 invert"/>
                                                        {subItem.label}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ):(
                                (()=>{
                                    if(item.id==='logout'){
                                        return(
                                            <button
                                                onClick={() => {
                                                    handleLogout()
                                                    setIsMobileMenuOpen(false)
                                                }}
                                                disabled={isLoggingOut}
                                                className="flex items-center space-x-3 px-3 py-2 md:py-3 hover:text-red-100 hover:bg-red-900 rounded transition-colors w-full disabled:opacity-50"
                                            >
                                                <img src={item.image} alt={item.label} className="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert"/>
                                                <span className="text-sm md:text-base">{isLoggingOut ? t('sideMenu.loggingOut') : t('sideMenu.logout')}</span>
                                            </button>
                                        )
                                    }else return(
                                        <Link
                                            href={item.href || '#'}
                                            className={`flex items-center space-x-3 px-3 py-2 md:py-3 rounded hover:bg-blue-800 transition-colors`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <img src={item.image} alt={item.label} className="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert"/>
                                            <span className="text-sm md:text-base">{item.label}</span>
                                        </Link>
                                    )
                                })()
                            )}
                        </div>
                    ))}
                </nav>

                {/* Language Toggle */}
                <TranslationButton variant="side-menu" />
            </div>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    )
}