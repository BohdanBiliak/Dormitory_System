'use client'

import { AdminProfileForm } from '@/components/admin/AdminProfileForm.component'
import { SideMenu } from "@/components/ui/SideMenu.component";
import { MenuItem } from '@/types/ui.types';
//import { ProtectedRoute } from '@/app/lib/route/ProtectedRouteforAdmin'

export default function AdminProfilePage() {


  return (
    //<ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
          <AdminProfileForm />
    //</ProtectedRoute>
  )
}