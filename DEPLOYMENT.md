# 🚀 Vercel Deployment Guide for EliteKart

This project is configured to be deployed in **ONE SINGLE Vercel Project** (or separately if you prefer).

---

## ⚡ Method 1: Single-Project Unified Deployment (Recommended - 1 Click!)

Deploy your entire store (Frontend + Backend API) under **a single Vercel project and domain** (e.g., `https://elitekart.vercel.app`):

### Step 1: Push the latest changes to GitHub
```bash
git add .
git commit -m "Configure unified Vercel deployment"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** ➔ **"Project"**.
2. Select your repository `EliteKart-ecommerce` and click **Import**.
3. **Leave Root Directory as `./` (Root)** — do NOT change it to backend or frontend.
4. Expand **Environment Variables** and add your backend credentials:
   - `MONGODB_URI`: `mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/e-commerce?retryWrites=true&w=majority`
   - `JWT_SECRET`: `<your_jwt_secret>`
   - `CLOUDINARY_NAME`: `<your_cloudinary_name>`
   - `CLOUDINARY_API_KEY`: `<your_cloudinary_api_key>`
   - `CLOUDINARY_SECRET_KEY`: `<your_cloudinary_secret_key>`
   - `ADMIN_EMAIL`: `admin@elitekart.com`
   - `ADMIN_PASSWORD`: `<your_admin_password>`
   - *(Optional)* `STRIPE_SECRET_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
5. Click **Deploy**.
6. That's it! 🎉
   - Your Frontend storefront will be live at `https://your-project.vercel.app`
   - Your Backend API endpoints will be live at `https://your-project.vercel.app/api/...`
   - Zero CORS issues, zero extra URLs to configure!


### Step 1: Deploy the Backend API

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** ➔ **"Project"**.
2. Select your repository `EliteKart-ecommerce` and click **Import**.
3. Under **Project Name**, enter: `elitekart-backend` (or your chosen name).
4. Under **Root Directory**, click **Edit** and select the `backend` folder.
5. In **Environment Variables**, add the following keys from your `backend/.env`:
   - `MONGODB_URI`: `mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/e-commerce?retryWrites=true&w=majority`
   - `JWT_SECRET`: `<your_jwt_secret_key>`
   - `CLOUDINARY_NAME`: `<your_cloudinary_name>`
   - `CLOUDINARY_API_KEY`: `<your_cloudinary_api_key>`
   - `CLOUDINARY_SECRET_KEY`: `<your_cloudinary_secret_key>`
   - `ADMIN_EMAIL`: `admin@elitekart.com`
   - `ADMIN_PASSWORD`: `<your_admin_password>`
   - *(Optional payment keys)*: `STRIPE_SECRET_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
6. Click **Deploy**.
7. Once deployment finishes, copy your **Backend Deployment URL** (e.g., `https://elitekart-backend.vercel.app`). Test it by visiting `https://elitekart-backend.vercel.app/` in your browser—it should say *"EliteKart API is running..."*.

---

### Step 2: Deploy the Frontend App

1. Go back to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** ➔ **"Project"**.
2. Select the same repository `EliteKart-ecommerce` and click **Import**.
3. Under **Project Name**, enter: `elitekart-frontend` (or `elitekart-store`).
4. Under **Root Directory**, click **Edit** and select the `frontend` folder.
5. **Framework Preset**: Select `Vite`.
6. In **Environment Variables**, add:
   - `VITE_BACKEND_URL`: Paste your backend URL from Step 1 (e.g., `https://elitekart-backend.vercel.app`) *Note: do not include trailing slash*.
7. Click **Deploy**.
8. Once finished, visit your live store URL (e.g., `https://elitekart-frontend.vercel.app`)! 🎉

---

## 💻 Alternative: Deploying via Vercel CLI

If you prefer deploying via terminal:

```bash
# 1. Login to Vercel
npx vercel login

# 2. Deploy Backend
cd backend
npx vercel --prod
# Follow prompts: Link existing project? No, Project name: elitekart-backend
# Copy the deployed production URL

# 3. Set Backend Environment Variables (or add via Vercel dashboard)
npx vercel env add MONGODB_URI
npx vercel env add JWT_SECRET
npx vercel env add CLOUDINARY_NAME
npx vercel env add CLOUDINARY_API_KEY
npx vercel env add CLOUDINARY_SECRET_KEY
npx vercel env add ADMIN_EMAIL
npx vercel env add ADMIN_PASSWORD

# 4. Deploy Frontend
cd ../frontend
npx vercel env add VITE_BACKEND_URL production
npx vercel --prod
```

---

## 🔍 Troubleshooting Tips

| Issue | Solution |
|---|---|
| **MongoDB connection timeout / MongooseServerSelectionError** | In MongoDB Atlas Dashboard ➔ **Security** ➔ **Network Access**, ensure IP `0.0.0.0/0` is added to allow Vercel dynamic serverless IPs. |
| **Page refresh returns 404 on subpages (e.g. `/collection`)** | Configured in `frontend/vercel.json` with SPA rewrite rule. |
| **CORS errors in browser console** | Configured in `backend/server.js` with proper headers and wildcard origin. |
| **Images failing to upload from Admin** | Verify `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_SECRET_KEY` are accurately set in Backend environment variables. |
