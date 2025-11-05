import React, { Suspense } from "react";
import { AdminSideMenu } from "@/components/ui/AdminSideMenu.component";

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminSideMenu>
                {children}
            </AdminSideMenu>
        </Suspense>
    )
}