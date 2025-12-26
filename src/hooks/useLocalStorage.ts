import { useState, useEffect, useCallback } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

type StorageKey = 'activities' | 'projects' | 'thoughts' | 'personalInfo' | 'skills' | 'experience' | 'education';

interface UseLocalStorageResult<T> {
  data: T;
  setData: (newData: T) => void;
  error: string | null;
  clearError: () => void;
}

export function useLocalStorage<T>(
  key: StorageKey,
  lang: Language,
  fallbackKey?: keyof typeof CONTENT['en']
): UseLocalStorageResult<T> {
  const storageKey = `${key}_${lang}`;
  const fallback = fallbackKey ? CONTENT[lang][fallbackKey] : null;

  const [data, setDataState] = useState<T>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return fallback as T;
      }
    }
    return fallback as T;
  });

  const [error, setError] = useState<string | null>(null);

  // Re-initialize when language changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setDataState(JSON.parse(saved));
      } catch {
        setDataState(fallback as T);
      }
    } else {
      setDataState(fallback as T);
    }
  }, [lang, storageKey]);

  const setData = useCallback((newData: T) => {
    try {
      const serialized = JSON.stringify(newData);
      localStorage.setItem(storageKey, serialized);
      setDataState(newData);
      setError(null);
    } catch (e: any) {
      console.error("Storage failed:", e);
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        setError("Storage full! Try deleting old data or smaller images.");
      } else {
        setError("Failed to save changes.");
      }
    }
  }, [storageKey]);

  const clearError = useCallback(() => setError(null), []);

  return { data, setData, error, clearError };
}
