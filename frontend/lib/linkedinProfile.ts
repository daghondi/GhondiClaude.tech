// LinkedIn Profile Integration Utility
// This file manages LinkedIn-style professional data

export interface LinkedInSkill {
  name: string;
  endorsements?: number;
  category: 'technical' | 'creative' | 'leadership' | 'language' | 'other';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  verified?: boolean;
}

export interface LinkedInCertification {
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
}

export interface LinkedInEducation {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  description?: string;
}

export interface LinkedInExperience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  skills?: string[];
}

export interface LinkedInProfile {
  skills: LinkedInSkill[];
  certifications: LinkedInCertification[];
  education: LinkedInEducation[];
  experience: LinkedInExperience[];
  lastUpdated: string;
}

// Your LinkedIn Profile Data
// TODO: This could be moved to Sanity CMS or fetched from LinkedIn API
export const linkedInProfile: LinkedInProfile = {
  skills: [
    // Fine Art Skills
    { name: 'Oil Painting', endorsements: 25, category: 'creative', level: 'expert', verified: true },
    { name: 'Digital Art', endorsements: 18, category: 'creative', level: 'advanced' },
    { name: 'Mixed Media', endorsements: 15, category: 'creative', level: 'expert' },
    { name: 'Color Theory', endorsements: 22, category: 'creative', level: 'expert' },
    { name: 'Composition', endorsements: 19, category: 'creative', level: 'advanced' },
    { name: 'Art History', endorsements: 12, category: 'creative', level: 'intermediate' },

    // Urban Planning Skills
    { name: 'Urban Planning', endorsements: 35, category: 'technical', level: 'expert', verified: true },
    { name: 'Sustainable Design', endorsements: 28, category: 'technical', level: 'expert' },
    { name: 'Community Engagement', endorsements: 31, category: 'leadership', level: 'expert' },
    { name: 'GIS Analysis', endorsements: 24, category: 'technical', level: 'advanced' },
    { name: 'Policy Development', endorsements: 16, category: 'leadership', level: 'advanced' },
    { name: 'Traffic Planning', endorsements: 20, category: 'technical', level: 'advanced' },

    // Technology Skills
    { name: 'React', endorsements: 42, category: 'technical', level: 'expert', verified: true },
    { name: 'Next.js', endorsements: 38, category: 'technical', level: 'expert' },
    { name: 'Python', endorsements: 45, category: 'technical', level: 'expert', verified: true },
    { name: 'Artificial Intelligence', endorsements: 33, category: 'technical', level: 'advanced' },
    { name: 'Machine Learning', endorsements: 29, category: 'technical', level: 'advanced' },
    { name: 'Three.js', endorsements: 15, category: 'technical', level: 'intermediate' },
    { name: 'WebGL', endorsements: 12, category: 'technical', level: 'intermediate' },
    { name: 'Cybersecurity', endorsements: 21, category: 'technical', level: 'advanced' },
    
    // Languages
    { name: 'English', endorsements: 50, category: 'language', level: 'expert', verified: true },
    { name: 'French', endorsements: 8, category: 'language', level: 'intermediate' }
  ],
  
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services (AWS)',
      issueDate: '2024-03-15',
      expirationDate: '2027-03-15',
      credentialId: 'AWS-SA-12345',
      credentialUrl: 'https://aws.amazon.com/verification',
      skills: ['Cloud Architecture', 'AWS', 'Solutions Design']
    },
    {
      name: 'Certified Urban Planner (AICP)',
      issuer: 'American Institute of Certified Planners',
      issueDate: '2023-06-20',
      credentialId: 'AICP-67890',
      skills: ['Urban Planning', 'Policy Development', 'Community Engagement']
    },
    {
      name: 'Google Analytics Certified',
      issuer: 'Google',
      issueDate: '2024-01-10',
      expirationDate: '2025-01-10',
      credentialId: 'GA-CERT-54321',
      skills: ['Analytics', 'Data Analysis', 'Digital Marketing']
    }
  ],
  
  education: [
    {
      institution: 'University of California, Berkeley',
      degree: 'Master of City Planning',
      field: 'Urban and Regional Planning',
      startYear: 2020,
      endYear: 2022,
      description: 'Specialized in sustainable urban development and smart city technologies'
    },
    {
      institution: 'École des Beaux-Arts',
      degree: 'Bachelor of Fine Arts',
      field: 'Fine Arts',
      startYear: 2016,
      endYear: 2020,
      description: 'Focus on contemporary art practices and mixed media'
    }
  ],
  
  experience: [
    {
      title: 'Senior Urban Planner & Creative Technologist',
      company: 'GhondiClaude Studio',
      location: 'San Francisco, CA',
      startDate: '2022-08-01',
      current: true,
      description: 'Leading interdisciplinary projects combining urban planning, fine art, and emerging technologies',
      skills: ['Urban Planning', 'Creative Technology', 'Project Management', 'Client Relations']
    }
  ],
  
  lastUpdated: '2025-08-12'
};

// Utility functions
export const getSkillsByCategory = (category: LinkedInSkill['category']) => {
  return linkedInProfile.skills.filter(skill => skill.category === category);
};

export const getTopSkills = (limit: number = 10) => {
  return linkedInProfile.skills
    .sort((a, b) => (b.endorsements || 0) - (a.endorsements || 0))
    .slice(0, limit);
};

export const getActiveCertifications = () => {
  const now = new Date();
  return linkedInProfile.certifications.filter(cert => {
    if (!cert.expirationDate) return true;
    return new Date(cert.expirationDate) > now;
  });
};

export const formatSkillsForDisplay = () => {
  const categories = {
    'Fine Art': getSkillsByCategory('creative'),
    'Technology': getSkillsByCategory('technical'), 
    'Leadership': getSkillsByCategory('leadership'),
    'Languages': getSkillsByCategory('language')
  };
  
  return Object.entries(categories)
    .filter(([_, skills]) => skills.length > 0)
    .map(([categoryTitle, skills]) => ({
      categoryTitle,
      skills: skills.map(s => s.name)
    }));
};
