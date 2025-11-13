# Deployment Guide for Vercel

## Overview
This project consists of two parts:
1. **Frontend** (React + Vite) - Will be deployed to Vercel
2. **Backend** (FastAPI + Python) - Needs to be deployed separately

## Option 1: Deploy Frontend to Vercel + Backend to Railway/Render

### Step 1: Deploy Backend to Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Python
5. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   DATABASE_NAME=whatsapp_crm
   JWT_SECRET=your_secret_key
   WHATSAPP_TOKEN=your_token
   PHONE_NUMBER_ID=your_phone_id
   VERIFY_TOKEN=your_verify_token
   WHATSAPP_API_URL=https://graph.facebook.com/v18.0
   ```
6. Deploy! You'll get a URL like: `https://your-app.railway.app`

### Step 2: Update Frontend API URL

1. Create `src/config.js`:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
```

2. Update `src/context/AuthContext.jsx`:
```javascript
import { API_URL } from '../config'
// Replace: const API_URL = 'http://localhost:8000'
```

3. Create `.env.production`:
```
VITE_API_URL=https://your-backend.railway.app
```

### Step 3: Deploy Frontend to Vercel

1. Push code to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite
6. Add environment variable:
   - `VITE_API_URL` = Your Railway backend URL
7. Click "Deploy"

## Option 2: Deploy Everything to Vercel (Recommended for Simple Setup)

### Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Whitelist all IPs (0.0.0.0/0) for Vercel

### Step 2: Deploy to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to https://vercel.com
3. Import your repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. Add Environment Variables:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
DATABASE_NAME=whatsapp_crm
JWT_SECRET=your_super_secret_key_change_this
WHATSAPP_TOKEN=your_whatsapp_token
PHONE_NUMBER_ID=your_phone_number_id
VERIFY_TOKEN=your_verify_token
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
```

6. Deploy!

### Step 3: Deploy Backend Separately

Since Vercel has limitations with Python WebSockets, deploy backend to:

**Railway.app** (Recommended):
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

**Or Render.com**:
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Configure:
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy

## Post-Deployment

### Update Frontend API URL

After deploying backend, update the frontend:

1. In Vercel dashboard → Settings → Environment Variables
2. Add: `VITE_API_URL` = Your backend URL
3. Redeploy frontend

### Test Your Deployment

1. Visit your Vercel URL
2. Sign up for an account
3. Add contacts
4. Test messaging features

## Troubleshooting

### CORS Issues
Make sure your backend allows your Vercel domain:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-app.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### WebSocket Issues
WebSockets need a persistent connection. Use Railway or Render for backend, not Vercel serverless.

### MongoDB Connection
Use MongoDB Atlas with IP whitelist 0.0.0.0/0 for serverless deployments.

## Environment Variables Reference

### Required for Backend:
- `MONGODB_URI` - MongoDB connection string
- `DATABASE_NAME` - Database name
- `JWT_SECRET` - Secret for JWT tokens
- `WHATSAPP_TOKEN` - WhatsApp Business API token
- `PHONE_NUMBER_ID` - WhatsApp phone number ID
- `VERIFY_TOKEN` - Webhook verification token

### Required for Frontend:
- `VITE_API_URL` - Backend API URL

## Quick Deploy Commands

```bash
# Build frontend locally to test
npm run build

# Test production build
npm run preview

# Push to GitHub
git add .
git commit -m "Deploy to production"
git push origin main
```

## Support

For issues, check:
- Vercel deployment logs
- Railway/Render logs
- Browser console for frontend errors
- Network tab for API calls
