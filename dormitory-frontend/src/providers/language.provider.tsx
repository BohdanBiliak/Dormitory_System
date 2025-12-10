'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, memo } from 'react'

// Language definitions
export type Language = 'en' | 'pl'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, any>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Language data storage
let languageData: Record<Language, Record<string, any>> = {
  en: {},
  pl: {}
}

// Load language files
const loadLanguageData = async (lang: Language) => {
  try {
    const [
      common,
      dialogs,
      auth,
      dormitories,
      profile,
      sideMenu,
      availableRooms,
      admin,
      maintenance,
      messaging,
      confirmations,
      payments,
      notifications,
      rooms,
      reports,
      announcements
    ] = await Promise.all([
      import(`@/locales/${lang}/common.json`),
      import(`@/locales/${lang}/dialogs.json`),
      import(`@/locales/${lang}/auth.json`),
      import(`@/locales/${lang}/dormitories-information.json`),
      import(`@/locales/${lang}/profile.json`),
      import(`@/locales/${lang}/side-menu.json`),
      import(`@/locales/${lang}/avalible-rooms.json`),
      import(`@/locales/${lang}/admin.json`),
      import(`@/locales/${lang}/maintenance.json`),
      import(`@/locales/${lang}/messaging.json`),
      import(`@/locales/${lang}/confirmations.json`),
      import(`@/locales/${lang}/payments.json`),
      import(`@/locales/${lang}/notifications.json`),
      import(`@/locales/${lang}/rooms.json`),
      import(`@/locales/${lang}/reports.json`),
      import(`@/locales/${lang}/announcements.json`)
    ])

    languageData[lang] = {
      ...common.default,
      ...dialogs.default,
      ...auth.default,
      ...dormitories.default,
      ...profile.default,
      ...sideMenu.default,
      ...availableRooms.default,
      ...admin.default,
      ...maintenance.default,
      ...messaging.default,
      ...confirmations.default,
      ...payments.default,
      ...notifications.default,
      ...rooms.default,
      ...reports.default,
      ...announcements.default
    }
  } catch (error) {
    console.error(`Error loading language data for ${lang}:`, error)
  }
}

const LanguageProviderComponent = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load initial language data
  useEffect(() => {
    const initializeLanguage = async () => {
      // Get saved language from localStorage or use default
      const savedLanguage = localStorage.getItem('language') as Language
      const initialLanguage = savedLanguage || 'en'
      
      await loadLanguageData(initialLanguage)
      setLanguageState(initialLanguage)
      setIsLoaded(true)
    }

    initializeLanguage()
  }, [])

  // Load language data when language changes
  useEffect(() => {
    if (isLoaded) {
      const loadNewLanguage = async () => {
        await loadLanguageData(language)
        localStorage.setItem('language', language)
      }
      loadNewLanguage()
    }
  }, [language, isLoaded])

  const setLanguage = useCallback(async (lang: Language) => {
    await loadLanguageData(lang)
    setLanguageState(lang)
  }, [])

  // Translation function with nested key support and parameter interpolation
  const t = useCallback((key: string, params?: Record<string, any>): string => {
    try {
      const keys = key.split('.')
      let value: any = languageData[language]

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          // Fallback to English if key not found in current language
          value = languageData['en']
          for (const fallbackKey of keys) {
            if (value && typeof value === 'object' && fallbackKey in value) {
              value = value[fallbackKey]
            } else {
              return key // Return key if translation not found
            }
          }
          break
        }
      }

      if (typeof value !== 'string') {
        return key
      }

      // Handle parameter interpolation
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return params[paramKey] !== undefined ? String(params[paramKey]) : match
        })
      }

      return value
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error)
      return key
    }
  }, [language])

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, setLanguage, t])

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export const LanguageProvider = memo(LanguageProviderComponent)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Language selector component
export const LanguageSelector = memo(function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language)
  }, [setLanguage])

  const chevronIcon = useMemo(() => (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ), [])

  return (
    <div className="relative inline-block">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="en">🇺🇸 English</option>
        <option value="pl">🇵🇱 Polski</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        {chevronIcon}
      </div>
    </div>
  )
})