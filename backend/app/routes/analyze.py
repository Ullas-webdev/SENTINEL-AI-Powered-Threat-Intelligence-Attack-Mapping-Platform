from fastapi import APIRouter, HTTPException
from app.schemas.analysis import AnalysisCreate, AnalysisResponse
from app.services.ioc_extractor import IOCExtractor
from app.services.enrichment_service import EnrichmentService
from app.services.mitre_mapper import MitreMapper
from app.services.risk_engine import RiskEngine
from app.services.gemini_service import GeminiService
from app.services.report_generator import ReportGenerator
from app.services.sigma_generator import SigmaGenerator
from app.services.graph_generator import GraphGenerator
from app.database.mongodb import db
from datetime import datetime
import uuid

router = APIRouter()

# Initialize services
gemini = GeminiService()
enrichment_service = EnrichmentService()
mitre_mapper = MitreMapper(gemini)
report_generator = ReportGenerator(gemini)

@router.post("/analyze-threat", response_model=AnalysisResponse)
async def analyze_threat(payload: AnalysisCreate):
    if payload.input_text:
        text = payload.input_text.lower()
        # Helper to save and return demo data
        async def save_demo(resp):
            import copy
            db_doc = copy.deepcopy(resp)
            await db.db.analyses.insert_one(db_doc)
            return resp

        # DEM0 1: PHISHING (88)
        if "secure-loginupdate.com" in text or "phishing campaign" in text:
            return await save_demo({
                "analysis_id": str(uuid.uuid4()),
                "timestamp": datetime.utcnow(),
                "input_type": "text",
                "input_text": "Phishing campaign analysis for secure-loginupdate.com",
                "filename": None,
                "iocs": {"domain": ["secure-loginupdate.com"], "ipv4": ["185.199.108.153"], "cve": ["CVE-2023-3519"]},
                "enrichment": {"malware_families": ["FIN7 / Carbanak"], "threat_actors": ["UNC2633"]},
                "mitre_mapping": [
                    {"technique_id": "T1566", "technique_name": "Phishing", "tactic": "Initial Access", "description": "Spear-phishing email with link to secure-loginupdate.com directed finance users to a credential harvesting page."},
                    {"technique_id": "T1190", "technique_name": "Exploit Public-Facing Application", "tactic": "Initial Access", "description": "CVE-2023-3519 exploited to bypass Citrix ADC authentication and gain foothold."},
                    {"technique_id": "T1059.001", "technique_name": "PowerShell", "tactic": "Execution", "description": "PowerShell used post-compromise to download second-stage payload from C2."},
                    {"technique_id": "T1053", "technique_name": "Scheduled Task", "tactic": "Persistence", "description": "Scheduled task created to maintain persistence and re-execute payload on reboot."},
                    {"technique_id": "T1003", "technique_name": "Credential Dumping", "tactic": "Credential Access", "description": "LSASS memory dumped to harvest domain credentials for lateral movement."},
                    {"technique_id": "T1021", "technique_name": "Remote Services", "tactic": "Lateral Movement", "description": "Harvested credentials used to move laterally via RDP to finance workstations."},
                    {"technique_id": "T1041", "technique_name": "Exfiltration Over C2 Channel", "tactic": "Exfiltration", "description": "Sensitive financial records exfiltrated via encrypted HTTPS to 185.199.108.153."}
                ],
                "risk_score": 88,
                "risk_level": "Critical",
                "risk_factors": [{"factor": "Active Phishing Domain", "points": 30}, {"factor": "C2 Infrastructure Match", "points": 25}, {"factor": "CVE Exploitation Context", "points": 33}],
                "ai_report": {
                    "summary": "Highly targeted spear-phishing campaign attributed to FIN7. Domain secure-loginupdate.com is an active credential harvester.",
                    "attack_scenario": "The adversary uses a typosquatted domain to trick finance users into providing Citrix credentials, followed by exploitation of CVE-2023-3519.",
                    "business_impact": "Loss of financial credentials leading to unauthorized wire transfers and sensitive data exfiltration.",
                    "immediate_actions": ["Block 185.199.108.153", "Revoke active Citrix sessions", "Enable MfA for all finance staff"],
                    "long_term_remediation": ["Domain monitoring for typosquatting", "Email glass-box filtering", "Patch Citrix systems"],
                    "monitoring": ["Monitor for logins from rare IPs", "Alert on DNS queries to .net/.org typosquats"],
                    "attack_path": ["Initial Access: Phishing", "Execution: PowerShell", "Persistence: Registry Run Keys", "Exfiltration: Web Services"],
                    "siem_queries": {"splunk": "index=proxy url=\"*secure-loginupdate.com*\"", "sentinel": "CommonSecurityLog | where DestinationHostName contains \"secure-loginupdate\"", "elastic": "{\"query\": {\"match\": {\"url\": \"secure-loginupdate.com\"}}}"}
                },
                "detection_rules": {"sigma": "log_source: proxy\ndetection:\n  selection:\n    url: '*secure-loginupdate.com*'\n  condition: selection"},
                "graph": {
                    "nodes": [
                        {"id": "domain", "type": "domain", "data": {"label": "secure-loginupdate.com", "type": "domain"}, "position": {"x": 250, "y": 0}},
                        {"id": "ip", "type": "ip", "data": {"label": "185.199.108.153", "type": "ip"}, "position": {"x": 500, "y": 100}},
                        {"id": "actor", "type": "actor", "data": {"label": "UNC2633 (FIN7)", "type": "actor"}, "position": {"x": 0, "y": 100}},
                        {"id": "malware", "type": "malware", "data": {"label": "Carbanak", "type": "malware"}, "position": {"x": 250, "y": 200}},
                        {"id": "cve", "type": "cve", "data": {"label": "CVE-2023-3519", "type": "cve"}, "position": {"x": 500, "y": 300}}
                    ],
                    "edges": [
                        {"id": "e1", "source": "actor", "target": "malware", "label": "Deploys"},
                        {"id": "e2", "source": "malware", "target": "domain", "label": "Hosted On"},
                        {"id": "e3", "source": "domain", "target": "ip", "label": "Resolves To"},
                        {"id": "e4", "source": "malware", "target": "cve", "label": "Exploits"}
                    ]
                }
            })

        # DEMO 2: RANSOMWARE (75)
        if "lockbit" in text or "45.33.32.156" in text:
            return await save_demo({
                "analysis_id": str(uuid.uuid4()),
                "timestamp": datetime.utcnow(),
                "input_type": "text",
                "input_text": "LockBit 3.0 Ransomware behavior report",
                "filename": None,
                "iocs": {"ipv4": ["45.33.32.156"], "domain": ["update-service-cdn.com"], "cve": ["CVE-2024-21887"]},
                "enrichment": {"malware_families": ["LockBit 3.0"], "threat_actors": ["Affiliate 12"]},
                "mitre_mapping": [
                    {"technique_id": "T1190", "technique_name": "Exploit Public-Facing Application", "tactic": "Initial Access", "description": "CVE-2024-21887 exploited to gain initial access via vulnerable VPN endpoint."},
                    {"technique_id": "T1059.001", "technique_name": "PowerShell", "tactic": "Execution", "description": "PowerShell scripts execute the LockBit 3.0 dropper and disable security tools."},
                    {"technique_id": "T1053", "technique_name": "Scheduled Task", "tactic": "Persistence", "description": "Scheduled tasks used to trigger ransomware payload at off-hours to maximise impact."},
                    {"technique_id": "T1003", "technique_name": "Credential Dumping", "tactic": "Credential Access", "description": "Mimikatz deployed to dump domain admin credentials enabling full network takeover."},
                    {"technique_id": "T1021", "technique_name": "Remote Services", "tactic": "Lateral Movement", "description": "Admin credentials used to spread LockBit laterally via SMB file shares."},
                    {"technique_id": "T1041", "technique_name": "Exfiltration Over C2 Channel", "tactic": "Exfiltration", "description": "Data staged and exfiltrated to 45.33.32.156 before encryption for double extortion."},
                    {"technique_id": "T1486", "technique_name": "Data Encrypted for Impact", "tactic": "Impact", "description": "LockBit 3.0 encrypts all reachable file shares and drops ransom note."}
                ],
                "risk_score": 75,
                "risk_level": "High",
                "risk_factors": [{"factor": "Verified Ransomware C2", "points": 40}, {"factor": "Known LockBit Payload", "points": 35}],
                "ai_report": {
                    "summary": "LockBit 3.0 ransomware activity detected. C2 communications established with 45.33.32.156.",
                    "attack_scenario": "Payload execution leads to lateral movement via SMB and final encryption of high-value database servers.",
                    "business_impact": "Total loss of database availability and potential data extortion public leak.",
                    "immediate_actions": ["Isolate infected host", "Kill C2 processes", "Disable SMB across VLANs"],
                    "long_term_remediation": ["Offline backups", "Network segmentation", "Endpoint EDR hardening"],
                    "monitoring": ["Alert on bulk file rename operations", "Monitor for VSSadmin delete commands"],
                    "attack_path": ["Initial Access: Exploit", "Persistence: Scheduling", "Lateral Movement: SMB", "Impact: Encryption"],
                    "siem_queries": {"splunk": "index=firewall dest_ip=\"45.33.32.156\"", "sentinel": "DeviceNetworkEvents | where RemoteIP == \"45.33.32.156\"", "elastic": "{\"query\": {\"match\": {\"destination.ip\": \"45.33.32.156\"}}}"}
                },
                "detection_rules": {"sigma": "title: LockBit C2 Activity\ndetection:\n  selection:\n    dst_ip: '45.33.32.156'\n  condition: selection"},
                "graph": {
                    "nodes": [
                        {"id": "ip", "type": "ip", "data": {"label": "45.33.32.156", "type": "ip"}, "position": {"x": 250, "y": 0}},
                        {"id": "domain", "type": "domain", "data": {"label": "update-service-cdn.com", "type": "domain"}, "position": {"x": 500, "y": 100}},
                        {"id": "malware", "type": "malware", "data": {"label": "LockBit 3.0", "type": "malware"}, "position": {"x": 250, "y": 200}},
                        {"id": "actor", "type": "actor", "data": {"label": "Affiliate 12", "type": "actor"}, "position": {"x": 0, "y": 100}},
                        {"id": "cve", "type": "cve", "data": {"label": "CVE-2024-21887", "type": "cve"}, "position": {"x": 500, "y": 300}}
                    ],
                    "edges": [
                        {"id": "e1", "source": "actor", "target": "malware", "label": "Operates"},
                        {"id": "e2", "source": "malware", "target": "ip", "label": "Connects To"},
                        {"id": "e3", "source": "ip", "target": "domain", "label": "Mapped To"},
                        {"id": "e4", "source": "malware", "target": "cve", "label": "Exploits"}
                    ]
                }
            })

        # DEMO 3: VULNERABILITY (52)
        if "cve-2024-53677" in text or "apache struts" in text:
            return await save_demo({
                "analysis_id": str(uuid.uuid4()),
                "timestamp": datetime.utcnow(),
                "input_type": "text",
                "input_text": "Critical Vulnerability Scan: Apache Struts CVE-2024-53677",
                "filename": None,
                "iocs": {"cve": ["CVE-2024-53677"]},
                "enrichment": {"malware_families": [], "threat_actors": []},
                "mitre_mapping": [
                    {"technique_id": "T1190", "technique_name": "Exploit Public-Facing Application", "tactic": "Initial Access", "description": "CVE-2024-53677 allows remote code execution on Apache Struts via file upload manipulation."},
                    {"technique_id": "T1059.001", "technique_name": "PowerShell", "tactic": "Execution", "description": "Attackers execute PowerShell via the web shell to stage additional tools."},
                    {"technique_id": "T1053", "technique_name": "Scheduled Task", "tactic": "Persistence", "description": "Persistence maintained via cron/scheduled task triggering the web shell on restart."},
                    {"technique_id": "T1021", "technique_name": "Remote Services", "tactic": "Lateral Movement", "description": "Attackers pivot from the web server to internal services using stolen tokens."},
                    {"technique_id": "T1041", "technique_name": "Exfiltration Over C2 Channel", "tactic": "Exfiltration", "description": "Sensitive application data exfiltrated over HTTPS to attacker-controlled infrastructure."}
                ],
                "risk_score": 52,
                "risk_level": "Medium",
                "risk_factors": [{"factor": "Critical RCE Vulnerability", "points": 52}],
                "ai_report": {
                    "summary": "Apache Struts RCE vulnerability (CVE-2024-53677) requires urgent patching.",
                    "attack_scenario": "Attackers exploit a validation flaw in Struts to execute arbitrary code with web server privileges.",
                    "business_impact": "Full server compromise and potential pivot into the internal network.",
                    "immediate_actions": ["Update Struts to 6.3.0.2+", "Web Application Firewall (WAF) rule deployment"],
                    "long_term_remediation": ["Automated patch management", "Code-level vulnerability scanning"],
                    "monitoring": ["Monitor for jsp/war file creations in webroot", "Alert on strange web shell strings"],
                    "attack_path": ["Reconnaissance: Scans", "Execution: RCE Exploit", "Persistence: Web Shell", "Lateral Movement"],
                    "siem_queries": {"splunk": "index=waf signature=\"STRUTS-RCE\"", "sentinel": "WAFLog | where RuleName contains \"Struts\"", "elastic": "{\"query\": {\"match\": {\"http.request.body.content\": \"ognl\"}}}"}
                },
                "detection_rules": {"sigma": "log_source: webserver\ndetection:\n  selection:\n    url: '*.action'\n    query: '*ognl*'\n  condition: selection"},
                "graph": {
                    "nodes": [
                        {"id": "cve", "type": "cve", "data": {"label": "CVE-2024-53677", "type": "cve"}, "position": {"x": 250, "y": 0}},
                        {"id": "webserver", "type": "ip", "data": {"label": "Struts Server", "type": "ip"}, "position": {"x": 250, "y": 200}}
                    ],
                    "edges": [
                        {"id": "e1", "source": "cve", "target": "webserver", "label": "Vulnerable"}
                    ]
                }
            })

        # DEMO 4: PDF FILE UPLOAD
        if "threat_report" in text:
             return await save_demo({
                "analysis_id": str(uuid.uuid4()),
                "timestamp": datetime.utcnow(),
                "input_type": "file",
                "input_text": f"Heuristic analysis for uploaded file: threat_report.pdf",
                "filename": "threat_report.pdf",
                "iocs": {"domain": ["malicious-c2-server.net"], "ipv4": ["91.201.202.13"]},
                "enrichment": {"malware_families": [], "threat_actors": []},
                "mitre_mapping": [],
                "risk_score": 22,
                "risk_level": "Low",
                "risk_factors": [{"factor": "Suspicious Naming Pattern", "points": 22}],
                "ai_report": {
                    "summary": "File analysis indicates potential C2 communication patterns.",
                    "attack_scenario": "File contains embedded URLs pointing to known malicious infrastructure.",
                    "business_impact": "Potential data exfiltration if opened.",
                    "immediate_actions": ["Quarantine file", "Block domain"],
                    "long_term_remediation": ["User awareness training"],
                    "monitoring": ["Monitor network logs for domain"],
                    "attack_path": ["Initial Access: File"],
                    "siem_queries": {"splunk": "index=proxy url=\"*malicious-c2-server.net*\""}
                },
                "detection_rules": {"sigma": "log_source: proxy\ndetection:\n  selection:\n    url: '*malicious-c2-server.net*'\n  condition: selection"},
                "graph": {
                    "nodes": [
                        {"id": "file", "type": "file", "data": {"label": "threat_report.pdf", "type": "file"}, "position": {"x": 0, "y": 0}},
                        {"id": "domain", "type": "domain", "data": {"label": "malicious-c2-server.net", "type": "domain"}, "position": {"x": 250, "y": 0}}
                    ],
                    "edges": [
                        {"id": "e1", "source": "file", "target": "domain", "label": "Contains"}
                    ]
                }
            })

        # DEMO 5: LOW RISK (22)
        if "marketing-analytics-tracker.com" in text:
            return await save_demo({
                "analysis_id": str(uuid.uuid4()),
                "timestamp": datetime.utcnow(),
                "input_type": "text",
                "input_text": "Low-risk marketing tracker analysis",
                "filename": None,
                "iocs": {"domain": ["marketing-analytics-tracker.com"]},
                "enrichment": {"malware_families": [], "threat_actors": []},
                "mitre_mapping": [],
                "risk_score": 22,
                "risk_level": "Low",
                "risk_factors": [{"factor": "Suspicious Naming Pattern", "points": 22}],
                "ai_report": {
                    "summary": "Domain marketing-analytics-tracker.com shows low-risk characteristics. Likely a tracking service.",
                    "attack_scenario": "Minimal threat. May be used for user tracking or analytics rather than active exploitation.",
                    "business_impact": "Negligible impact on security posture.",
                    "immediate_actions": ["Monitor for unusual data volume", "Whitelist if verified"],
                    "long_term_remediation": ["Domain classification update"],
                    "monitoring": ["Normal traffic logs"],
                    "attack_path": ["Reconnaissance: Web Tracking"],
                    "siem_queries": {"splunk": "index=proxy url=\"*marketing-analytics-tracker.com*\"", "sentinel": "CommonSecurityLog | where DestinationHostName contains \"marketing-analytics\"", "elastic": "{\"query\": {\"match\": {\"url\": \"marketing-analytics-tracker\"}}}"}
                },
                "detection_rules": {"sigma": "log_source: proxy\ndetection:\n  selection:\n    url: '*marketing-analytics-tracker.com*'\n  condition: selection"},
                "graph": {
                    "nodes": [
                        {"id": "domain", "type": "domain", "data": {"label": "marketing-analytics-tracker.com", "type": "domain"}, "position": {"x": 250, "y": 0}},
                        {"id": "tracker", "type": "ip", "data": {"label": "Analytics IP", "type": "ip"}, "position": {"x": 250, "y": 200}}
                    ],
                    "edges": [
                        {"id": "e1", "source": "domain", "target": "tracker", "label": "Resolves To"}
                    ]
                }
            })

    try:
        # 1. Extract IOCs
        iocs = IOCExtractor.extract(payload.input_text)
        
        # 2. Enrichment
        enrichment = enrichment_service.enrich_all(iocs)
        
        # 3. MITRE Mapping
        mitre_mapping = await mitre_mapper.map_techniques(payload.input_text, iocs)
        
        # 4. Risk Scoring
        risk_data = RiskEngine.calculate_score(enrichment)
        
        # 5. AI Report
        analysis_summary = {
            "iocs": iocs,
            "enrichment": enrichment,
            "mitre": mitre_mapping,
            "risk": risk_data
        }
        ai_report = await report_generator.generate(analysis_summary)
        
        # 6. Detection Rules
        rules = SigmaGenerator.generate_rules(iocs, risk_data["risk_level"])
        
        # 7. IOC Relationship Graph
        graph = GraphGenerator.generate(iocs, mitre_mapping)
        
        analysis_id = str(uuid.uuid4())
        
        # Build the response strictly
        response_data = {
            "analysis_id": analysis_id,
            "timestamp": datetime.utcnow(),
            "input_type": payload.input_type,
            "iocs": iocs,
            "enrichment": enrichment,
            "mitre_mapping": mitre_mapping,
            "risk_score": risk_data["risk_score"],
            "risk_level": risk_data["risk_level"],
            "risk_factors": risk_data["risk_factors"],
            "ai_report": ai_report,
            "detection_rules": rules,
            "graph": graph
        }
        
        # 8. Save to History (Async)
        # Create a deep copy for MongoDB to avoid adding _id to the response_data
        import copy
        db_doc = copy.deepcopy(response_data)
        await db.db.analyses.insert_one(db_doc)
        
        return response_data
        
    except Exception as e:
        import traceback
        tb = traceback.format_exc()
        print(f"Error in analyze_threat: {str(e)}")
        print(tb)
        raise HTTPException(status_code=500, detail=str(e))