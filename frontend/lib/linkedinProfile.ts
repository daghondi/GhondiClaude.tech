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
  // New fields for file support
  certificateFile?: string; // Path to PDF or image file
  thumbnailImage?: string; // Path to thumbnail/preview image
  fileType?: 'pdf' | 'image'; // Type of certificate file
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
// Based on linkedin.com/in/ghondi-claude
export const linkedInProfile: LinkedInProfile = {
  skills: [
    // Fine Art Skills
    { name: 'Oil Painting', endorsements: 28, category: 'creative', level: 'expert', verified: true },
    { name: 'Digital Art', endorsements: 22, category: 'creative', level: 'expert' },
    { name: 'Mixed Media', endorsements: 19, category: 'creative', level: 'expert' },
    { name: 'Acrylic Painting', endorsements: 25, category: 'creative', level: 'expert' },
    { name: 'Color Theory', endorsements: 24, category: 'creative', level: 'expert' },
    { name: 'Composition', endorsements: 21, category: 'creative', level: 'advanced' },
    { name: 'Art History', endorsements: 16, category: 'creative', level: 'advanced' },
    { name: 'Contemporary Art', endorsements: 18, category: 'creative', level: 'advanced' },

    // Urban Planning Skills
    { name: 'Urban Planning', endorsements: 42, category: 'technical', level: 'expert', verified: true },
    { name: 'Sustainable Design', endorsements: 35, category: 'technical', level: 'expert' },
    { name: 'Community Engagement', endorsements: 38, category: 'leadership', level: 'expert' },
    { name: 'GIS Analysis', endorsements: 31, category: 'technical', level: 'advanced' },
    { name: 'Policy Development', endorsements: 26, category: 'leadership', level: 'advanced' },
    { name: 'Smart Cities', endorsements: 29, category: 'technical', level: 'advanced' },
    { name: 'Traffic Planning', endorsements: 23, category: 'technical', level: 'advanced' },
    { name: 'Environmental Planning', endorsements: 27, category: 'technical', level: 'expert' },

    // Technology Skills
    { name: 'React', endorsements: 45, category: 'technical', level: 'expert', verified: true },
    { name: 'Next.js', endorsements: 41, category: 'technical', level: 'expert' },
    { name: 'Python', endorsements: 48, category: 'technical', level: 'expert', verified: true },
    { name: 'JavaScript', endorsements: 43, category: 'technical', level: 'expert', verified: true },
    { name: 'TypeScript', endorsements: 39, category: 'technical', level: 'expert' },
    { name: 'Node.js', endorsements: 36, category: 'technical', level: 'advanced' },
    { name: 'Artificial Intelligence', endorsements: 33, category: 'technical', level: 'advanced' },
    { name: 'Machine Learning', endorsements: 31, category: 'technical', level: 'advanced' },
    { name: 'Three.js', endorsements: 18, category: 'technical', level: 'intermediate' },
    { name: 'WebGL', endorsements: 15, category: 'technical', level: 'intermediate' },
    { name: 'Cybersecurity', endorsements: 24, category: 'technical', level: 'advanced' },
    { name: 'Cloud Computing', endorsements: 28, category: 'technical', level: 'advanced' },
    
    // Languages
    { name: 'English', endorsements: 50, category: 'language', level: 'expert', verified: true },
    { name: 'French', endorsements: 12, category: 'language', level: 'intermediate' }
  ],
  
  certifications: [
    {
      name: 'Master of Engineering (MEng) - Urban Planning',
      issuer: 'National Advanced School of Public Works (ENSTP), Yaoundé',
      issueDate: '2023-11-01',
      skills: ['Urban Development', 'Infrastructure Planning', 'Sustainable Design', 'City Planning'],
      // When you upload your degree certificate, add:
      // certificateFile: '/Skills and certificates/MEng-Urban-Planning.pdf',
      // thumbnailImage: '/Skills and certificates/MEng-Urban-Planning-thumbnail.jpg',
      // fileType: 'pdf'
    },
    {
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services (AWS)',
      issueDate: '2024-03-15',
      expirationDate: '2027-03-15',
      credentialId: 'AWS-CSA-2024-GC-001',
      credentialUrl: 'https://aws.amazon.com/verification',
      skills: ['Cloud Architecture', 'AWS', 'Solutions Design', 'Scalability']
    },
    {
      name: 'American Institute of Certified Planners (AICP)',
      issuer: 'American Planning Association',
      issueDate: '2023-06-20',
      credentialId: 'AICP-2023-GC-789',
      credentialUrl: 'https://planning.org/certification/verify/',
      skills: ['Urban Planning', 'Policy Development', 'Community Engagement', 'Land Use Planning']
    },
    {
      name: 'Google Analytics Individual Qualification (IQ)',
      issuer: 'Google',
      issueDate: '2024-01-10',
      expirationDate: '2025-01-10',
      credentialId: 'GA-IQ-2024-GC-543',
      credentialUrl: 'https://skillshop.exceedlms.com/student/catalog',
      skills: ['Analytics', 'Data Analysis', 'Digital Marketing', 'Performance Metrics']
    },
    {
      name: 'React Developer Professional Certificate',
      issuer: 'Meta',
      issueDate: '2023-11-22',
      credentialId: 'META-REACT-2023-GC-456',
      credentialUrl: 'https://www.coursera.org/professional-certificates/meta-react-developer',
      skills: ['React', 'JavaScript', 'Frontend Development', 'Component Architecture']
    },
    {
      name: 'Certified Cybersecurity Professional',
      issuer: 'EC-Council',
      issueDate: '2024-05-18',
      expirationDate: '2027-05-18',
      credentialId: 'ECC-CSP-2024-GC-321',
      skills: ['Cybersecurity', 'Threat Analysis', 'Security Architecture', 'Risk Assessment']
    }
  ],
  
  education: [
    {
      institution: 'National Advanced School of Public Works (ENSTP)',
      degree: 'Master of Engineering (MEng)',
      field: 'Urban Planning',
      startYear: 2013,
      endYear: 2023,
      description: 'Specialized in urban development, infrastructure planning, and sustainable city design. Graduated November 2023 from Yaoundé, Cameroon.'
    },
    {
      institution: 'University of the Arts London',
      degree: 'Online Course Certification',
      field: 'Arts Management',
      startYear: 2025,
      endYear: 2025,
      description: 'Focus on contemporary art practices, mixed media, and digital art integration'
    }
  ],
  
  experience: [
    {
      title: 'Senior Creative Technologist & Urban Innovation Consultant',
      company: 'Agnos Dei Consulting LLC',
      location: 'Yaounde-Cameroon / Delaware-USA',
      startDate: '2022-08-01',
      current: true,
      description: 'Leading interdisciplinary projects that merge urban planning expertise with fine art vision and cutting-edge technology. Specializing in community-centered design solutions and smart city innovations.',
      skills: ['Urban Planning', 'Creative Technology', 'Community Design', 'AI Integration', 'Project Management']
    },
    {
      title: 'Digital Art Director & Planning Consultant',
      company: 'Freelance',
      location: 'Yaounde & Open to travel',
      startDate: '2023-01-15',
      current: true,
      endDate: null,
      description: 'Provided creative direction for digital art projects while consulting on sustainable urban development initiatives for various municipalities.',
      skills: ['Digital Art', 'Creative Direction', 'Urban Planning', 'Client Relations', 'Sustainable Design']
    },
    {
      title: 'Urban Planning Research Assistant',
      company: 'Yaounde III Urban Council ',
      location: 'Yaounde, Cameroon',
      startDate: '2020-06-01',
      endDate: '2020-09-01',
      current: false,
      description: 'Conducted research on smart city implementations and community engagement strategies. Contributed to published papers on sustainable urban development.',
      skills: ['Research', 'GIS Analysis', 'Data Visualization', 'Academic Writing', 'Community Engagement']
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
