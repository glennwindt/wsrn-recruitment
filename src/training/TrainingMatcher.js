// src/training/TrainingMatcher.js

import trainingCenters from '../data/trainingCenters.json';
import { TagAssigner } from '../utils/TagAssigner';
import { DateParser } from '../utils/DateParser';

export function matchTrainingCenter(seafarerProfile) {
  const { experienceLevel, locationPreference, requiredCertifications } = seafarerProfile;
  const matchedTags = TagAssigner.assignTags(seafarerProfile);

  const matches = trainingCenters.filter(center => {
    const meetsLocation = center.locations.includes(locationPreference);
    const matchesCerts = requiredCertifications.every(cert => center.availableCourses.includes(cert));
    const tagOverlap = center.tags.some(tag => matchedTags.includes(tag));
    return meetsLocation && matchesCerts && tagOverlap;
  });

  matches.sort((a, b) => {
    const dateA = DateParser.parse(a.nextAvailableDate);
    const dateB = DateParser.parse(b.nextAvailableDate);
    return dateA - dateB;
  });

  return matches;
}

