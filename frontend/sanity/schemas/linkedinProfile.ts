// LinkedIn Profile Management Schema for Sanity Studio
export default {
  name: 'linkedinProfile',
  type: 'document',
  title: 'LinkedIn Profile Data',
  description: 'Manage skills, certifications, education, and experience data',
  icon: () => '💼',
  fields: [
    // Meta Information
    {
      name: 'profileMeta',
      type: 'object',
      title: 'Profile Meta Information',
      fields: [
        {
          name: 'linkedinUrl',
          type: 'url',
          title: 'LinkedIn Profile URL',
          initialValue: 'https://www.linkedin.com/in/ghondi-claude',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'lastUpdated',
          type: 'datetime',
          title: 'Last Updated',
          initialValue: new Date().toISOString(),
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'isActive',
          type: 'boolean',
          title: 'Display on Website',
          initialValue: true
        }
      ]
    },

    // Skills Section
    {
      name: 'skills',
      type: 'array',
      title: 'Skills & Expertise',
      description: 'Add and manage your professional skills',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Skill Name',
              validation: (Rule: any) => Rule.required().min(2).max(50)
            },
            {
              name: 'category',
              type: 'string',
              title: 'Category',
              options: {
                list: [
                  { title: 'Creative Arts', value: 'creative' },
                  { title: 'Technical Skills', value: 'technical' },
                  { title: 'Leadership', value: 'leadership' },
                  { title: 'Languages', value: 'language' },
                  { title: 'Other', value: 'other' }
                ]
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'level',
              type: 'string',
              title: 'Proficiency Level',
              options: {
                list: [
                  { title: 'Beginner', value: 'beginner' },
                  { title: 'Intermediate', value: 'intermediate' },
                  { title: 'Advanced', value: 'advanced' },
                  { title: 'Expert', value: 'expert' }
                ]
              },
              initialValue: 'intermediate'
            },
            {
              name: 'endorsements',
              type: 'number',
              title: 'LinkedIn Endorsements',
              description: 'Number of endorsements received on LinkedIn',
              validation: (Rule: any) => Rule.min(0).max(500)
            },
            {
              name: 'verified',
              type: 'boolean',
              title: 'Verified Skill',
              description: 'Mark as verified/certified skill',
              initialValue: false
            },
            {
              name: 'displayOrder',
              type: 'number',
              title: 'Display Order',
              description: 'Order of appearance (lower numbers appear first)',
              initialValue: 0
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'category',
              endorsements: 'endorsements',
              verified: 'verified'
            },
            prepare(selection: any) {
              const { title, subtitle, endorsements, verified } = selection
              return {
                title: title,
                subtitle: `${subtitle.charAt(0).toUpperCase() + subtitle.slice(1)} • ${endorsements || 0} endorsements${verified ? ' • ✓ Verified' : ''}`
              }
            }
          }
        }
      ]
    },

    // Certifications Section
    {
      name: 'certifications',
      type: 'array',
      title: 'Professional Certifications',
      description: 'Manage your professional certifications and licenses',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Certification Name',
              validation: (Rule: any) => Rule.required().min(5).max(100)
            },
            {
              name: 'issuer',
              type: 'string',
              title: 'Issuing Organization',
              validation: (Rule: any) => Rule.required().min(2).max(100)
            },
            {
              name: 'issueDate',
              type: 'date',
              title: 'Issue Date',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'expirationDate',
              type: 'date',
              title: 'Expiration Date',
              description: 'Leave empty if certification does not expire'
            },
            {
              name: 'credentialId',
              type: 'string',
              title: 'Credential ID',
              description: 'Certificate or license number'
            },
            {
              name: 'credentialUrl',
              type: 'url',
              title: 'Verification URL',
              description: 'Link to verify this certification'
            },
            {
              name: 'logo',
              type: 'image',
              title: 'Certification Logo',
              description: 'Logo of the issuing organization',
              options: {
                hotspot: true
              }
            },
            {
              name: 'skills',
              type: 'array',
              title: 'Related Skills',
              description: 'Skills demonstrated by this certification',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags'
              }
            },
            {
              name: 'displayOrder',
              type: 'number',
              title: 'Display Order',
              initialValue: 0
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'issuer',
              media: 'logo',
              issueDate: 'issueDate',
              expirationDate: 'expirationDate'
            },
            prepare(selection: any) {
              const { title, subtitle, issueDate, expirationDate } = selection
              const issued = new Date(issueDate).getFullYear()
              const expires = expirationDate ? new Date(expirationDate).getFullYear() : null
              return {
                title: title,
                subtitle: `${subtitle} • ${issued}${expires ? ` - ${expires}` : ''}`
              }
            }
          }
        }
      ]
    },

    // Education Section
    {
      name: 'education',
      type: 'array',
      title: 'Education',
      description: 'Academic background and qualifications',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'institution',
              type: 'string',
              title: 'Institution Name',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'degree',
              type: 'string',
              title: 'Degree/Certificate',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'field',
              type: 'string',
              title: 'Field of Study',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'startYear',
              type: 'number',
              title: 'Start Year',
              validation: (Rule: any) => Rule.required().min(1900).max(new Date().getFullYear())
            },
            {
              name: 'endYear',
              type: 'number',
              title: 'End Year',
              validation: (Rule: any) => Rule.min(1900).max(new Date().getFullYear() + 10)
            },
            {
              name: 'current',
              type: 'boolean',
              title: 'Currently Enrolled',
              initialValue: false
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              description: 'Brief description of studies, specializations, or achievements'
            },
            {
              name: 'logo',
              type: 'image',
              title: 'Institution Logo',
              options: {
                hotspot: true
              }
            }
          ],
          preview: {
            select: {
              title: 'degree',
              subtitle: 'institution',
              startYear: 'startYear',
              endYear: 'endYear',
              current: 'current'
            },
            prepare(selection: any) {
              const { title, subtitle, startYear, endYear, current } = selection
              const period = current ? `${startYear} - Present` : `${startYear} - ${endYear || 'Present'}`
              return {
                title: title,
                subtitle: `${subtitle} • ${period}`
              }
            }
          }
        }
      ]
    },

    // Experience Section
    {
      name: 'experience',
      type: 'array',
      title: 'Professional Experience',
      description: 'Work experience and positions',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Job Title',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'company',
              type: 'string',
              title: 'Company/Organization',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'location',
              type: 'string',
              title: 'Location'
            },
            {
              name: 'startDate',
              type: 'date',
              title: 'Start Date',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'endDate',
              type: 'date',
              title: 'End Date'
            },
            {
              name: 'current',
              type: 'boolean',
              title: 'Current Position',
              initialValue: false
            },
            {
              name: 'description',
              type: 'text',
              title: 'Job Description',
              description: 'Brief description of role and key achievements'
            },
            {
              name: 'skills',
              type: 'array',
              title: 'Skills Used',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags'
              }
            },
            {
              name: 'companyLogo',
              type: 'image',
              title: 'Company Logo',
              options: {
                hotspot: true
              }
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'company',
              startDate: 'startDate',
              endDate: 'endDate',
              current: 'current'
            },
            prepare(selection: any) {
              const { title, subtitle, startDate, endDate, current } = selection
              const start = new Date(startDate).getFullYear()
              const end = current ? 'Present' : (endDate ? new Date(endDate).getFullYear() : 'Present')
              return {
                title: title,
                subtitle: `${subtitle} • ${start} - ${end}`
              }
            }
          }
        }
      ]
    }
  ],

  preview: {
    select: {
      lastUpdated: 'profileMeta.lastUpdated',
      isActive: 'profileMeta.isActive'
    },
    prepare(selection: any) {
      const { lastUpdated, isActive } = selection
      return {
        title: 'LinkedIn Profile Data',
        subtitle: `${isActive ? '✓ Active' : '✗ Inactive'} • Updated ${new Date(lastUpdated).toLocaleDateString()}`
      }
    }
  }
}
