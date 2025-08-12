# Skills and Certificates Setup Guide

This folder is where you can upload your certification documents for display on your website.

## Supported File Types

### PDFs
- **Best for:** Official certificates, diplomas, licenses
- **Display:** Shows first page as preview with full PDF viewer in popup
- **Example:** `MEng-Urban-Planning.pdf`

### Images
- **Best for:** Screenshot certificates, image-based credentials
- **Formats:** JPG, PNG, WebP
- **Example:** `Google-Analytics-Certificate.jpg`

### Hybrid (PDF + Thumbnail)
- **Best for:** PDFs with custom preview images
- **Setup:** Upload both the PDF and a thumbnail image
- **Example:** 
  - `Certificate.pdf` (main file)
  - `Certificate-thumbnail.jpg` (preview)

## How to Add Certificates

### Option 1: File Upload + Manual Configuration
1. Upload your certificate files to this folder
2. Edit `frontend/lib/linkedinProfile.ts`
3. Add certificate entries like this:

```typescript
{
  name: 'Master of Engineering - Urban Planning',
  issuer: 'National Advanced School of Public Works',
  issueDate: '2023-11-01',
  certificateFile: '/Skills and certificates/MEng-Urban-Planning.pdf',
  fileType: 'pdf',
  skills: ['Urban Planning', 'Infrastructure Design']
}
```

### Option 2: Sanity CMS Admin (Recommended)
1. Upload certificates to this folder
2. Go to `/admin` on your website
3. Navigate to "LinkedIn Profile" → "Professional Certifications"
4. Click "Add item" and fill in the details
5. Set the certificate file path (e.g., `/Skills and certificates/your-cert.pdf`)

## File Naming Best Practices

- Use descriptive names: `MEng-Urban-Planning-ENSTP-2023.pdf`
- Avoid spaces: use hyphens `-` or underscores `_`
- Include dates or years for clarity
- Keep names under 50 characters

## Path Format

When configuring certificates, use this path format:
```
/Skills and certificates/filename.pdf
```

Note: The leading slash `/` is important!

## Features Your Certificate Display System Includes

- ✅ **PDF Viewer**: Full PDF viewing with page navigation
- ✅ **Image Lightbox**: Click to expand images
- ✅ **Download Links**: Direct download/view buttons
- ✅ **Verification Links**: Links to verify certificates online
- ✅ **Expiration Tracking**: Shows status (Active, Expiring Soon)
- ✅ **Skill Tagging**: Associate skills with certificates
- ✅ **Responsive Design**: Works on all devices
- ✅ **Admin Interface**: Easy management through Sanity CMS

## Example Certificate Entry

```typescript
{
  name: 'Master of Engineering in Urban Planning',
  issuer: 'National Advanced School of Public Works (ENSTP), Yaoundé',
  issueDate: '2023-11-01',
  certificateFile: '/Skills and certificates/MEng-Urban-Planning.pdf',
  thumbnailImage: '/Skills and certificates/MEng-thumbnail.jpg', // Optional
  fileType: 'pdf',
  skills: ['Urban Development', 'Infrastructure Planning', 'Sustainable Design'],
  credentialId: 'ENSTP-UP-2023-001', // Optional
  credentialUrl: 'https://enstp.cm/verify/certificate', // Optional
}
```

## Need Help?

If you need assistance with:
- Converting PDFs to images
- Creating thumbnails
- Configuring certificate entries
- Troubleshooting display issues

Just ask! The system is designed to be flexible and handle various certificate formats.
