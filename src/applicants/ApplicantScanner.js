// src/applicants/ApplicantScanner.js

import { TagAssigner } from '../utils/TagAssigner';
import { matchTrainingCenter } from '../training/TrainingMatcher';
import { translateDocument } from '../translation/AIDocumentTranslator';

export async function scanApplicant(applicantProfile) {
  const tags = TagAssigner.assignTags(applicantProfile);
  const trainingMatches = matchTrainingCenter(applicantProfile);

  let translatedCertificates = [];
  for (const cert of applicantProfile.certificates) {
    try {
      const translation = await translateDocument(cert.text, 'en');
      translatedCertificates.push({
        originalLang: cert.lang,
        translatedText: translation
      });
    } catch (error) {
      translatedCertificates.push({
        error: error.message,
        originalLang: cert.lang,
        translatedText: null
      });
    }
  }

  return {
    name: applicantProfile.name,
    tags,
    matchedTrainingCenters: trainingMatches,
    translatedCertificates
  };
}

