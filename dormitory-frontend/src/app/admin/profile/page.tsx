'use client'

import { AdminLayout } from '@/components/admin/AdminLayout-component'
import { AdminProfileForm } from '@/components/admin/AdminProfileForm.components'
//import { ProtectedRoute } from '@/app/lib/route/ProtectedRouteforAdmin'

export default function AdminProfilePage() {
  return (
    //<ProtectedRoute requiredRole={['Admin', 'SuperAdmin']}>
      <AdminLayout activeItem="profile">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Admin Profile
          </h1>
          <AdminProfileForm />
        </div>
      </AdminLayout>
    //</ProtectedRoute>
  )
}