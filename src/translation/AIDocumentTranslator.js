// src/translation/AIDocumentTranslator.js

import { detectLanguage } from './LangDetector';
import { OCRQualityCheck } from '../utils/OCRQualityCheck';

export async function translateDocument(documentText, targetLang = 'en') {
  const qualityScore = OCRQualityCheck(documentText);
  if (qualityScore < 0.5) {
    throw new Error('Low OCR quality detected. Please re-upload or enhance the image.');
  }

  const sourceLang = detectLanguage(documentText);
  if (sourceLang === targetLang) return documentText;

  const response = await fetch('https://api.gemini.ai/v1/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GEMINI_API_KEY}`
    },
    body: JSON.stringify({
      text: documentText,
      from: sourceLang,
      to: targetLang
    })
  });

  const result = await response.json();
  return result.translatedText;
}
