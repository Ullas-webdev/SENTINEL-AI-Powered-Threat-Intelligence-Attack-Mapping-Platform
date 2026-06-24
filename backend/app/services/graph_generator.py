from typing import Dict, List, Any
import random

class GraphGenerator:
    @staticmethod
    def generate(iocs: Dict[str, List[str]], mitre: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
        nodes = []
        edges = []
        
        # Center Node
        nodes.append({
            "id": "threat_event",
            "type": "default",
            "data": {"label": "Threat Intelligence Event"},
            "position": {"x": 250, "y": 250}
        })
        
        y_offset = 0
        for ioc_type, values in iocs.items():
            for i, val in enumerate(values):
                node_id = f"{ioc_type}_{i}"
                nodes.append({
                    "id": node_id,
                    "type": "output",
                    "data": {"label": f"{ioc_type}: {val}"},
                    "position": {"x": 500, "y": 100 + y_offset}
                })
                edges.append({
                    "id": f"e-{node_id}",
                    "source": "threat_event",
                    "target": node_id,
                    "label": "contains"
                })
                y_offset += 60
                
        y_offset = 0
        for i, tech in enumerate(mitre):
            node_id = f"mitre_{i}"
            nodes.append({
                "id": node_id,
                "type": "input",
                "data": {"label": f"MITRE: {tech.get('technique_id')}"},
                "position": {"x": 50, "y": 100 + y_offset}
            })
            edges.append({
                "id": f"e-{node_id}",
                "source": node_id,
                "target": "threat_event",
                "label": "maps to"
            })
            y_offset += 60
            
        return {"nodes": nodes, "edges": edges}
