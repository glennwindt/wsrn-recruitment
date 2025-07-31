// src/utils/OCRQualityCheck.js

export function OCRQualityCheck(text) {
  if (!text || typeof text !== 'string') return 0;

  const totalLength = text.length;
  const symbolCount = (text.match(/[~`!@#$%^&*()_+=\[\]{}|\\:;"'<>,.?/]/g) || []).length;
  const gibberishRatio = symbolCount / totalLength;

  const whitespaceCount = (text.match(/\s/g) || []).length;
  const readabilityScore = (whitespaceCount / totalLength) * (1 - gibberishRatio);

  // Normalize to range 0.0 to 1.0
  return Math.min(Math.max(readabilityScore, 0), 1).toFixed(2);
}

