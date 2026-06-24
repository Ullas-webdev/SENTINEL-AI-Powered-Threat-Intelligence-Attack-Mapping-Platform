from fastapi import APIRouter, UploadFile, File, HTTPException
from app.routes.analyze import analyze_threat
from app.schemas.analysis import AnalysisCreate
from app.services.file_parser import FileParser

router = APIRouter()

@router.post("/analyze-threat/upload")
async def upload_and_analyze(file: UploadFile = File(...)):
    try:
        # Parse file content
        text_content = await FileParser.parse_file(file)
        
        # Create analysis payload
        payload = AnalysisCreate(
            input_text=text_content,
            input_type="file",
            filename=file.filename
        )
        
        # Delegate to main analysis logic
        return await analyze_threat(payload)
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
