import { NewPasswordForm } from '@/components/auth/NewPasswordForm.component'
import { AuthSidebar } from '@/components/auth/AuthSidebar.component'

export default function NewPasswordPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 max-w-md">
        <AuthSidebar activeItem="reset" />
      </div>
      <div className="flex-[2] flex items-center justify-center p-8 bg-gray-50">
        <NewPasswordForm />
      </div>
    </div>
  )
}