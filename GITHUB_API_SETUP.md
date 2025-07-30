# GitHub API Setup Guide

## Problem: GitHub API Rate Limiting

The GitHub API limits unauthenticated requests to **60 per hour per IP**. On hosted platforms like Vercel, this limit is quickly exceeded, causing the contributors list to fail loading.

## Solution: GitHub Personal Access Token

By adding authentication, you can increase the rate limit to **5000 requests per hour**.

### Step-by-Step Setup:

#### 1. Generate GitHub Token
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name: "AnimateHub Contributors API"
4. Set expiration as needed (recommend 1 year)
5. Select scopes: **Only check `public_repo`** (for reading public repository data)
6. Click "Generate token"
7. **IMPORTANT**: Copy the token immediately (you won't see it again)

#### 2. Add Token to Environment Variables

**For Local Development:**
1. Create `.env` file in your project root:
```bash
VITE_GITHUB_TOKEN=ghp_your_token_here
```

**For Vercel Deployment:**
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add new variable:
   - Name: `VITE_GITHUB_TOKEN`
   - Value: `ghp_your_token_here`
   - Environment: Production, Preview, Development
4. Redeploy your application

#### 3. Environment Variables are Automatically Used

The Contributors.jsx component automatically uses the environment variable. No code changes needed after setting up the token!

```javascript
// This is already implemented in the code:
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
if (GITHUB_TOKEN) {
  headers['Authorization'] = `token ${GITHUB_TOKEN}`;
}
```

### Security Notes:
- Never commit tokens to your repository
- Use environment variables for all deployments
- The token only needs `public_repo` scope for reading public data
- Consider token rotation every 6-12 months

### Rate Limits Comparison:
- **Without token**: 60 requests/hour
- **With token**: 5000 requests/hour
- **Current app usage**: ~1-2 requests per user session

This setup will ensure your contributors page works reliably on both local development and production!
