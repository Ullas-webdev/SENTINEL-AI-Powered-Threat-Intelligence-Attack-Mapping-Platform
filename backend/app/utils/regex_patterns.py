import re

# Regex patterns for IOC extraction
IOC_PATTERNS = {
    "ipv4": r"\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b",
    "domain": r"\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-2][a-z0-2]{0,16}\b",
    "url": r"https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+\b",
    "email": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
    "md5": r"\b[a-fA-F0-9]{32}\b",
    "sha1": r"\b[a-fA-F0-9]{40}\b",
    "sha256": r"\b[a-fA-F0-9]{64}\b",
    "cve": r"CVE-\d{4}-\d{4,7}"
}

def extract_all_iocs(text: str) -> dict:
    extracted = {}
    for ioc_type, pattern in IOC_PATTERNS.items():
        matches = re.findall(pattern, text, re.IGNORECASE)
        if matches:
            extracted[ioc_type] = list(set(matches))
    return extracted
