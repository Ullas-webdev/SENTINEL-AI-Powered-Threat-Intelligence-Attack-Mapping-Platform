from app.utils.regex_patterns import extract_all_iocs

class IOCExtractor:
    @staticmethod
    def extract(text: str) -> dict:
        """
        Extract IOCs from text using pre-defined regex patterns.
        Returns a dictionary of IOC types and their values.
        """
        if not text:
            return {}
            
        iocs = extract_all_iocs(text)
        
        # Ensure all expected keys are present even if empty
        expected_keys = ["ipv4", "domain", "url", "email", "md5", "sha1", "sha256", "cve"]
        for key in expected_keys:
            if key not in iocs:
                iocs[key] = []
                
        return iocs
