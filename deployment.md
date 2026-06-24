# 🚀 Sentinel AI: Deployment Guide

This guide covers deploying the Sentinel platform to **Render** (Backend) and **Vercel** (Frontend).

## 1. Backend Deployment (Render)

1. **Create Web Service**: In Render dashboard, click `New` -> `Web Service`.
2. **Connect Repo**: Select your GitHub repository.
3. **Configure Service**:
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. **Environment Variables**:
   - `MONGODB_URL`: Your MongoDB Atlas connection string.
   - `DATABASE_NAME`: `threat_intel`
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `GROQ_API_KEY`: Your Groq AI API Key.
5. **Deploy**: Render will build and expose your API (e.g., `https://sentinel-api.onrender.com`).

---

## 2. Frontend Deployment (Vercel)

1. **Import Project**: In Vercel, click `Add New` -> `Project` and select your repo.
2. **Configure Project**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend`
3. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend-url.onrender.com/api` (MUST end with `/api`).
4. **Deploy**: Vercel will build and host your intelligence dashboard.

---

## 🔒 Security Post-Deployment

1. **CORS Policy**: Ensure `backend/app/main.py` is configured to allow your Vercel production domain.
2. **IP Access**: In MongoDB Atlas, add the IP of your Render service (or `0.0.0.0/0` if necessary, though use `Render` static IPs if on a paid plan).
3. **API Keys**: Ensure no `.env` files were accidentally committed (Sentinel's `.gitignore` already handles this).

---
**Sentinel AI Engineering**
