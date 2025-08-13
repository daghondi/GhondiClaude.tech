// Core database types
export type ProjectType = 'fine-art' | 'urban-planning' | 'tech-lab'
export type ContentStatus = 'draft' | 'published' | 'archived'
export type ContactStatus = 'new' | 'read' | 'replied' | 'archived'

// Project-related types
export interface Project {
  id: string
  title: string
  slug: string
  subtitle?: string
  description?: string
  content?: string
  excerpt?: string
  status: ContentStatus
  featured: boolean
  featured_image_id?: string
  category_id?: string
  project_type: ProjectType
  start_date?: string
  end_date?: string
  client?: string
  location?: string
  technologies?: string[]
  collaborators?: string[]
  external_links?: Record<string, string>
  meta_title?: string
  meta_description?: string
  social_image_id?: string
  published_at?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface ProjectWithMedia extends Project {
  featured_image?: Media
  social_image?: Media
  gallery?: ProjectMedia[]
  tags?: Tag[]
  category?: Category
}

// Blog-related types
export interface BlogPost {
  id: string
  title: string
  slug: string
  subtitle?: string
  content: string
  excerpt?: string
  status: ContentStatus
  featured: boolean
  featured_image_id?: string
  category_id?: string
  reading_time?: number
  view_count: number
  like_count: number
  comment_count: number
  meta_title?: string
  meta_description?: string
  social_image_id?: string
  published_at?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface BlogPostWithMedia extends BlogPost {
  featured_image?: Media
  social_image?: Media
  tags?: Tag[]
  category?: Category
  comments?: Comment[]
}

// Media types
export interface Media {
  id: string
  filename: string
  original_name?: string
  mime_type?: string
  file_size?: number
  width?: number
  height?: number
  alt_text?: string
  caption?: string
  storage_path: string
  public_url?: string
  metadata?: Record<string, any>
  created_by?: string
  created_at: string
  updated_at: string
}

export interface ProjectMedia {
  id: string
  project_id: string
  media_id: string
  sort_order: number
  caption?: string
  created_at: string
  media?: Media
}

// Category and Tag types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  icon?: string
  parent_id?: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  usage_count: number
  created_at: string
  updated_at: string
}

// Comment types
export interface Comment {
  id: string
  blog_post_id: string
  parent_id?: string
  author_name: string
  author_email: string
  author_website?: string
  content: string
  status: 'pending' | 'approved' | 'spam' | 'rejected'
  ip_address?: string
  user_agent?: string
  created_at: string
  updated_at: string
  replies?: Comment[]
}

// Contact form types
export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  phone?: string
  company?: string
  project_type?: string
  budget_range?: string
  timeline?: string
  status: ContactStatus
  ip_address?: string
  user_agent?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

// User profile types
export interface Profile {
  id: string
  username?: string
  full_name?: string
  bio?: string
  avatar_url?: string
  website?: string
  location?: string
  created_at: string
  updated_at: string
}

// Analytics types
export interface AnalyticsRecord {
  id: string
  path: string
  referrer?: string
  user_agent?: string
  ip_address?: string
  country?: string
  device_type?: string
  browser?: string
  os?: string
  session_id?: string
  user_id?: string
  duration?: number
  created_at: string
}

// Site settings types
export interface SiteSetting {
  id: string
  key: string
  value?: any
  description?: string
  type: 'string' | 'number' | 'boolean' | 'json' | 'text'
  created_at: string
  updated_at: string
}

// API response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
  phone?: string
  company?: string
  project_type?: ProjectType
  budget_range?: string
  timeline?: string
}

export interface NewsletterFormData {
  email: string
  name?: string
}

export interface CommentFormData {
  author_name: string
  author_email: string
  author_website?: string
  content: string
  parent_id?: string
}

// Search types
export interface SearchResult {
  id: string
  type: 'project' | 'blog-post'
  title: string
  excerpt?: string
  slug: string
  published_at?: string
  featured_image?: string
  project_type?: ProjectType
}

export interface SearchFilters {
  query?: string
  type?: 'project' | 'blog-post' | 'all'
  project_type?: ProjectType
  category?: string
  tags?: string[]
  date_from?: string
  date_to?: string
}

// Navigation types
export interface NavigationItem {
  label: string
  href: string
  icon?: string
  children?: NavigationItem[]
  external?: boolean
}

// Theme types
export interface ThemeColors {
  primary: string
  secondary: string
  accent: {
    blue: string
    magenta: string
    gold: string
    indigo: string
  }
  dark: {
    primary: string
    secondary: string
    tertiary: string
    quaternary: string
  }
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export interface CardProps {
  variant?: 'default' | 'hover' | 'glass'
  className?: string
  children: React.ReactNode
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

// Portfolio specific types
export interface PortfolioFilter {
  type?: ProjectType
  category?: string
  tags?: string[]
  featured?: boolean
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
}

// Meta types for SEO
export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

// Animation types
export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

// Utility types
export type Nullable<T> = T | null
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Event types
export interface CustomEvent<T = any> {
  type: string
  data?: T
  timestamp: number
}
