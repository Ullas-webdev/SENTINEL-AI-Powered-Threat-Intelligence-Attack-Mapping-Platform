from typing import List, Dict, Any
import json
from app.services.gemini_service import GeminiService


class MitreMapper:
    def __init__(self, gemini: GeminiService):
        self.gemini = gemini

    async def map_techniques(
        self,
        text: str,
        iocs: Dict[str, Any]
    ) -> List[Dict[str, Any]]:

        prompt = f"""
        Analyze the following security incident and map it to MITRE ATT&CK.

        Consider these techniques if applicable:
        T1566 (Phishing)
        T1190 (Exploit Public-Facing Application)
        T1059 (Command and Scripting Interpreter)
        T1059.001 (PowerShell)
        T1053 (Scheduled Task)
        T1547.001 (Registry Run Keys)
        T1003 (Credential Dumping)
        T1021 (Remote Services)
        T1041 (Exfiltration Over C2 Channel)
        T1486 (Data Encrypted for Impact)

        Threat Text:
        {text[:2000]}

        Extracted IOCs:
        {json.dumps(iocs)}

        Return ONLY valid JSON.

        Format:
        [
            {{
                "technique_id": "T1566",
                "technique_name": "Phishing",
                "description": "How it applies",
                "tactic": "Initial Access"
            }}
        ]
        """

        try:
            result = await self.gemini.generate_json(prompt)

            print("\n========== GEMINI MITRE RESPONSE ==========")
            print(result)
            print("===========================================\n")

            if isinstance(result, list) and len(result) >= 3:
                return result

            if (
                isinstance(result, dict)
                and "techniques" in result
                and isinstance(result["techniques"], list)
                and len(result["techniques"]) >= 3
            ):
                return result["techniques"]

            print(
                "[MitreMapper] Gemini returned insufficient mappings. Using fallback."
            )
            return self._heuristic_fallback(text)

        except Exception as e:
            print(f"[MitreMapper] Error: {str(e)}")
            print("[MitreMapper] Using heuristic fallback.")
            return self._heuristic_fallback(text)

    def _heuristic_fallback(
        self,
        text: str
    ) -> List[Dict[str, Any]]:

        text_lower = text.lower()
        mappings = []

        common_patterns = [
            (
                "phishing",
                "T1566",
                "Phishing",
                "Initial Access"
            ),
            (
                "email",
                "T1566",
                "Phishing",
                "Initial Access"
            ),
            (
                "cve",
                "T1190",
                "Exploit Public-Facing Application",
                "Initial Access"
            ),
            (
                "citrix",
                "T1190",
                "Exploit Public-Facing Application",
                "Initial Access"
            ),
            (
                "exploit",
                "T1190",
                "Exploit Public-Facing Application",
                "Initial Access"
            ),
            (
                "powershell",
                "T1059.001",
                "PowerShell",
                "Execution"
            ),
            (
                "command",
                "T1059",
                "Command and Scripting Interpreter",
                "Execution"
            ),
            (
                "scheduled task",
                "T1053",
                "Scheduled Task",
                "Persistence"
            ),
            (
                "persistence",
                "T1053",
                "Scheduled Task",
                "Persistence"
            ),
            (
                "registry",
                "T1547.001",
                "Registry Run Keys / Startup Folder",
                "Persistence"
            ),
            (
                "mimikatz",
                "T1003",
                "Credential Dumping",
                "Credential Access"
            ),
            (
                "credential",
                "T1003",
                "Credential Dumping",
                "Credential Access"
            ),
            (
                "lateral",
                "T1021",
                "Remote Services",
                "Lateral Movement"
            ),
            (
                "domain controller",
                "T1021",
                "Remote Services",
                "Lateral Movement"
            ),
            (
                "exfiltration",
                "T1041",
                "Exfiltration Over C2 Channel",
                "Exfiltration"
            ),
            (
                "sensitive financial records",
                "T1041",
                "Exfiltration Over C2 Channel",
                "Exfiltration"
            ),
            (
                "lockbit",
                "T1486",
                "Data Encrypted for Impact",
                "Impact"
            ),
            (
                "ransomware",
                "T1486",
                "Data Encrypted for Impact",
                "Impact"
            ),
            (
                "encrypt",
                "T1486",
                "Data Encrypted for Impact",
                "Impact"
            ),
        ]

        added = set()

        for keyword, tid, name, tactic in common_patterns:

            if keyword in text_lower and tid not in added:

                mappings.append(
                    {
                        "technique_id": tid,
                        "technique_name": name,
                        "description": f"Detected from keyword '{keyword}' in threat report.",
                        "tactic": tactic
                    }
                )

                added.add(tid)

        return mappings