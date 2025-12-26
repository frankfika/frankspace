// Translation service for admin panel
// Uses Gemini API for Chinese to English translation

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

interface TranslateResult {
  success: boolean;
  text: string;
  error?: string;
}

export async function translateToEnglish(chineseText: string): Promise<TranslateResult> {
  if (!chineseText.trim()) {
    return { success: true, text: '' };
  }

  // Try Gemini API first
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_api_key_here') {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Translate the following Chinese text to English. Only return the translated text, no explanations or additional content:\n\n${chineseText}`
              }]
            }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 2048
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (translatedText) {
          return { success: true, text: translatedText.trim() };
        }
      }
    } catch (err) {
      console.warn('Gemini translation failed, using fallback');
    }
  }

  // Fallback: Use free translation API
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chineseText)}&langpair=zh-CN|en`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return { success: true, text: data.responseData.translatedText };
      }
    }
  } catch (err) {
    console.warn('MyMemory translation failed');
  }

  return {
    success: false,
    text: chineseText,
    error: 'Translation failed. Please translate manually.'
  };
}

export async function translateArrayToEnglish(items: string[]): Promise<string[]> {
  const results = await Promise.all(items.map(item => translateToEnglish(item)));
  return results.map(r => r.text);
}

export async function translateObjectToEnglish<T extends Record<string, any>>(
  zhData: T,
  fieldsToTranslate: (keyof T)[]
): Promise<T> {
  const enData = { ...zhData };

  for (const field of fieldsToTranslate) {
    const value = zhData[field];
    if (typeof value === 'string') {
      const result = await translateToEnglish(value);
      (enData as any)[field] = result.text;
    } else if (Array.isArray(value) && value.every(v => typeof v === 'string')) {
      (enData as any)[field] = await translateArrayToEnglish(value);
    }
  }

  return enData;
}
