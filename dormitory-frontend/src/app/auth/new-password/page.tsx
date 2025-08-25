import { NewPasswordForm } from '@/components/auth/NewPasswordForm.component'
import { AuthSidebar } from '@/components/auth/AuthSidebar.component'
import {AuthLayout} from "@/app/layouts/auth.layout";

export default function NewPasswordPage() {
  return (
    <AuthLayout activeItem="signin">
        <NewPasswordForm />
    </AuthLayout>
  )
}