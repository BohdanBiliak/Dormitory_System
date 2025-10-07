'use client'

import { ConfirmationsTable } from '@/components/admin/ConfirmationsTable.component'
//import { ProtectedRoute } from '@/app/lib/route/ProtectedRouteforAdmin'

export default function ConfirmationsPage() {

    return (
   // <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
          <ConfirmationsTable />
    //</ProtectedRoute>
  )
}
