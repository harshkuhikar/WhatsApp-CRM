# Railway Setup - Exact Steps

## Step 1: Open Railway (I already opened it for you)

Go to: https://railway.app

## Step 2: Sign Up / Login

Click **"Login"** button (top right)
→ Choose **"Login with GitHub"**
→ Authorize Railway

## Step 3: Create New Project

Click **"New Project"** button (big purple button)

## Step 4: Deploy from GitHub

Click **"Deploy from GitHub repo"**

You'll see a list of your repositories.

Find and click: **"harshkuhikar/WhatsApp-CRM"**

## Step 5: Wait for Initial Deploy

Railway will:
- ✅ Detect Python
- ✅ Install dependencies
- ✅ Start building

This takes 2-3 minutes. You'll see logs scrolling.

## Step 6: Add Environment Variables

Once deployed, click on your project name.

Click the **"Variables"** tab (left sidebar)

Click **"+ New Variable"** and add these ONE BY ONE:

### Variable 1:
- **Key**: `MONGODB_URI`
- **Value**: `mongodb+srv://admin:Admin123@cluster0.mongodb.net/whatsapp_crm?retryWrites=true&w=majority`
- Click **"Add"**

### Variable 2:
- **Key**: `DATABASE_NAME`
- **Value**: `whatsapp_crm`
- Click **"Add"**

### Variable 3:
- **Key**: `JWT_SECRET`
- **Value**: `whatsapp_crm_secret_key_2024_production_harsh`
- Click **"Add"**

### Variable 4:
- **Key**: `JWT_ALGORITHM`
- **Value**: `HS256`
- Click **"Add"**

### Variable 5:
- **Key**: `ACCESS_TOKEN_EXPIRE_MINUTES`
- **Value**: `1440`
- Click **"Add"**

### Variable 6:
- **Key**: `WHATSAPP_TOKEN`
- **Value**: `temporary_token_replace_later`
- Click **"Add"**

### Variable 7:
- **Key**: `PHONE_NUMBER_ID`
- **Value**: `1234567890`
- Click **"Add"**

### Variable 8:
- **Key**: `VERIFY_TOKEN`
- **Value**: `my_verify_token_2024`
- Click **"Add"**

### Variable 9:
- **Key**: `WHATSAPP_API_URL`
- **Value**: `https://graph.facebook.com/v18.0`
- Click **"Add"**

### Variable 10:
- **Key**: `PORT`
- **Value**: `8000`
- Click **"Add"**

## Step 7: Redeploy

After adding all variables:
- Click **"Deployments"** tab (left sidebar)
- Click **"Deploy"** button (top right)

Wait 2 minutes for redeployment.

## Step 8: Get Your Backend URL

Once deployed successfully:
- Click **"Settings"** tab (left sidebar)
- Scroll down to **"Domains"** section
- Click **"Generate Domain"**
- Copy the URL (looks like: `https://whatsapp-crm-production-xxxx.up.railway.app`)

**SAVE THIS URL!** You need it for the next step.

## Step 9: Update Vercel

Now go to: https://vercel.com/dashboard

1. Click on your **"whats-app-crm"** project
2. Click **"Settings"** (top menu)
3. Click **"Environment Variables"** (left sidebar)
4. Click **"Add New"**

### Add Variable 1:
- **Key**: `VITE_API_URL`
- **Value**: Paste your Railway URL (from Step 8)
- Select: **Production**, **Preview**, **Development**
- Click **"Save"**

### Add Variable 2:
- **Key**: `VITE_WS_URL`
- **Value**: Same Railway URL but change `https://` to `wss://`
  - Example: `wss://whatsapp-crm-production-xxxx.up.railway.app`
- Select: **Production**, **Preview**, **Development**
- Click **"Save"**

## Step 10: Redeploy Vercel

1. Click **"Deployments"** (top menu)
2. Find the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Click **"Redeploy"** again to confirm

Wait 1-2 minutes.

## Step 11: Test Your App! 🎉

1. Go to your Vercel URL: `https://whats-app-crm-kappa.vercel.app`
2. Click **"Sign Up"**
3. Create account:
   - Name: `Admin`
   - Email: `admin@gmail.com`
   - Password: `Admin@123`
   - Role: `Admin`
4. Click **"Sign Up"**
5. Then **"Login"** with same credentials

✅ **IT SHOULD WORK NOW!**

---

## If You Get Stuck

### Can't find "Deploy from GitHub repo"?
- Make sure you're logged in with GitHub
- Railway needs permission to access your repos
- Go to GitHub → Settings → Applications → Railway → Grant access

### MongoDB Connection Error?
Use this free MongoDB:
1. Go to https://cloud.mongodb.com
2. Sign up free
3. Create cluster (M0 Free)
4. Create database user
5. Get connection string
6. Replace in Railway MONGODB_URI variable

### Still showing localhost error?
- Clear browser cache (Ctrl + Shift + R)
- Check Railway logs for errors
- Verify all environment variables are set
- Make sure you redeployed Vercel AFTER adding variables

---

## Quick MongoDB Setup (If needed)

1. Go to: https://cloud.mongodb.com
2. Click **"Try Free"**
3. Sign up with Google/GitHub
4. Click **"Build a Database"**
5. Choose **"M0 FREE"**
6. Click **"Create"**
7. Create username: `admin`
8. Create password: `Admin123`
9. Click **"Create User"**
10. Click **"Add My Current IP Address"**
11. Also add: `0.0.0.0/0` (for Railway)
12. Click **"Finish and Close"**
13. Click **"Connect"**
14. Choose **"Connect your application"**
15. Copy the connection string
16. Replace `<password>` with `Admin123`
17. Use this in Railway MONGODB_URI

---

**Total Time: 15 minutes** ⏱️

Need help? I'm here! Just tell me which step you're on.
