# Contributing to GhondiClaude.tech

Thank you for your interest in contributing to GhondiClaude.tech! This document provides guidelines for contributing to this multi-dimensional creative portfolio platform.

## Code of Conduct

This project adheres to a code of conduct that promotes an inclusive and welcoming environment for all contributors. Please be respectful and professional in all interactions.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Supabase account (for database)

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/GhondiClaude.tech.git
   cd GhondiClaude.tech
   ```

3. Run the setup script:
   ```bash
   ./scripts/setup-dev.ps1
   ```

4. Set up environment variables:
   ```bash
   cp frontend/.env.example frontend/.env.local
   # Update .env.local with your Supabase credentials
   ```

5. Start the development server:
   ```bash
   cd frontend
   npm run dev
   ```

## Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `hotfix/*` - Critical bug fixes

### Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (no logic changes)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

Examples:
```
feat(portfolio): add project filtering functionality
fix(contact): resolve form validation issue
docs(readme): update installation instructions
```

### Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes
3. Write or update tests as needed
4. Ensure all tests pass: `npm test`
5. Run linting: `npm run lint`
6. Update documentation if needed
7. Submit a pull request to `develop`

### Pull Request Guidelines

- Provide a clear title and description
- Reference any related issues
- Include screenshots for UI changes
- Ensure CI checks pass
- Request review from maintainers

## Development Standards

### Code Style

- Follow ESLint configuration
- Use Prettier for code formatting
- Follow TypeScript best practices
- Write meaningful variable and function names
- Add comments for complex logic

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the established component structure
- Write reusable, composable components
- Use proper prop validation

### Testing

- Write unit tests for utilities and hooks
- Add integration tests for critical user flows
- Maintain good test coverage
- Use meaningful test descriptions

### Accessibility

- Follow WCAG 2.1 AA guidelines
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

## Project Structure

```
GhondiClaude.tech/
├── frontend/           # Next.js application
│   ├── app/           # App Router pages
│   ├── components/    # React components
│   ├── lib/          # Utilities and configurations
│   └── types/        # TypeScript definitions
├── backend/          # API logic and utilities
├── database/         # Supabase migrations and seeds
├── docs/            # Documentation
├── scripts/         # Build and deployment scripts
└── public/          # Static assets
```

## Issue Reporting

### Bug Reports

Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser/device information
- Screenshots or screen recordings

### Feature Requests

Include:
- Clear description of the feature
- Use case and benefits
- Potential implementation approach
- Mockups or examples (if applicable)

## Documentation

- Update README.md for significant changes
- Document new features and APIs
- Keep code comments up to date
- Add JSDoc comments for functions

## Design Guidelines

### Visual Design

- Follow the established dark theme with neon accents
- Use the defined color palette and typography
- Maintain consistency with existing components
- Consider mobile-first responsive design

### User Experience

- Prioritize accessibility and usability
- Ensure smooth animations and transitions
- Maintain fast loading times
- Provide clear navigation and feedback

## Release Process

1. Feature freeze on `develop` branch
2. Create release candidate
3. Testing and bug fixes
4. Merge to `main`
5. Tag release
6. Deploy to production

## Getting Help

- Check existing issues and discussions
- Join our community discussions
- Contact maintainers for complex questions
- Review documentation and code examples

## Recognition

Contributors will be acknowledged in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation

Thank you for contributing to GhondiClaude.tech! 🎨🏙️💻
