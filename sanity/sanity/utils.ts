import { client } from './config'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Helper function to use the current url-builder instance
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Query helpers
export async function getProjects(projectType?: string) {
  const typeFilter = projectType ? `&& projectType == "${projectType}"` : ''
  const query = `
    *[_type == "project" && status == "published" ${typeFilter}] | order(publishedAt desc) {
      _id,
      title,
      slug,
      subtitle,
      excerpt,
      projectType,
      featured,
      featuredImage,
      startDate,
      endDate,
      client,
      location,
      technologies,
      tags[]->{name, slug, color},
      category->{name, slug, color},
      publishedAt
    }
  `
  return await client.fetch(query)
}

export async function getProject(slug: string) {
  const query = `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      subtitle,
      description,
      content,
      excerpt,
      projectType,
      featured,
      featuredImage,
      gallery,
      startDate,
      endDate,
      client,
      location,
      technologies,
      collaborators,
      externalLinks,
      tags[]->{name, slug, color},
      category->{name, slug, color},
      metaTitle,
      metaDescription,
      publishedAt
    }
  `
  return await client.fetch(query, { slug })
}

export async function getBlogPosts() {
  const query = `
    *[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      subtitle,
      excerpt,
      featured,
      featuredImage,
      readingTime,
      tags[]->{name, slug, color},
      category->{name, slug, color},
      author->{name, slug, avatar},
      publishedAt
    }
  `
  return await client.fetch(query)
}

export async function getBlogPost(slug: string) {
  const query = `
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      subtitle,
      content,
      excerpt,
      featured,
      featuredImage,
      readingTime,
      tags[]->{name, slug, color},
      category->{name, slug, color},
      author->{name, slug, bio, avatar, socialLinks},
      metaTitle,
      metaDescription,
      publishedAt
    }
  `
  return await client.fetch(query, { slug })
}

export async function getFeaturedProjects() {
  const query = `
    *[_type == "project" && status == "published" && featured == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      subtitle,
      excerpt,
      projectType,
      featuredImage,
      tags[]->{name, slug, color},
      publishedAt
    }
  `
  return await client.fetch(query)
}

export async function getFeaturedBlogPosts() {
  const query = `
    *[_type == "blogPost" && status == "published" && featured == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      subtitle,
      excerpt,
      featuredImage,
      readingTime,
      author->{name, slug, avatar},
      publishedAt
    }
  `
  return await client.fetch(query)
}

export async function getCategories() {
  const query = `
    *[_type == "category"] | order(sortOrder asc, name asc) {
      _id,
      name,
      slug,
      description,
      color,
      icon
    }
  `
  return await client.fetch(query)
}

export async function getTags() {
  const query = `
    *[_type == "tag"] | order(name asc) {
      _id,
      name,
      slug,
      description,
      color
    }
  `
  return await client.fetch(query)
}

export async function getSiteSettings() {
  const query = `
    *[_type == "siteSettings"][0] {
      title,
      description,
      keywords,
      logo,
      favicon,
      socialImage,
      professionalHeadshot,
      socialLinks,
      contactInfo,
      theme,
      globalContent,
      footerContent,
      homepageContent,
      aboutPageContent,
      contactPageContent,
      blogPageContent,
      workPageContent,
      analytics
    }
  `
  return await client.fetch(query)
}

// Helper function to get specific page content
export async function getPageContent(pageName: string) {
  const settings = await getSiteSettings()
  return settings?.[`${pageName}PageContent`] || {}
}

// Search functionality
export async function searchContent(searchTerm: string) {
  const query = `
    {
      "projects": *[_type == "project" && status == "published" && (
        title match $searchTerm + "*" ||
        excerpt match $searchTerm + "*" ||
        pt::text(content) match $searchTerm + "*"
      )] | order(publishedAt desc) [0...6] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        featuredImage,
        projectType
      },
      "blogPosts": *[_type == "blogPost" && status == "published" && (
        title match $searchTerm + "*" ||
        excerpt match $searchTerm + "*" ||
        pt::text(content) match $searchTerm + "*"
      )] | order(publishedAt desc) [0...6] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        featuredImage,
        readingTime
      }
    }
  `
  return await client.fetch(query, { searchTerm })
}
