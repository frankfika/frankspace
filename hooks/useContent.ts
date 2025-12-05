import useSWR from 'swr';
import { fetchContentByLanguage } from '../lib/supabaseQueries';
import { Language, ContentData } from '../types';
import { CONTENT } from '../constants';

// Fallback to constants.ts if Supabase is not configured or fails
export function useContent(lang: Language) {
  const { data, error, isLoading, mutate } = useSWR(
    ['content', lang],
    () => fetchContentByLanguage(lang),
    {
      fallbackData: CONTENT[lang],
      revalidateOnFocus: false,
      revalidateOnReconnect: true
    }
  );

  // If Supabase returns null or error, fall back to constants
  const contentData: ContentData = (data && !error) ? {
    ...CONTENT[lang],
    ...data
  } as ContentData : CONTENT[lang];

  return {
    data: contentData,
    isLoading,
    error,
    mutate
  };
}
