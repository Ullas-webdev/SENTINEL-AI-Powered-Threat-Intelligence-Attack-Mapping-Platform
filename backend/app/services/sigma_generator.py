from typing import Dict, List

class SigmaGenerator:
    @staticmethod
    def generate_rules(iocs: Dict[str, List[str]], risk_level: str) -> Dict[str, str]:
        # Generating a basic Sigma rule as a template
        ips = iocs.get("ipv4", [])
        domains = iocs.get("domain", [])
        
        sigma_body = f"""
title: Detection of Malicious Network Activity
id: {id(iocs)}
status: experimental
description: Detects communication with known malicious IPs and domains.
logsource:
    category: network_traffic
detection:
    selection_ips:
        dst_ip: {ips if ips else []}
    selection_domains:
        query: {domains if domains else []}
    condition: selection_ips or selection_domains
falsepositives:
    - Internal traffic
level: {risk_level.lower()}
"""
        
        splunk = f"index=network_logs ({' OR '.join(['dst_ip=' + ip for ip in ips]) if ips else 'dest_ip=*'})"
        ip_list = ",".join([f'"{ip}"' for ip in ips]) if ips else '"none"'

        sentinel = (
          f"DeviceNetworkEvents | where RemoteIP in ({ip_list})"
        )
        elastic = f"destination.ip: ({' OR '.join(ips) if ips else '*'})"
        
        return {
            "sigma": sigma_body.strip(),
            "splunk": splunk,
            "sentinel": sentinel,
            "elastic": elastic
        }
