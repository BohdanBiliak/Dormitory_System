import { StepType } from '@reactour/tour'
import React from 'react'

export interface DormitoryTutorialStep extends Omit<StepType, 'content'> {
  selector: string
  content: string | React.ReactElement | ((props: any) => void)
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

export interface DormitoryTutorialConfig {
  steps: DormitoryTutorialStep[]
  isOpen: boolean
  currentStep: number
  onAfterOpen?: () => void
  onBeforeClose?: () => void
  className?: string
  maskClassName?: string
  closeWithMask?: boolean
  disableKeyboardNavigation?: boolean
  disableInteraction?: boolean
  padding?: number
  inViewThreshold?: number
  scrollSmooth?: boolean
}