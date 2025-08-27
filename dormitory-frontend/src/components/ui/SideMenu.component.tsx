'use client'

import {AuthSidebar} from "@/components/auth/AuthSidebar.component";
import {MenuItem} from "@/types/ui.types";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import { useAuth } from '@/hooks/auth.hook'

interface SideMenuProps {
    children: React.ReactNode;
    menuItems: MenuItem[];
    activeItem: string;
}


export function SideMenu ({children, menuItems, activeItem}:SideMenuProps){
    const { user, logout, isLoggingOut } = useAuth()
    const router = useRouter()
    const [openMenu, setOpenMenu] = useState<string>()

    const toggleMenu = (menuKey: string) => {
        setOpenMenu(prev =>
            prev===menuKey ? '' : menuKey
        )
    }

    const handleLogout = () => {
        logout()
    }
    return(
        <div className="min-h-screen bg-white flex">
            <div className="w-1/3 max-w-sm flex flex-col text-white" style={{ backgroundColor: '#013366' }}>
                <div className="flex items-center space-x-3 mb-4 p-6">
                    <div className="mr-10">
                        <img
                            src="/icon.svg"
                            alt="Dormitory Logo"
                            className="w-24 h-24 filter brightness-0 invert"
                        />
                    </div>
                    <h1 className="text-xl font-bold">Dormitory System</h1>
                </div>


                <nav className="space-y-4 flex-1">
                    {menuItems.map((item) => (
                        <div key={item.id} className="mb-2">
                            {item.subMenu? (
                                <>
                                    <button
                                        onClick={() => toggleMenu(item.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded text-left hover:bg-blue-800 transition-colors ${
                                            openMenu === item.id ? 'bg-blue-800' : ''
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img src={item.image} alt={item.label} className="w-10 h-10 filter brightness-0 invert"/>
                                            <span>{item.label}</span>
                                        </div>

                                        <img src='/chevron-up.png' className={`w-8 h-8 transform transition-transform ${
                                            openMenu === item.id? 'rotate-180':''}`}
                                        />
                                    </button>

                                    {openMenu === item.id && (
                                        <div className="ml-6 mt-1 space-y-1">
                                            {item.subMenu.map((subItem, index) => (
                                                <Link
                                                    key={index}
                                                    href={subItem.href || '#'}
                                                    className="block px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-blue-800 rounded transition-colors"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <img src={subItem.image} alt={subItem.label} className="w-8 h-8 filter brightness-0 invert"/>
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
                                                onClick={handleLogout}
                                                disabled={isLoggingOut}
                                                className="flex items-center space-x-3 px-3 py-2 hover:text-red-100 hover:bg-red-900 rounded transition-colors w-full disabled:opacity-50"
                                            >
                                                <img src={item.image} alt={item.label} className="w-10 h-10 filter brightness-0 invert"/>
                                                <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
                                            </button>
                                        )
                                    }else return(
                                        <Link href={item.href || '#'} className={`flex items-center space-x-3 px-3 py-2 rounded hover:bg-blue-800 transition-colors ${
                                            activeItem === item.id ? 'bg-blue-800 font-semibold' : ''}`}>
                                            <img src={item.image} alt={item.label} className="w-10 h-10 filter brightness-0 invert"/>
                                            <span>{item.label}</span>
                                        </Link>
                                    )
                                })()
                            )}
                        </div>
                    ))}
                </nav>

                {/* Language Toggle */}
                <div className="flex flex-row justify-center mb-20">
                    <button className="px-3 py-1 bg-white text-blue-900 text-sm font-medium">
                        Pol
                    </button>
                    <button className="px-3 py-1 text-white border border-white text-sm">
                        Eng
                    </button>
                </div>
            </div>
            <div className="flex-1 p-12 flex flex-col justify-center">
                <div className="mx-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}