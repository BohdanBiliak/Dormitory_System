import { AuthLayout } from '@/app/layouts/auth.layout'
import { LoginForm } from '@/components/auth/LoginForm.component'

export default function LoginPage() {
  return (
    <AuthLayout activeItem="signin">
      <LoginForm />
    </AuthLayout>
  )
}