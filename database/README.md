# Database Setup for GhondiClaude.tech

This directory contains database migrations, seeds, and configuration for the Supabase backend.

## Structure

- `migrations/` - Database schema migrations
- `seeds/` - Initial data for development and testing
- `types/` - TypeScript type definitions for database tables
- `schemas/` - Database schema documentation

## Setup Instructions

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Initialize the project:
```bash
supabase init
```

4. Link to your Supabase project:
```bash
supabase link --project-ref your-project-ref
```

5. Apply migrations:
```bash
supabase db push
```

6. Seed the database:
```bash
supabase db seed
```

## Database Schema Overview

### Core Tables

- `profiles` - User profiles and authentication data
- `projects` - Portfolio projects across all disciplines
- `blog_posts` - Blog articles and journal entries
- `categories` - Project and blog categorization
- `tags` - Flexible tagging system
- `media` - Image and file storage references
- `comments` - Blog comments (if enabled)
- `analytics` - Page views and engagement tracking

### Content Management

- `pages` - Static page content
- `navigation` - Site navigation structure
- `settings` - Site-wide configuration
- `contact_submissions` - Contact form submissions
