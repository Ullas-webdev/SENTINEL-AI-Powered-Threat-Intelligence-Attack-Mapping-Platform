import json
import os
from typing import Dict, Any, List

class EnrichmentService:
    def __init__(self):
        self.cve_db_path = "app/data/cve_database.json"
        self.mitre_db_path = "app/data/mitre_attack.json"
        self._load_datasets()

    def _load_datasets(self):
        # Create empty datasets if they don't exist yet (will be populated in later step)
        os.makedirs("app/data", exist_ok=True)
        
        if not os.path.exists(self.cve_db_path):
            with open(self.cve_db_path, "w") as f:
                json.dump({}, f)
        
        if not os.path.exists(self.mitre_db_path):
            with open(self.mitre_db_path, "w") as f:
                json.dump([], f)

        with open(self.cve_db_path, "r") as f:
            self.cve_data = json.load(f)
            
        with open(self.mitre_db_path, "r") as f:
            self.mitre_data = json.load(f)

    def enrich_cve(self, cve_id: str) -> Dict[str, Any]:
        return self.cve_data.get(cve_id, {
            "id": cve_id,
            "cvss": 0.0,
            "severity": "Unknown",
            "description": "No local enrichment found.",
            "exploit_available": False,
            "malware_associated": False,
            "threat_actor_associated": False
        })

    def enrich_all(self, iocs: Dict[str, List[str]]) -> Dict[str, Any]:
        enrichment = {
            "cve_details": {},
            "threat_actors": [],
            "malware_families": []
        }
        
        for cve_id in iocs.get("cve", []):
            details = self.enrich_cve(cve_id)
            enrichment["cve_details"][cve_id] = details
            
            # Simple heuristic for actors/malware based on local DB
            # In a real app, this would be more complex
            if details.get("threat_actor_associated"):
                enrichment["threat_actors"].append(f"Actor associated with {cve_id}")
            if details.get("malware_associated"):
                enrichment["malware_families"].append(f"Malware using {cve_id}")
                
        return enrichment
