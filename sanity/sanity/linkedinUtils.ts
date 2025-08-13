// LinkedIn Data Fetcher for Sanity Integration
import { client } from './config'

// Fetch LinkedIn profile data from Sanity
export async function getLinkedInProfile() {
  try {
    const query = `
      *[_type == "linkedinProfile" && profileMeta.isActive == true][0] {
        profileMeta,
        skills[] {
          name,
          category,
          level,
          endorsements,
          verified,
          displayOrder
        },
        certifications[] {
          name,
          issuer,
          issueDate,
          expirationDate,
          credentialId,
          credentialUrl,
          "logoUrl": logo.asset->url,
          skills,
          displayOrder
        },
        education[] {
          institution,
          degree,
          field,
          startYear,
          endYear,
          current,
          description,
          "logoUrl": logo.asset->url
        },
        experience[] {
          title,
          company,
          location,
          startDate,
          endDate,
          current,
          description,
          skills,
          "companyLogoUrl": companyLogo.asset->url
        }
      }
    `
    
    const data = await client.fetch(query)
    
    if (!data) {
      console.log('No LinkedIn profile data found in Sanity, using fallback data')
      return null
    }

    return {
      skills: data.skills?.sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0)) || [],
      certifications: data.certifications?.sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0)) || [],
      education: data.education || [],
      experience: data.experience || [],
      lastUpdated: data.profileMeta?.lastUpdated || new Date().toISOString()
    }
  } catch (error) {
    console.error('Error fetching LinkedIn profile from Sanity:', error)
    return null
  }
}

// Get skills by category (with fallback to static data)
export async function getSkillsByCategory(category: string) {
  const profile = await getLinkedInProfile()
  if (!profile) {
    // Fallback to static data
    const { getSkillsByCategory: staticGetSkillsByCategory } = await import('../../lib/linkedinProfile')
    return staticGetSkillsByCategory(category as any)
  }
  
  return profile.skills.filter((skill: any) => skill.category === category)
}

// Get active certifications (non-expired)
export async function getActiveCertifications() {
  const profile = await getLinkedInProfile()
  if (!profile) {
    // Fallback to static data
    const { getActiveCertifications: staticGetActiveCertifications } = await import('../../lib/linkedinProfile')
    return staticGetActiveCertifications()
  }
  
  const now = new Date()
  return profile.certifications.filter((cert: any) => {
    if (!cert.expirationDate) return true
    return new Date(cert.expirationDate) > now
  })
}

// Format skills for display with category grouping
export async function formatSkillsForDisplay() {
  const profile = await getLinkedInProfile()
  if (!profile) {
    // Fallback to static data
    const { formatSkillsForDisplay: staticFormatSkillsForDisplay } = await import('../../lib/linkedinProfile')
    return staticFormatSkillsForDisplay()
  }
  
  const categories = {
    'Fine Art': profile.skills.filter((s: any) => s.category === 'creative'),
    'Technology': profile.skills.filter((s: any) => s.category === 'technical'),
    'Leadership': profile.skills.filter((s: any) => s.category === 'leadership'),
    'Languages': profile.skills.filter((s: any) => s.category === 'language')
  }
  
  return Object.entries(categories)
    .filter(([_, skills]) => skills.length > 0)
    .map(([categoryTitle, skills]) => ({
      categoryTitle,
      skills: skills.map((s: any) => s.name)
    }))
}

// Get top skills by endorsements
export async function getTopSkills(limit: number = 10) {
  const profile = await getLinkedInProfile()
  if (!profile) {
    // Fallback to static data
    const { getTopSkills: staticGetTopSkills } = await import('../../lib/linkedinProfile')
    return staticGetTopSkills(limit)
  }
  
  return profile.skills
    .sort((a: any, b: any) => (b.endorsements || 0) - (a.endorsements || 0))
    .slice(0, limit)
}

// Create or update LinkedIn profile in Sanity (for admin use)
export async function createLinkedInProfileDocument(profileData: any) {
  try {
    const doc = {
      _type: 'linkedinProfile',
      profileMeta: {
        linkedinUrl: 'https://www.linkedin.com/in/ghondi-claude',
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      ...profileData
    }
    
    const result = await client.create(doc)
    return result
  } catch (error) {
    console.error('Error creating LinkedIn profile document:', error)
    throw error
  }
}
