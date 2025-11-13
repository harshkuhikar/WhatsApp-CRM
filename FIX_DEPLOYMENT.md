# Fix Deployment Error - Step by Step

## Problem
Your frontend on Vercel is trying to connect to `localhost:8000` which doesn't exist in production.

## Solution - Deploy Backend (5 minutes)

### Step 1: Deploy Backend to Railway

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose **"harshkuhikar/WhatsApp-CRM"**
6. Railway will detect Python automatically ✅

### Step 2: Add Environment Variables in Railway

Click on your project → **Variables** tab → Add these:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp_crm
DATABASE_NAME=whatsapp_crm
JWT_SECRET=your_super_secret_key_change_this_12345
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
WHATSAPP_TOKEN=your_whatsapp_token_here
PHONE_NUMBER_ID=your_phone_number_id
VERIFY_TOKEN=your_verify_token
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
PORT=8000
```

**Don't have MongoDB?** Get it free:
- Go to https://cloud.mongodb.com
- Create free cluster (M0)
- Click "Connect" → "Connect your application"
- Copy connection string
- Replace `<password>` with your password
- Use this as MONGODB_URI

### Step 3: Wait for Deployment

Railway will automatically deploy. Wait 2-3 minutes.

You'll get a URL like: `https://whatsapp-crm-production-xxxx.up.railway.app`

**Copy this URL!**

### Step 4: Update Vercel Environment Variables

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Select your **"WhatsApp-CRM"** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

   **Variable 1:**
   - Name: `VITE_API_URL`
   - Value: `https://your-railway-url.railway.app` (paste your Railway URL)
   - Environment: Production, Preview, Development

   **Variable 2:**
   - Name: `VITE_WS_URL`
   - Value: `wss://your-railway-url.railway.app` (same URL but with wss://)
   - Environment: Production, Preview, Development

5. Click **"Save"**

### Step 5: Redeploy Frontend

1. Still in Vercel Dashboard
2. Go to **"Deployments"** tab
3. Click the **"..."** menu on the latest deployment
4. Click **"Redeploy"**
5. Check **"Use existing Build Cache"** (optional)
6. Click **"Redeploy"**

Wait 1-2 minutes for redeployment.

### Step 6: Test Your App

1. Visit your Vercel URL: `https://whats-app-crm-kappa.vercel.app`
2. Click **"Sign Up"**
3. Create account with:
   - Name: Admin
   - Email: admin@gmail.com
   - Password: Admin@123
   - Role: Admin
4. Click **"Sign Up"**
5. Then **"Login"** with same credentials

✅ **It should work now!**

---

## Alternative: Deploy Backend to Render.com

If Railway doesn't work, use Render:

1. Go to https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub → Select your repo
4. Configure:
   - **Name**: whatsapp-crm-backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add same environment variables
6. Click **"Create Web Service"**
7. Copy the URL (e.g., `https://whatsapp-crm-backend.onrender.com`)
8. Update Vercel environment variables with this URL
9. Redeploy Vercel

---

## Troubleshooting

### "MongoDB connection failed"
- Check your MongoDB Atlas IP whitelist
- Go to MongoDB Atlas → Network Access
- Add IP: `0.0.0.0/0` (allow all)

### "CORS error"
- Make sure backend is deployed and running
- Check Railway/Render logs for errors
- Verify VITE_API_URL is correct in Vercel

### "Still showing localhost"
- Clear browser cache (Ctrl + Shift + R)
- Check Vercel environment variables are set
- Make sure you redeployed after adding variables

### "Backend not responding"
- Check Railway/Render logs
- Make sure all environment variables are set
- Verify MongoDB connection string is correct

---

## Quick Checklist

- [ ] Backend deployed to Railway/Render
- [ ] MongoDB Atlas cluster created
- [ ] All environment variables added to Railway/Render
- [ ] Backend URL copied
- [ ] VITE_API_URL added to Vercel
- [ ] VITE_WS_URL added to Vercel
- [ ] Frontend redeployed on Vercel
- [ ] Tested signup/login

---

## Need Help?

1. Check Railway logs: Railway Dashboard → Your Project → Logs
2. Check Vercel logs: Vercel Dashboard → Your Project → Deployments → View Function Logs
3. Open browser console (F12) to see errors
4. Create issue on GitHub: https://github.com/harshkuhikar/WhatsApp-CRM/issues

---

**Estimated Time: 10 minutes** ⏱️

Once done, your app will be fully functional on:
- Frontend: https://whats-app-crm-kappa.vercel.app
- Backend: https://your-app.railway.app
