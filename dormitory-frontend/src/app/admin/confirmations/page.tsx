'use client'

import { ConfirmationsTable } from '@/components/admin/ConfirmationsTable.component'
import {SideMenu} from "@/components/ui/SideMenu.component";
import {MenuItem} from "@/types/ui.types";
//import { ProtectedRoute } from '@/app/lib/route/ProtectedRouteforAdmin'

export default function ConfirmationsPage() {

    return (
   // <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
          <ConfirmationsTable />
    //</ProtectedRoute>
  )
}
