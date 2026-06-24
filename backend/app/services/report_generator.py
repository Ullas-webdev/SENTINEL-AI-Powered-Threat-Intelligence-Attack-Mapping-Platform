from typing import Dict, Any
import json
from app.services.gemini_service import GeminiService

class ReportGenerator:
    def __init__(self, gemini: GeminiService):
        self.gemini = gemini

    async def generate(self, analysis_data: Dict[str, Any]) -> Dict[str, Any]:
        FALLBACK_REPORT = {
            "summary": "AI synthesis is currently unavailable due to API rate limits. Manual review of extracted IOCs and MITRE mappings is recommended.",
            "attack_scenario": "Unable to generate professional attack scenario at this time. Manual analysis required based on indicators.",
            "business_impact": "Potential business impact requires manual assessment due to synthesis throttling.",
            "immediate_actions": ["Review extracted IOCs manually", "Check MITRE mappings for relevant techniques", "Run detection rules against your SIEM"],
            "long_term_remediation": ["Upgrade Gemini API plan for continuous AI synthesis", "Add threat feeds for automated IOC enrichment"],
            "monitoring": ["Monitor traffic to extracted IP addresses", "Alert on matched Sigma rule patterns"],
            "attack_path": ["Reconnaissance", "Initial Access", "Execution", "Persistence", "Exfiltration", "Impact"],
            "siem_queries": {
                "splunk": "index=proxy | stats count by src_ip, url, dest_ip",
                "sentinel": "CommonSecurityLog | summarize Count=count() by SourceIP, DestinationHostName",
                "elastic": "{\"query\": {\"bool\": {\"should\": []}}}"
            }
        }

        prompt = f"""
        You are a Senior Threat Intelligence Analyst.
        
        Analyze the following security threat data and provide a professional, data-driven intelligence report.
        
        Content:
        {json.dumps(analysis_data, indent=2)}
        
        Return ONLY JSON in the following structure:
        {{
            "summary": "Professional executive summary of the threat",
            "attack_scenario": "Detailed hypothetical attack scenario (TTP-based)",
            "business_impact": "Analysis of potential business and technical impact",
            "immediate_actions": ["List of high-priority response steps"],
            "long_term_remediation": ["Strategic hardening and remediation measures"],
            "monitoring": ["Specific detection and monitoring recommendations"],
            "attack_path": ["List of 5-7 stages showing the full attack progression"],
            "siem_queries": {{
                "splunk": "index=proxy (url=* OR dest_ip=*) | ...",
                "sentinel": "CommonSecurityLog | where DestinationHostName contains ... OR DestinationIP == ...",
                "elastic": "Elastic JSON query matching extracted IOCs"
            }}
        }}
        """
        
        result = await self.gemini.generate_json(prompt)
        
        # If Gemini returned an error (quota, auth, unavailable), use fallback
        # Validate required keys are in the result
        required = {"summary", "attack_scenario", "business_impact", "immediate_actions", "long_term_remediation", "monitoring", "attack_path", "siem_queries"}
        if not isinstance(result, dict) or not required.issubset(result.keys()):
            print(f"[ReportGenerator] Invalid report structure, using fallback.")
            return FALLBACK_REPORT

        return result
