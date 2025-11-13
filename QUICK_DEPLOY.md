# Quick Deployment Guide

## ✅ Code is now on GitHub!
Repository: https://github.com/harshkuhikar/WhatsApp-CRM

## 🚀 Deploy to Vercel (Frontend) - 5 Minutes

### Step 1: Deploy Frontend to Vercel

1. Go to **https://vercel.com**
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select **"harshkuhikar/WhatsApp-CRM"**
5. Vercel will auto-detect Vite ✅
6. Click **"Deploy"**

That's it for the frontend! You'll get a URL like: `https://whatsapp-crm-xyz.vercel.app`

### Step 2: Deploy Backend to Railway (Free & Easy)

1. Go to **https://railway.app**
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose **"harshkuhikar/WhatsApp-CRM"**
6. Railway will auto-detect Python ✅

### Step 3: Add Environment Variables to Railway

Click on your project → Variables → Add these:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=whatsapp_crm
JWT_SECRET=your_super_secret_key_12345
WHATSAPP_TOKEN=your_whatsapp_token
PHONE_NUMBER_ID=your_phone_id
VERIFY_TOKEN=your_verify_token
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
```

**Don't have MongoDB?** Get free MongoDB Atlas:
- Go to https://www.mongodb.com/cloud/atlas
- Create free cluster (takes 2 minutes)
- Get connection string
- Replace in MONGODB_URI above

### Step 4: Connect Frontend to Backend

1. Go back to **Vercel Dashboard**
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - Name: `VITE_API_URL`
   - Value: Your Railway URL (e.g., `https://your-app.railway.app`)
   - Name: `VITE_WS_URL`
   - Value: Your Railway WebSocket URL (e.g., `wss://your-app.railway.app`)

5. Go to **Deployments** → Click **"..."** → **"Redeploy"**

## 🎉 Done! Your App is Live!

Visit your Vercel URL and start using your WhatsApp CRM!

## 📱 Quick Test

1. Open your Vercel URL
2. Click "Sign Up"
3. Create an account
4. Add a contact
5. Try sending a message

## 🔧 Troubleshooting

### Frontend loads but can't connect to backend?
- Check VITE_API_URL in Vercel environment variables
- Make sure Railway backend is running
- Check Railway logs for errors

### Can't login?
- Check JWT_SECRET is set in Railway
- Check MongoDB connection string is correct

### Messages not sending?
- You need valid WhatsApp Business API credentials
- Get them from: https://developers.facebook.com/docs/whatsapp

## 💡 Alternative: Deploy Backend to Render.com

If Railway doesn't work, use Render:

1. Go to **https://render.com**
2. New → **Web Service**
3. Connect GitHub repo
4. Settings:
   - Environment: **Python 3**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add same environment variables
6. Deploy!

## 📊 What You Get

- ✅ Professional WhatsApp Business CRM
- ✅ Bulk messaging to unlimited contacts
- ✅ Campaign management
- ✅ Real-time chat
- ✅ Analytics dashboard
- ✅ Message templates
- ✅ Contact management
- ✅ Free hosting (Vercel + Railway free tiers)

## 🎯 Next Steps

1. Get WhatsApp Business API credentials
2. Configure your phone number
3. Import your contacts
4. Start sending campaigns!

## 📞 Need Help?

Open an issue on GitHub: https://github.com/harshkuhikar/WhatsApp-CRM/issues

---

**Estimated Total Time: 10-15 minutes** ⏱️
