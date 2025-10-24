'use client'

import React from 'react'
import { useLanguage } from '@/providers/language.provider'

interface TranslationButtonProps {
  variant?: 'side-menu' | 'floating' | 'header' | 'compact'
  className?: string
  showLabel?: boolean
}

export function TranslationButton({ 
  variant = 'floating', 
  className = '', 
  showLabel = true 
}: TranslationButtonProps) {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pl' : 'en')
  }

  // Floating button (for global access)
  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <button
          onClick={toggleLanguage}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 group"
          title={t('common.translateApp') || 'Translate App'}
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg">🌐</span>
            {showLabel && (
              <span className="text-sm font-medium hidden sm:block">
                {language === 'en' ? 'PL' : 'EN'}
              </span>
            )}
          </div>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            <span className="animate-pulse">!</span>
          </div>
        </button>
      </div>
    )
  }

  // Side menu variant
  if (variant === 'side-menu') {
    return (
      <div className={`p-4 md:p-0 mb-8 md:mb-20 ${className}`}>
        <div className="text-center mb-3">
          <p className="text-xs text-blue-200 uppercase tracking-wide font-medium">
            {t('sideMenu.translateApp') || 'Translate App'}
          </p>
        </div>
        <div className="flex flex-row justify-center">
          <button 
            onClick={() => setLanguage('pl')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md transition-all duration-200 transform hover:scale-105 ${
              language === 'pl' 
                ? 'bg-white text-blue-900 shadow-lg' 
                : 'text-white border border-white hover:bg-white hover:text-blue-900 hover:shadow-md'
            }`}
            title={t('common.translateToPolish') || 'Translate entire app to Polish'}
          >
            🇵🇱 Polski
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md transition-all duration-200 transform hover:scale-105 ${
              language === 'en' 
                ? 'bg-white text-blue-900 shadow-lg' 
                : 'text-white border border-white hover:bg-white hover:text-blue-900 hover:shadow-md'
            }`}
            title={t('common.translateToEnglish') || 'Translate entire app to English'}
          >
            🇺🇸 English
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs text-blue-300 opacity-75">
            {t('sideMenu.currentLanguage') || 'Current'}: {language === 'en' ? 'English' : 'Polski'}
          </p>
        </div>
      </div>
    )
  }

  // Header variant
  if (variant === 'header') {
    return (
      <div className={`relative inline-block ${className}`}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'pl')}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="en">🇺🇸 English</option>
          <option value="pl">🇵🇱 Polski</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    )
  }

  // Compact variant (toggle between flags)
  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-md transform hover:scale-105 active:scale-95 ${className}`}
        title={language === 'en' ? (t('common.translateToPolish') || 'Switch to Polish') : (t('common.translateToEnglish') || 'Switch to English')}
      >
        <span className="text-lg">
          {language === 'en' ? '🇺🇸' : '🇵🇱'}
        </span>
        {showLabel && (
          <span className="text-sm font-medium">
            {language === 'en' ? 'EN' : 'PL'}
          </span>
        )}
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </button>
    )
  }

  return null
}