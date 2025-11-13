# 🚀 Deploy in 5 Simple Steps

## What You Need to Do:

I can't access Railway directly, but here's the SIMPLEST way:

---

## 📱 **Step 1: Open Railway**
Click this link: https://railway.app/new

**What to do:**
- Click "Login with GitHub"
- Authorize Railway

---

## 📦 **Step 2: Deploy Your Repo**
**What to do:**
- Click "Deploy from GitHub repo"
- Find and click "harshkuhikar/WhatsApp-CRM"
- Wait 2 minutes (Railway will auto-deploy)

---

## 🔑 **Step 3: Add These Variables**
Click "Variables" tab, then add these (copy-paste):

```
MONGODB_URI=mongodb+srv://admin:Admin123@cluster0.mongodb.net/whatsapp_crm
DATABASE_NAME=whatsapp_crm
JWT_SECRET=whatsapp_crm_secret_key_2024
WHATSAPP_TOKEN=temp_token
PHONE_NUMBER_ID=1234567890
VERIFY_TOKEN=my_verify_token
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
PORT=8000
```

**How to add:**
- Click "+ New Variable"
- Paste the name (e.g., MONGODB_URI)
- Paste the value
- Click "Add"
- Repeat for all variables

---

## 🌐 **Step 4: Get Your URL**
**What to do:**
- Click "Settings" tab
- Scroll to "Domains"
- Click "Generate Domain"
- **COPY THE URL** (e.g., `https://whatsapp-crm-production-abc.up.railway.app`)

---

## ✅ **Step 5: Update Vercel**
Go to: https://vercel.com/dashboard

**What to do:**
1. Click your "whats-app-crm" project
2. Click "Settings" → "Environment Variables"
3. Add these TWO variables:

**Variable 1:**
- Name: `VITE_API_URL`
- Value: Your Railway URL (paste it)

**Variable 2:**
- Name: `VITE_WS_URL`
- Value: Same URL but change `https://` to `wss://`

4. Click "Deployments" → Click "..." → "Redeploy"

---

## 🎉 **DONE!**

Wait 2 minutes, then visit: https://whats-app-crm-kappa.vercel.app

**Test it:**
- Click "Sign Up"
- Create account
- Login
- It should work! ✅

---

## 🆘 Need Help?

**Tell me which step you're stuck on:**
1. Can't login to Railway?
2. Can't find your repo?
3. Don't know how to add variables?
4. Can't get the URL?
5. Vercel not working?

I'll help you through it! 💪

---

## 📹 Video Tutorial

If you prefer video, search YouTube for:
"How to deploy Python FastAPI to Railway"

Or follow this exact guide: https://docs.railway.app/guides/fastapi

---

**Estimated Time: 10 minutes** ⏱️
