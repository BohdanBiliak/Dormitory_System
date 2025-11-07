'use client'

import { TourProvider, useTour } from '@reactour/tour'
import { TutorialStep } from '../types/auth.tutorial.types'

const loginSteps: TutorialStep[] = [
  {
    selector: '.login-form-header',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome Back!</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Sign in to access your dormitory account and manage your profile, bookings, and more.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.email-input',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Address</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Enter the email address you used when registering your account.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.password-input',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Password</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Enter your password. Use the eye icon to toggle visibility if needed.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.forgot-password-link',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Forgot Password?</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Can't remember your password? Click here to reset it via email.
        </p>
      </div>
    ),
    position: 'top',
  },
  {
    selector: '.login-submit-button',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign In</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Click here to sign in to your account after entering your credentials.
        </p>
      </div>
    ),
    position: 'top',
  },
]

function TutorialButton() {
  const { setIsOpen } = useTour()

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl  z-50 flex items-center gap-2 group"
      aria-label="Start tutorial"
    >
      <svg 
        className="w-5 h-5 group-hover:scale-110 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span className="font-medium">Help</span>
    </button>
  )
}

interface LoginTutorialProps {
  children: React.ReactNode
}

export function LoginTutorial({ children }: LoginTutorialProps) {
  return (
    <TourProvider
      steps={loginSteps}
      className="bg-white rounded-lg shadow-xl border border-gray-200"
      maskClassName="bg-black bg-opacity-50"
      disableKeyboardNavigation={false}
      disableInteraction={false}
      padding={10}
      inViewThreshold={0}
      scrollSmooth={true}
      styles={{
        popover: (base) => ({
          ...base,
          '--reactour-accent': '#1e40af',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '400px',
        }),
        maskArea: (base) => ({
          ...base,
          rx: 8,
        }),
        badge: (base) => ({
          ...base,
          left: 'auto',
          right: '12px',
          backgroundColor: '#1e40af',
          fontSize: '12px',
          fontWeight: '600',
        }),
        controls: (base) => ({
          ...base,
          marginTop: '16px',
          padding: '0 16px 16px',
        }),
        close: (base) => ({
          ...base,
          right: '12px',
          top: '12px',
          width: '24px',
          height: '24px',
          color: '#6b7280',
          '&:hover': {
            color: '#374151',
          },
        }),
      }}
      components={{
        Navigation: ({ currentStep, steps, setCurrentStep, setIsOpen }) => (
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(Math.max(currentStep - 1, 0))}
                disabled={currentStep === 0}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (currentStep < steps.length - 1) {
                    setCurrentStep(currentStep + 1)
                  } else {
                    setIsOpen(false)
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
              </button>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip Tutorial
            </button>
          </div>
        ),
      }}
    >
      {children}
      <TutorialButton />
    </TourProvider>
  )
}