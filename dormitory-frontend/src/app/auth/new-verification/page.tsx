import { EmailVerificationForm } from '@/components/auth/EmailVerification.component'
import { AuthSidebar } from '@/components/auth/AuthSidebar.component'

export default function NewVerificationPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 max-w-md">
        <AuthSidebar activeItem="signin" />
      </div>
      <div className="flex-[2] flex items-center justify-center p-8 bg-gray-50">
        <EmailVerificationForm />
      </div>
    </div>
  )
}