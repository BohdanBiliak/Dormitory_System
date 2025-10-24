import React, {Suspense} from "react";
import {UserSideMenu} from "@/components/ui/UserSideMenu.component";

export default function Layout({
    children
}: {
    children: React.ReactNode
}){
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserSideMenu>
                {children}
            </UserSideMenu>
        </Suspense>
    )
}