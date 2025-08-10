import { AuthLayout } from '@/app/layouts/auth.layout'
import { PasswordResetForm } from '@/components/auth/PasswordReset.component'

export default function PasswordRecoveryPage() {
  return (
    <AuthLayout activeItem="reset">
      <PasswordResetForm />
    </AuthLayout>
  )
}