'use client'

import { useLanguage } from "@/providers/language.provider";
import { useEffect, useState, useCallback } from "react";

export function useSSRSafeTranslation() {
  const { t, language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const safeT = useCallback((key: string, fallback?: string): string => {
    // During SSR and initial hydration, always return the fallback to ensure consistency
    if (!isMounted) {
      return fallback || key;
    }
    
    try {
      const translation = t(key);
      // If translation returns the key itself, it means translation not found, use fallback
      if (translation === key && fallback) {
        return fallback;
      }
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      return fallback || key;
    }
  }, [t, isMounted]);

  return { safeT, isMounted, language };
}