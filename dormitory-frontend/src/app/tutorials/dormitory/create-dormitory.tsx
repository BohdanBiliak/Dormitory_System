'use client'

import React, { useState } from 'react'
import { TourProvider, useTour } from '@reactour/tour'
import { DormitoryTutorialStep } from '../types/dormitory.tutorial.types'

const createDormitorySteps: DormitoryTutorialStep[] = [
  {
    selector: '.create-dormitory-header',
    content: (
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-semibold text-sm">1</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Welcome to Dialog Creation</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          This professional dialog allows you to create a new dormitory with detailed information and room configurations.
        </p>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-blue-800 text-xs font-medium">💡 Tip: You can scroll within this dialog and use navigation tabs</p>
        </div>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.dormitory-navigation',
    content: (
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-semibold text-sm">2</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Interactive Navigation</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Use these responsive tabs to navigate between sections. On mobile, tab names are shortened for better usability.
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <strong>Arrow Buttons:</strong> Previous/Next navigation
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <strong>Tab Buttons:</strong> Direct section access
          </div>
        </div>
      </div>
    ),
    position: 'bottom',
    action: (elem) => {
      // Add interactive highlight
      if (elem && elem instanceof HTMLElement) {
        elem.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
        setTimeout(() => {
          elem.style.boxShadow = '';
        }, 2000);
      }
    }
  },
  {
    selector: '.dormitory-name-field',
    content: (
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-green-600 font-semibold text-sm">3</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Dormitory Name</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Enter a unique and descriptive name for your dormitory that will help identify it in the system.
        </p>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-green-800 text-xs font-medium">✅ Best Practice: Use clear, descriptive names like "Downtown Student Housing"</p>
        </div>
      </div>
    ),
    position: 'right',
  },
  {
    selector: '.dormitory-description-field',
    content: (
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-purple-600 font-semibold text-sm">4</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Description Field</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Provide a detailed description of the dormitory's features, amenities, and characteristics.
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-600">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
            Multi-line text area for detailed descriptions
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
            Automatically resizes with modern styling
          </div>
        </div>
      </div>
    ),
    position: 'left',
  },
  {
    selector: '.dormitory-photos-section',
    content: (
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-amber-600 font-semibold text-sm">5</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Photo Management</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Upload photos of your dormitory using our enhanced image carousel component with modern edit dialog.
        </p>
        <div className="bg-amber-50 p-3 rounded-lg">
          <p className="text-amber-800 text-xs font-medium">📸 Feature: Drag & drop, preview, and professional image management</p>
        </div>
      </div>
    ),
    position: 'top',
  },
  {
    selector: '.dormitory-phone-field',
    content: (
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-indigo-600 font-semibold text-sm">6</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Enter the main contact number for the dormitory's reception or front desk.
        </p>
        <div className="bg-indigo-50 p-3 rounded-lg">
          <p className="text-indigo-800 text-xs font-medium">📞 Tip: Include country code for international accessibility</p>
        </div>
      </div>
    ),
    position: 'right',
  },
  {
    selector: '.dormitory-price-month-field',
    content: (
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-emerald-600 font-semibold text-sm">7</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Pricing Strategy</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Set competitive base pricing for monthly and daily rates. These can be overridden by specific room types.
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-emerald-50 p-2 rounded">
            <strong>Monthly:</strong> Long-term residents
          </div>
          <div className="bg-emerald-50 p-2 rounded">
            <strong>Daily:</strong> Short-term guests
          </div>
        </div>
      </div>
    ),
    position: 'bottom',
  },
  {
    selector: '.dormitory-photos-section',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Dormitory Photos</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Add photos of the dormitory to showcase its features and amenities to potential residents.
        </p>
      </div>
    ),
    position: 'top',
  },
  {
    selector: '.floors-section',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Floor Management</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Add and manage floors in your dormitory. Each floor can have different room configurations.
        </p>
      </div>
    ),
    position: 'right',
  },
  {
    selector: '.room-templates-section',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Room Templates</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Create and manage room templates that define room types, capacity, equipment, and features.
        </p>
      </div>
    ),
    position: 'left',
  },
  {
    selector: '.create-dormitory-button',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Dormitory</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Once you've filled in all the required information, click here to create your new dormitory.
        </p>
      </div>
    ),
    position: 'top',
  },
]

function TutorialButton() {
  const { setIsOpen, isOpen, currentStep, steps } = useTour()
  const progress = steps ? (currentStep / steps.length) * 100 : 0

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Progress Ring (shown when tutorial is active) */}
      {isOpen && (
        <div className="absolute inset-0 w-14 h-14">
          <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="26"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="28"
              cy="28"
              r="26"
              stroke="rgba(34, 197, 94, 1)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${progress * 1.63} 163`}
              strokeLinecap="round"
              className=" ease-out"
            />
          </svg>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl  flex items-center justify-center group"
        aria-label="Start interactive tutorial"
      >
        <div className="flex flex-col items-center">
          <svg 
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" 
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
          <span className="text-xs font-medium mt-0.5">Help</span>
        </div>
        
        {/* Pulse animation when not in tutorial */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
        )}
      </button>
    </div>
  )
}

interface CreateDormitoryTutorialProps {
  children: React.ReactNode
}

export function CreateDormitoryTutorial({ children }: CreateDormitoryTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  return (
    <TourProvider
      steps={createDormitorySteps}
      className="bg-white rounded-xl shadow-2xl border border-gray-100 backdrop-blur-sm"
      maskClassName="bg-black bg-opacity-60 backdrop-blur-[1px]"
      disableKeyboardNavigation={false}
      disableInteraction={false}
      padding={12}
      inViewThreshold={0}
      scrollSmooth={true}
      onClickMask={({ setIsOpen }) => setIsOpen(false)}
      beforeClose={() => {
        // Track tutorial completion
        // console.log('Tutorial completed:', { currentStep, completedSteps });
      }}
      afterOpen={(target) => {
        // Add professional highlight animation
        if (target && target instanceof HTMLElement) {
          target.style.transition = 'all 0.3s ease-in-out';
          target.style.transform = 'scale(1.02)';
          setTimeout(() => {
            target.style.transform = 'scale(1)';
          }, 300);
        }
      }}
      styles={{
        popover: (base) => ({
          ...base,
          '--reactour-accent': '#1e40af',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          maxWidth: '420px',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          backdropFilter: 'blur(8px)',
        }),
        maskArea: (base) => ({
          ...base,
          rx: 12,
          stroke: '#3b82f6',
          strokeWidth: 2,
          strokeDasharray: '8 4',
          animation: 'dash 2s linear infinite',
        }),
        badge: (base) => ({
          ...base,
          left: 'auto',
          right: '16px',
          top: '16px',
          backgroundColor: '#1e40af',
          fontSize: '12px',
          fontWeight: '600',
          borderRadius: '12px',
          padding: '4px 12px',
          boxShadow: '0 2px 8px rgba(30, 64, 175, 0.3)',
        }),
        controls: (base) => ({
          ...base,
          marginTop: '20px',
          padding: '0 20px 20px',
          borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        }),
        close: (base) => ({
          ...base,
          right: '16px',
          top: '16px',
          width: '28px',
          height: '28px',
          color: '#6b7280',
          borderRadius: '6px',
          backgroundColor: 'rgba(248, 250, 252, 0.8)',
          '&:hover': {
            color: '#374151',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease',
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