# Deployment Instructions

## Prerequisites

- MongoDB Atlas instance or local MongoDB server.
- Google Gemini API Key.
- Vercel Account (Frontend).
- Render or Fly.io Account (Backend).

## Step 1: Backend Deployment (Render)

1. Connect your GitHub repository.
2. Select the `backend/` directory as the root.
3. Set Build Command: `pip install -r requirements.txt`.
4. Set Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
5. Add Environment Variables:
   - `MONGODB_URL`: Your connection string.
   - `DATABASE_NAME`: `threat_intel`.
   - `GEMINI_API_KEY`: Your Google Gemini key.

## Step 2: Frontend Deployment (Vercel)

1. Connect your GitHub repository.
2. Select the `frontend/` directory.
3. Set Framework: `Next.js`.
4. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://api.your-platform.com/api`).
5. Build and Deploy.

## Security Hardening

- Update CORS in `backend/app/main.py` to allow only your frontend domain.
- Ensure MongoDB cluster is IP-restricted to the backend server.
- Use a secrets manager for the Gemini API key.
