from fastapi import APIRouter, HTTPException
from app.database.mongodb import db
from typing import List
from bson import ObjectId

router = APIRouter()

@router.get("/analyses")
async def get_all_analyses():
    cursor = db.db.analyses.find().sort("timestamp", -1).limit(50)
    analyses = await cursor.to_list(length=50)
    for a in analyses:
        a["_id"] = str(a["_id"])
    return analyses

@router.get("/analyses/{id}")
async def get_analysis_by_id(id: str):
    # Try finding by analysis_id (UUID) first, then by MongoDB _id
    analysis = await db.db.analyses.find_one({"analysis_id": id})
    if not analysis:
        try:
            analysis = await db.db.analyses.find_one({"_id": ObjectId(id)})
        except:
            pass
            
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
        
    analysis["_id"] = str(analysis["_id"])
    return analysis
