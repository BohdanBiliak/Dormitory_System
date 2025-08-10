'use client'

import { AdminLayout } from '@/components/admin/AdminLayout-component'
import { ConfirmationsTable } from '@/components/admin/ConfirmationsTable.component'
import { ProtectedRoute } from '@/app/lib/route/ProtectedRouteforAdmin'

export default function ConfirmationsPage() {
  return (
    <ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
      <AdminLayout activeItem="confirmations">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Confirmations
          </h1>
          <ConfirmationsTable />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
