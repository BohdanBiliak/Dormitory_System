import { AuthSidebar } from '../../components/auth/AuthSidebar.component'

interface AuthLayoutProps {
  children: React.ReactNode
  activeItem?: 'signin' | 'signup' | 'reset'
}

export function AuthLayout({ children, activeItem }: AuthLayoutProps) {
  //background + side menu
  return (
    <div className="min-h-screen bg-white flex">
      <AuthSidebar activeItem={activeItem} />
      <div className="flex-1 p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  )
}