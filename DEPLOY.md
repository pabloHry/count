# 🚀 Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this code to GitHub
2. Click the button above or go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd countdown-gif-api/my-app
vercel --prod
```

### Option 3: Git Integration

1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository at [vercel.com](https://vercel.com)
3. Vercel auto-deploys on every push

## Post-Deployment

Once deployed, you'll get a URL like:
```
https://your-project.vercel.app
```

Your countdown GIF API will be at:
```
https://your-project.vercel.app/api/countdown-gif
```

## Testing the API

Open in browser:
```
https://your-project.vercel.app/api/countdown-gif
```

Or test with curl:
```bash
curl -v https://your-project.vercel.app/api/countdown-gif > countdown.gif
```

## Updating the Target Date

1. Edit `src/app/api/countdown-gif/route.ts`
2. Change `TARGET_DATE` constant
3. Commit and push - Vercel auto-deploys!

## Troubleshooting

### Build Errors

If you see native module errors, ensure:
- Using Node.js 18+ on Vercel (set in project settings)
- `skia-canvas` is in dependencies (not devDependencies)

### GIF Not Updating in Email

Some email clients cache images aggressively:
- Gmail: Adds cache-busting automatically
- Outlook: May cache for hours
- Apple Mail: Usually respects cache headers

Add cache-busting query param:
```html
<img src="https://your-domain.com/api/countdown-gif?t=123456" />
```

### Function Timeout

GIF generation takes ~100-300ms. If hitting timeouts:
- Reduce `frames` parameter (default: 60)
- Reduce `width`/`height` parameters
