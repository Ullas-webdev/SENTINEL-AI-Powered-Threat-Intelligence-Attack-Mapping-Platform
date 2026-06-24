from typing import List, Dict, Any

class RiskEngine:
    @staticmethod
    def calculate_score(enrichment: Dict[str, Any]) -> Dict[str, Any]:
        score = 0
        factors = []
        
        cve_details = enrichment.get("cve_details", {})
        
        for cve_id, details in cve_details.items():
            cvss = details.get("cvss", 0.0)
            
            if cvss > 9:
                score += 30
                factors.append({"factor": f"Critical CVSS ({cvss}) for {cve_id}", "points": 30})
            elif cvss >= 7:
                score += 20
                factors.append({"factor": f"High CVSS ({cvss}) for {cve_id}", "points": 20})
            elif cvss >= 4:
                score += 10
                factors.append({"factor": f"Medium CVSS ({cvss}) for {cve_id}", "points": 10})
                
            if details.get("exploit_available"):
                score += 25
                factors.append({"factor": f"Exploit available for {cve_id}", "points": 25})
                
            if details.get("malware_associated"):
                score += 15
                factors.append({"factor": f"Malware associated with {cve_id}", "points": 15})
                
            if details.get("threat_actor_associated"):
                score += 10
                factors.append({"factor": f"Known threat actor associated with {cve_id}", "points": 10})

        # Feature 5: High IOC Reputation Score (Simulated)
        if len(cve_details) > 0 or len(enrichment.get("threat_actors", [])) > 0:
            score += 20
            factors.append({"factor": "High IOC Correlation / Reputation Score", "points": 20})
        
        # Risk Levels Alignment
        risk_level = "Low"
        if score >= 81:
            risk_level = "Critical"
        elif score >= 61:
            risk_level = "High"
        elif score >= 31:
            risk_level = "Medium"
        else:
            risk_level = "Low"
            
        return {
            "risk_score": score,
            "risk_level": risk_level,
            "risk_factors": factors
        }
