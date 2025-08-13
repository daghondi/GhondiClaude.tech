# GhondiClaude.me: Multi-Dimensional Creative Portfolio Platform

A sophisticated, multi-page portfolio website showcasing Ghondi Claude's unique trinity of expertise: Fine Artist, Urban Planner (MEng), and Tech Enthusiast. The platform serves as both a professional portfolio and an expressive digital archive, combining artistic depth with technical innovation.

## 🎨 Project Overview

GhondiClaude.me creates an immersive, poetic experience that reflects the intersection of creativity, urban vision, and technological exploration. The platform addresses the need for creative professionals to present their multidisciplinary work in a cohesive, engaging format that goes beyond traditional portfolio sites.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for page transitions and interactions
- **3D Graphics**: Three.js for interactive elements
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with validation
- **Image Handling**: Next.js Image component with optimization

### Backend & Data Management
- **Database**: Supabase (PostgreSQL) for blog content and metadata
- **File Storage**: Supabase Storage for images and documents
- **Authentication**: Supabase Auth for admin access
- **API Routes**: Next.js API routes for dynamic content
- **Content Processing**: Markdown parsing with syntax highlighting

### Performance & SEO
- **Image Optimization**: WebP format with fallbacks
- **Caching Strategy**: Static generation with ISR where appropriate
- **Bundle Optimization**: Code splitting and tree shaking
- **SEO Tools**: Next.js SEO, structured data, sitemap generation
- **Analytics**: Privacy-focused analytics implementation

## 📁 Project Structure

```
GhondiClaude.me/
├── frontend/                 # Next.js application
├── backend/                  # API routes and server logic
├── database/                 # Supabase migrations and seeds
├── docs/                     # Documentation and design assets
├── scripts/                  # Build and deployment scripts
└── public/                   # Static assets shared across the app
```

## 🎯 Key Features

### Core Sections
- **Homepage**: Poetic hero section with identity showcase
- **Fine Art Portfolio**: High-resolution gallery with artwork metadata
- **Urban Planning Portfolio**: Project visualizations and case studies
- **Tech Lab**: Interactive previews and code showcases
- **Blog/Journal**: Markdown-based content management system
- **Contact & About**: Professional contact and collaboration features

### Interactive Elements
- Dark theme with neon accent colors
- Smooth page transitions and scroll animations
- AR integration for portfolio pieces
- 3D visualizations for urban planning projects
- Advanced filtering and search functionality

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/daghondi/GhondiClaude.me.git
cd GhondiClaude.me
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Add your Supabase credentials and other environment variables
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗃️ Database Setup

1. Create a new Supabase project
2. Run the database migrations:
```bash
cd database
npx supabase db push
```

3. Seed the database with initial data:
```bash
npx supabase db seed
```

## 📊 Content Management

The platform uses a headless CMS approach with Supabase for dynamic content:
- Blog posts and articles
- Portfolio project metadata
- Contact form submissions
- User analytics and engagement tracking

## 🎨 Design System

### Color Palette
- **Core Dark**: `#1E1E1E`, `#121212`
- **Accent Colors**: Neon blue (`#1E90FF`), magenta (`#FF00FF`), gold (`#FFD700`), indigo (`#4B0082`)

### Typography
- **Headings**: Futura (bold, modern)
- **Body**: Playfair Display, Lora, or Raleway

## 📱 Responsive Design

Mobile-first approach with breakpoint system:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🚢 Deployment

### Frontend (Vercel)
```bash
npm run build
npm run start
```

### Database (Supabase)
- Automatic deployment via Supabase CLI
- Environment-specific configurations

## 📈 Performance Targets

- **Page Load Time**: < 2 seconds for initial load
- **Lighthouse Score**: 90+ for Performance, Accessibility, SEO
- **Mobile Performance**: Optimized for 3G connections
- **Image Loading**: Progressive loading with blur placeholders

## 🔒 Security & Privacy

- HTTPS enforcement
- Input validation and sanitization
- GDPR compliance for user data
- Secure authentication for admin access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📞 Contact

Ghondi Claude - [contact@ghondiclaude.me](mailto:contact@ghondiclaude.me)

Project Link: [https://github.com/daghondi/GhondiClaude.me](https://github.com/daghondi/GhondiClaude.me)

---

*"A living constellation of creativity, urban vision, and technological exploration."*
# Deploy Trigger 08/13/2025 20:26:43
