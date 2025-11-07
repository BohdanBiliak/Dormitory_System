'use client'

import { TourProvider, useTour, StepType } from '@reactour/tour'
import { useState } from 'react'

const registerFormSteps: StepType[] = [
  {
    selector: '.register-form-header',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Registration!</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          This is the registration form where you can create your dormitory account. 
          Let's walk through the process step by step.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.personal-info-section',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Start by filling in your personal information. Both first name and last name are required fields.
        </p>
      </div>
    ),
    position: 'top',
  },
  {
    selector: '.first-name-input',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">First Name</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Enter your first name here. This field is required and will be used in your profile.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.last-name-input',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Last Name</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Enter your last name here. This field is also required for your profile.
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
          Provide a valid email address. This will be used for login, notifications, and account recovery.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.security-section',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Create a secure password for your account. Make sure it's at least 6 characters long and memorable.
        </p>
      </div>
    ),
    position: 'top',
  },
  {
    selector: '.password-input',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Password</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Enter your password here. Choose something secure but memorable. Minimum 6 characters required.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.password-confirm-input',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Password</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Confirm your password by typing it again. Both passwords must match exactly.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.document-upload-section',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Upload</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Upload your documents for verification. Student ID front is required, while profile picture and ID back are optional.
        </p>
      </div>
    ),
    position: 'top',
  },
  {
    selector: '.avatar-upload',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Upload a profile picture (optional). This will be displayed on your profile and help others recognize you.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.student-id-front-upload',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Student ID (Front)</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Upload the front of your student ID. This is required for verification and dormitory assignment.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.student-id-back-upload',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Student ID (Back)</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Upload the back of your student ID if needed (optional). Some verification processes may require this.
        </p>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.submit-button',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Registration</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Once all required fields are filled correctly, click here to create your account and join the dormitory system!
        </p>
      </div>
    ),
    position: 'top',
  },
  {
    selector: '.login-link',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Already Registered?</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          If you already have an account, click here to go to the login page instead.
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

interface RegisterFormTutorialProps {
  children: React.ReactNode
}

export function RegisterFormTutorial({ children }: RegisterFormTutorialProps) {
  return (
    <TourProvider
      steps={registerFormSteps}
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