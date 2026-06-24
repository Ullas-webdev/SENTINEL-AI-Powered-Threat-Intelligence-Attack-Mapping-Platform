from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class AnalysisRecord(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    input_type: str
    input_data: str
    filename: Optional[str] = None
    iocs: Dict[str, List[str]]
    enrichment: Dict[str, Any]
    mitre_mapping: List[Dict[str, Any]]
    risk_score: int
    risk_level: str
    risk_factors: List[Dict[str, Any]]
    ai_report: Dict[str, Any]
    detection_rules: Dict[str, str]
    graph: Dict[str, List[Dict[str, Any]]]

    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
