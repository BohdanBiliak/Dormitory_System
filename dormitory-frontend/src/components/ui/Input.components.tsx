import { InputHTMLAttributes, forwardRef, memo, useMemo } from 'react'
import { cn } from '@/app/lib/utils/cn.util'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  helperText?: string
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, helperText, ...props }, ref) => {
    const baseInputClasses = useMemo(() => `
      flex h-9 sm:h-10 lg:h-11 w-full rounded-md border border-gray-300 
      bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base 
      ring-offset-white file:border-0 file:bg-transparent 
      file:text-sm file:font-medium file:mr-4 file:py-2 file:px-4 
      file:rounded-md file:bg-blue-50 file:text-blue-700 
      hover:file:bg-blue-100 placeholder:text-gray-500 
      focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-blue-500 focus-visible:ring-offset-2 
      focus-visible:border-transparent disabled:cursor-not-allowed 
      disabled:opacity-50 disabled:bg-gray-50 
      hover:border-gray-400
    `, [])

    const computedInputClasses = useMemo(() => cn(
      baseInputClasses,
      icon && 'pl-9 sm:pl-10',
      error && 'border-red-500 focus-visible:ring-red-500 bg-red-50',
      className
    ), [baseInputClasses, icon, error, className])

    const errorIcon = useMemo(() => (
      <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ), [])

    return (
      <div className="space-y-1 sm:space-y-2">
        {label && (
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400">
                {icon}
              </div>
            </div>
          )}
          
          <input
            type={type}
            className={computedInputClasses}
            ref={ref}
            {...props}
          />
        </div>
        
        {helperText && !error && (
          <p className="text-xs sm:text-sm text-gray-500">{helperText}</p>
        )}
        
        {error && (
          <p className="text-xs sm:text-sm text-red-600 flex items-center">
            {errorIcon}
            {error}
          </p>
        )}
      </div>
    )
  }
)

InputComponent.displayName = 'Input'

const Input = memo(InputComponent)

export { Input }