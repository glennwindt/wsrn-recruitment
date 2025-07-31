// src/applicants/MatchHandler.js

import vesselCategories from '../utils/vesselCategories';
import vesselTypes from '../utils/vesselTypes';
import { TagAssigner } from '../utils/TagAssigner';

export function generateMatch(applicantProfile) {
  const tags = TagAssigner.assignTags(applicantProfile);
  const matches = [];

  if (tags.includes('mechanical-skills') && applicantProfile.experienceLevel !== 'entry') {
    matches.push({
      role: 'Chief Engineer',
      vessel: vesselTypes.engineering,
      category: vesselCategories.technical
    });
  }

  if (tags.includes('navigation-skills')) {
    matches.push({
      role: 'Deck Officer',
      vessel: vesselTypes.navigation,
      category: vesselCategories.operational
    });
  }

  if (tags.includes('military-background')) {
    matches.push({
      role: 'Security Supervisor',
      vessel: vesselTypes.patrol,
      category: vesselCategories.defense
    });
  }

  if (tags.includes('stcw-compliant')) {
    matches.push({
      role: 'Certified Seafarer',
      vessel: vesselTypes.commercial,
      category: vesselCategories.civil
    });
  }

  if (matches.length === 0) {
    matches.push({
      role: 'General Crew',
      vessel: vesselTypes.misc,
      category: vesselCategories.support
    });
  }

  return {
    name: applicantProfile.name,
    suggestedRoles: matches,
    appliedTags: tags
  };
}

