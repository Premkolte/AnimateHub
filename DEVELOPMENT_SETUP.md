# 🚀 Development Setup Guide

## Quick Start for Contributors

### 1. Clone and Install
```bash
git clone <repo-url>
cd <project-name>
npm install
```

### 2. Environment Variables Setup
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your values or use placeholder values for development
```

### 3. Common Environment Variables Patterns

#### For Clerk Authentication (this project):
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

#### For GitHub API:
```env
VITE_GITHUB_TOKEN=your_github_token_here
```

#### For Analytics:
```env
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

### 4. Development vs Production

**For Development**: 
- You can use placeholder values
- Some features may be disabled
- Authentication might be bypassed

**For Production**: 
- All API keys must be real
- All features should work
- Security is enforced

### 5. Running the Project
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

### 6. Common Issues and Solutions

#### "Missing Publishable Key" Error:
- Check if .env file exists
- Verify environment variable names match
- Restart dev server after .env changes

#### Blank Page:
- Check browser console for errors
- Verify all dependencies are installed
- Check if API services are configured

#### Authentication Issues:
- Clerk: Sign up at https://clerk.com
- Get publishable key from dashboard
- Add to .env file

### 7. Before Committing Changes:
1. Remove any temporary development code
2. Don't commit .env file (it's in .gitignore)
3. Test with production-like environment
4. Update documentation if needed

## Project-Specific Notes:
- This project uses Clerk for authentication
- Protected routes require login in production
- GitHub API is used for contributors page
- Tailwind CSS for styling
- Vite as build tool
