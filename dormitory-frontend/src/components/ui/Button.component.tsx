import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/app/lib/utils/cn.util'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    isLoading, 
    fullWidth,
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center rounded-md font-medium 
      transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-blue-500 focus-visible:ring-offset-2 
      disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-95 transform hover:shadow-lg
    `
    
    const variants = {
      default: `
        bg-blue-900 text-white hover:bg-blue-800 
        shadow-md hover:shadow-xl border border-blue-900
      `,
      outline: `
        border border-gray-300 bg-transparent text-gray-700 
        hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md
      `,
      ghost: `
        text-gray-700 hover:bg-gray-100 hover:text-gray-900
      `,
      destructive: `
        bg-red-600 text-white hover:bg-red-700 
        shadow-md hover:shadow-xl border border-red-600
      `
    }
    
    const sizes = {
      xs: 'h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm',
      sm: 'h-8 px-3 text-sm sm:h-9 sm:px-4 sm:text-base',
      md: 'h-9 px-4 text-sm sm:h-10 sm:px-5 sm:text-base lg:h-11 lg:px-6',
      lg: 'h-10 px-5 text-base sm:h-11 sm:px-6 lg:h-12 lg:px-8 lg:text-lg',
      xl: 'h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg lg:h-16 lg:px-10 lg:text-xl'
    }

    const widthClass = fullWidth ? 'w-full' : ''

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], widthClass, className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }