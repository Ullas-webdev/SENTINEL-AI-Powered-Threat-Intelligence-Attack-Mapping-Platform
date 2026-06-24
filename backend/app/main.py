from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analyze, upload, history
from app.database.mongodb import connect_to_mongo, close_mongo_connection
from app.core.config import settings

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(analyze.router, prefix="/api", tags=["Analysis"])
app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(history.router, prefix="/api", tags=["History"])

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": settings.PROJECT_NAME}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8005, reload=True)

