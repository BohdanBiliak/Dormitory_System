'use client'

import { TourProvider, useTour } from '@reactour/tour'
import { TutorialStep } from '../types/auth.tutorial.types'

const newPasswordSteps: TutorialStep[] = [
  {
    selector: '.new-password-header',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Password</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          You're here because you clicked a password reset link. Now you can create a new secure password for your account.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.password-input-section',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Password Requirements</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Create a strong password that's at least 6 characters long. Use a mix of letters, numbers, and symbols for better security.
        </p>
      </div>
    ),
    position: 'top',
  },
  {
    selector: '.new-password-input',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">New Password</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Enter your new password here. Make sure it's something you can remember but others can't guess.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.confirm-password-input',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Password</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Type the same password again to confirm. Both passwords must match exactly.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.update-password-button',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Update Password</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Click here to save your new password. You'll then be able to sign in with your new credentials.
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
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center gap-2 group"
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

interface NewPasswordTutorialProps {
  children: React.ReactNode
}

export function NewPasswordTutorial({ children }: NewPasswordTutorialProps) {
  return (
    <TourProvider
      steps={newPasswordSteps}
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