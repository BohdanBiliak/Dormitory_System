'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/providers/language.provider'

interface DialogTutorialStep {
  id: string
  title: string
  description: string
  target: string
  position: 'top' | 'bottom' | 'left' | 'right'
  action?: () => void
}

interface DialogTutorialProps {
  isOpen: boolean
  onClose: () => void
  steps: DialogTutorialStep[]
  currentSection: string
}

export function DialogTutorial({ isOpen, onClose, steps, currentSection }: DialogTutorialProps) {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  
  const currentStepData = steps[currentStep]
  const filteredSteps = steps.filter(step => 
    step.target.includes(currentSection.toLowerCase()) || step.target === 'header' || step.target === 'navigation'
  )

  if (!isOpen || !currentStepData) return null

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      currentStepData.action?.()
    } else {
      onClose()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTutorial = () => {
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" onClick={onClose} />
      
      {/* Tutorial Card */}
      <div className="fixed top-4 right-4 z-[101] max-w-sm bg-white rounded-xl shadow-2xl border border-gray-200 p-6 animate-in slide-in-from-right-2 duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">{currentStep + 1}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{currentStepData.title}</h3>
              <p className="text-xs text-gray-500">{currentStep + 1} of {steps.length}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={skipTutorial}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip Tutorial
          </button>
          
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Previous
              </button>
            )}
            <button
              onClick={nextStep}
              className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {/* Target Highlight */}
      <style jsx global>{`
        .tutorial-highlight {
          position: relative;
          z-index: 99;
        }
        .tutorial-highlight::before {
          content: '';
          position: absolute;
          inset: -4px;
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          border-radius: 12px;
          z-index: -1;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  )
}

// Tutorial button component
export function DialogTutorialButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
    >
      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Tutorial
    </button>
  )
}