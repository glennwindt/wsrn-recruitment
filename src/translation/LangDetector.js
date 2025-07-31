// src/translation/LangDetector.js

const supportedLanguages = {
  en: /the|and|is|are|of|to|in|for|with/,
  pt: /o|a|de|que|em|por|com|não|os/,
  fr: /le|la|de|que|en|pour|avec|pas/,
  es: /el|la|de|que|en|por|con|no/,
  zh: /的|了|我|是|不|在|有|和/,
  ar: /ال|من|في|مع|لا|على|هذا|كان/
};

export function detectLanguage(text) {
  const normalizedText = text.toLowerCase();
  for (const [langCode, pattern] of Object.entries(supportedLanguages)) {
    if (pattern.test(normalizedText)) return langCode;
  }
  return 'unknown';
}

