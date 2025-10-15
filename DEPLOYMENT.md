# 🚀 Deployment Guide

This guide will help you deploy your Corporate Training Platform to production.

## 📋 Architecture

- **Frontend**: Netlify (Static React App)
- **Backend**: Railway.app or Render.com (Node.js API)
- **Database**: In-memory (or MongoDB Atlas for production)

---

## 1️⃣ Deploy Backend (Railway.app - Recommended & FREE)

### Step 1: Sign up for Railway
1. Go to [https://railway.app/](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project"

### Step 2: Deploy from GitHub
1. Click "Deploy from GitHub repo"
2. Select your `cursor.webapp` repository
3. Railway will auto-detect it's a Node.js app

### Step 3: Configure Backend
1. Click on your service → "Settings"
2. **Root Directory**: Set to `backend`
3. **Start Command**: `node src/server.js`
4. **Environment Variables**: Add these:
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your-production-jwt-secret-change-this
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-app-name.netlify.app
   GROQ_API_KEY=your-groq-api-key-here
   OPENAI_API_KEY=your-openai-api-key-here
   ```

### Step 4: Get Your Backend URL
- After deployment, Railway will give you a URL like: `https://your-app.railway.app`
- **Copy this URL** - you'll need it for frontend deployment

---

## 2️⃣ Deploy Frontend (Netlify)

### Option A: Deploy via Netlify UI (Easiest)

1. **Go to Netlify**
   - Visit [https://app.netlify.com/](https://app.netlify.com/)
   - Sign up/login with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your `cursor.webapp` repository

3. **Build Settings**
   - **Base directory**: Leave empty (root)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - Click "Show advanced" → "New variable"

4. **Environment Variables**
   Add this variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
   Replace with your actual Railway backend URL

5. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes for build to complete

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Build and deploy
npm run build
netlify deploy --prod
```

---

## 3️⃣ Update API Configuration

After getting your backend URL, update the frontend API configuration:

### Create environment variable file for production

Create `.env.production` in the root directory:
```
VITE_API_URL=https://your-backend-url.railway.app/api
```

**Important**: Make sure to set this in Netlify's environment variables!

---

## 4️⃣ Update Backend CORS

Update `backend/src/server.js` CORS configuration to allow your Netlify domain:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-app-name.netlify.app'
  ],
  credentials: true
};
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Never commit API keys to Git
- [ ] Set all environment variables in hosting platforms
- [ ] Enable HTTPS (both Netlify and Railway provide this automatically)
- [ ] Update CORS to only allow your production domain
- [ ] Test all features in production environment

---

## 🗄️ Optional: MongoDB Atlas (Production Database)

If you want persistent data instead of in-memory:

1. **Create MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users

3. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Add to Railway environment variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/corporate-training
     ```

4. **Update Backend**
   - The backend already supports MongoDB
   - It will automatically use MongoDB if `MONGODB_URI` is set

---

## 📊 Deployment Checklist

### Before First Deploy
- [ ] Push all code to GitHub
- [ ] Create production environment variables list
- [ ] Test build locally: `npm run build`

### Backend Deployment
- [ ] Deploy to Railway/Render
- [ ] Set all environment variables
- [ ] Test API endpoints
- [ ] Copy production backend URL

### Frontend Deployment
- [ ] Set `VITE_API_URL` in Netlify
- [ ] Deploy to Netlify
- [ ] Test login functionality
- [ ] Test course enrollment
- [ ] Test chatbot
- [ ] Test certificate download

### Post-Deployment
- [ ] Update CORS settings with production domain
- [ ] Test on mobile devices
- [ ] Monitor error logs
- [ ] Set up custom domain (optional)

---

## 🔄 Continuous Deployment

Both Netlify and Railway support automatic deployments:

- **Push to GitHub** → Automatically deploys to production
- No manual steps needed after initial setup
- View build logs in each platform's dashboard

---

## 🆘 Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` is set correctly in Netlify
- Verify CORS allows your Netlify domain
- Check browser console for errors

### Backend not starting
- Check Railway logs
- Verify all environment variables are set
- Ensure `package.json` has correct start script

### 404 errors on refresh
- Verify `netlify.toml` is in repository
- Check `_redirects` file is in `public/` folder

---

## 💰 Cost

- **Netlify**: FREE (100GB bandwidth/month)
- **Railway**: FREE ($5 credit/month, auto-renews)
- **MongoDB Atlas**: FREE (512MB storage)

**Total monthly cost**: $0 ✨

---

## 📞 Support

If you encounter issues:
- Netlify: [https://docs.netlify.com/](https://docs.netlify.com/)
- Railway: [https://docs.railway.app/](https://docs.railway.app/)
- This project: [GitHub Issues](https://github.com/PaulLDN/cursor.webapp/issues)

---

## 🎉 Success!

Once deployed, share your live app:
```
https://your-app-name.netlify.app
```

Don't forget to update your GitHub README with the live demo link! 🚀

