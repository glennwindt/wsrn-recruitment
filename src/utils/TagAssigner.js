// src/utils/TagAssigner.js

export const TagAssigner = {
  assignTags(profile) {
    const tags = [];

    if (profile.experienceLevel === 'entry') {
      tags.push('novice', 'basic-certification');
    } else if (profile.experienceLevel === 'advanced') {
      tags.push('veteran', 'advanced-training');
    }

    if (profile.desiredRole?.toLowerCase().includes('engineer')) {
      tags.push('mechanical-skills');
    }

    if (profile.desiredRole?.toLowerCase().includes('deck')) {
      tags.push('navigation-skills');
    }

    if (profile.certifications?.includes('STCW')) {
      tags.push('stcw-compliant');
    }

    if (profile.hasMilitaryBackground) {
      tags.push('military-background');
    }

    if (profile.preferredVesselType) {
      tags.push(`${profile.preferredVesselType}-ready`);
    }

    return tags;
  }
};

