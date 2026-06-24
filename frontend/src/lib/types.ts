export interface IOCs {
  ipv4: string[];
  domain: string[];
  url: string[];
  email: string[];
  md5: string[];
  sha1: string[];
  sha256: string[];
  cve: string[];
}

export interface CVEDetails {
  id: string;
  cvss: number;
  severity: string;
  description: string;
  exploit_available: boolean;
  malware_associated: boolean;
  threat_actor_associated: boolean;
}

export interface Enrichment {
  cve_details: Record<string, CVEDetails>;
  threat_actors: string[];
  malware_families: string[];
}

export interface MitreMapping {
  technique_id: string;
  technique_name: string;
  description: string;
  tactic: string;
}

export interface RiskFactor {
  factor: string;
  points: number;
}

export interface AIReport {
  summary: string;
  attack_scenario: string;
  business_impact: string;
  immediate_actions: string[];
  long_term_remediation: string[];
  monitoring: string[];
  attack_path: string[];
  siem_queries: Record<string, string>;
}

export interface DetectionRules {
  sigma: string;
  splunk?: string;
  sentinel?: string;
  elastic?: string;
}

export interface GraphNode {
  id: string;
  type: string;
  data: { label: string };
  position: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface IOCGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Analysis {
  analysis_id: string;
  timestamp: string;
  input_type: string;
  input_text?: string;
  filename?: string;
  iocs: IOCs;
  enrichment: Enrichment;
  mitre_mapping: MitreMapping[];
  risk_score: number;
  risk_level: "Low" | "Medium" | "High" | "Critical";
  risk_factors: RiskFactor[];
  ai_report: AIReport;
  detection_rules: DetectionRules;
  graph: IOCGraph;
}
