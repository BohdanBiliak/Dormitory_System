'use client'

import { useState, useCallback } from 'react'
import { TutorialStep } from '../types/auth.tutorial.types'

export function useTutorial(steps: TutorialStep[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const startTutorial = useCallback(() => {
    setCurrentStep(0)
    setIsOpen(true)
  }, [])

  const closeTutorial = useCallback(() => {
    setIsOpen(false)
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }, [])

  const resetTutorial = useCallback(() => {
    setCurrentStep(0)
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    currentStep,
    steps,
    startTutorial,
    closeTutorial,
    goToStep,
    nextStep,
    prevStep,
    resetTutorial,
  }
}