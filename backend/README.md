# Backend API Structure for GhondiClaude.tech

This directory contains server-side logic, API routes, and backend utilities for the portfolio platform.

## Structure

- `api/` - API route handlers and middleware
- `lib/` - Shared backend utilities and configurations
- `types/` - TypeScript type definitions for backend
- `utils/` - Helper functions and utilities
- `services/` - Business logic and external service integrations

## API Routes

The backend uses Next.js API routes located in the `frontend/app/api/` directory:

### Core API Endpoints

- `GET /api/projects` - List all published projects
- `GET /api/projects/[slug]` - Get project by slug
- `GET /api/blog` - List all published blog posts
- `GET /api/blog/[slug]` - Get blog post by slug
- `POST /api/contact` - Handle contact form submissions
- `GET /api/search` - Search across projects and blog posts
- `GET /api/analytics` - Get analytics data (admin only)

### Admin API Endpoints

- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects/[id]` - Update project
- `DELETE /api/admin/projects/[id]` - Delete project
- `POST /api/admin/blog` - Create new blog post
- `PUT /api/admin/blog/[id]` - Update blog post
- `DELETE /api/admin/blog/[id]` - Delete blog post
- `POST /api/admin/media` - Upload media files
- `GET /api/admin/analytics` - Get detailed analytics

### Media API Endpoints

- `POST /api/media/upload` - Upload single file
- `POST /api/media/upload-multiple` - Upload multiple files
- `GET /api/media/[id]` - Get media metadata
- `DELETE /api/media/[id]` - Delete media file

## Authentication

The backend uses Supabase Auth for authentication and authorization:

- Public routes: Projects, blog posts, contact form
- Admin routes: Content management, analytics, media upload
- JWT token validation for protected routes

## Data Validation

All API endpoints use Zod for runtime type validation and sanitization.

## Error Handling

Standardized error responses with appropriate HTTP status codes and error messages.

## Rate Limiting

API routes are protected with rate limiting to prevent abuse.

## Caching

Appropriate caching strategies for static content and dynamic data.
