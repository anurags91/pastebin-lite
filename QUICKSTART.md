# ⚡ QUICK START GUIDE

Get your Pastebin-Lite running in **10 minutes**!

## 📦 Step 1: Setup Project (2 minutes)

```bash
# Navigate to the project folder
cd pastebin-lite

# Install dependencies
npm install
```

## 📤 Step 2: Push to GitHub (3 minutes)

### Create a new repository on GitHub:
1. Go to https://github.com/new
2. Name: `pastebin-lite`
3. Click "Create repository"

### Push your code:
```bash
git init
git add .
git commit -m "Initial commit: Pastebin-Lite"
git remote add origin https://github.com/YOUR_USERNAME/pastebin-lite.git
git push -u origin main
```

## 🚀 Step 3: Deploy to Vercel (5 minutes)

### Deploy the app:
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repo `pastebin-lite`
4. Click "Deploy" (don't change anything!)
5. Wait 2-3 minutes ⏳

### Add database:
1. After deployment, click "Storage" tab
2. Click "Create Database"
3. Select "Postgres"
4. Name: `pastebin-db`
5. Region: Choose closest to you
6. Click "Create"
7. Click "Connect to Project"
8. Select your project
9. Click "Connect"

### Redeploy:
1. Go to "Deployments" tab
2. Click latest deployment
3. Click "..." → "Redeploy"
4. Click "Redeploy"

## ✅ Step 4: Test Your App!

Your app is now live at: `https://your-app.vercel.app`

### Quick test:
```bash
# Health check
curl https://your-app.vercel.app/api/healthz

# Should return: {"ok":true}
```

### Or open in browser:
- Visit your app URL
- Create a paste
- Share the link!

## 🎉 YOU'RE DONE!

What to submit:
- **Deployed URL**: `https://your-app.vercel.app`
- **GitHub URL**: `https://github.com/YOUR_USERNAME/pastebin-lite`
- **Notes**: See README.md for details

---

**Need more help?** Check the full README.md for detailed documentation!
