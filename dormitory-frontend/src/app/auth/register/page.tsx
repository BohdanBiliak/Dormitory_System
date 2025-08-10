import { AuthLayout } from '@/app/layouts/auth.layout'
import { RegisterForm } from '@/components/auth/RegisterForm.component'

export default function RegisterPage() {
  return (
    <AuthLayout activeItem="signup">
      <RegisterForm />
    </AuthLayout>
  )
}