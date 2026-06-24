from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any, Optional
from datetime import datetime

class IOCBase(BaseModel):
    ipv4: List[str] = []
    domain: List[str] = []
    url: List[str] = []
    email: List[str] = []
    md5: List[str] = []
    sha1: List[str] = []
    sha256: List[str] = []
    cve: List[str] = []

class EnrichmentBase(BaseModel):
    cve_details: Dict[str, Any] = {}
    threat_actors: List[str] = []
    malware_families: List[str] = []

class MitreMapping(BaseModel):
    technique_id: str
    technique_name: str
    description: str
    tactic: str

class RiskFactor(BaseModel):
    factor: str
    points: int

class AIReport(BaseModel):
    summary: str
    attack_scenario: str
    business_impact: str
    immediate_actions: List[str]
    long_term_remediation: List[str]
    monitoring: List[str]
    attack_path: List[str] = []
    siem_queries: Dict[str, str] = {}

class DetectionRules(BaseModel):
    sigma: str
    splunk: Optional[str] = None
    sentinel: Optional[str] = None
    elastic: Optional[str] = None

class GraphNode(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]
    position: Dict[str, float]

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None

class IOCGraph(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

class AnalysisCreate(BaseModel):
    input_text: Optional[str] = None
    input_type: str  # text, file, url, ip, domain
    filename: Optional[str] = None

class AnalysisResponse(BaseModel):
    analysis_id: str
    timestamp: datetime
    input_type: str
    input_text: Optional[str] = None
    filename: Optional[str] = None
    iocs: IOCBase
    enrichment: EnrichmentBase
    mitre_mapping: List[MitreMapping]
    risk_score: int
    risk_level: str
    risk_factors: List[RiskFactor]
    ai_report: AIReport
    detection_rules: DetectionRules
    graph: IOCGraph

    model_config = ConfigDict(populate_by_name=True)
