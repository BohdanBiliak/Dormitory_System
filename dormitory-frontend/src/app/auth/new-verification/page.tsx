import { EmailVerificationForm } from '@/components/auth/EmailVerification.component'
import { AuthSidebar } from '@/components/auth/AuthSidebar.component'
import {AuthLayout} from "@/app/layouts/auth.layout";

export default function NewVerificationPage() {
  return (
      <AuthLayout activeItem="signin">
          <EmailVerificationForm />
      </AuthLayout>
  )
}