# 🛡️ Sentinel AI: Predictive Threat Intelligence Platform

> **Revolutionizing Cybersecurity with Neural-Powered Adversarial Mapping.**

---

## 🔴 The Problem: The Reactive Security Gap
Modern Security Operations Centers (SOCs) are drowning in data but starving for intelligence.
- **Data Fragmentation**: IOCs (IPs, Domains, Hashes) are disparate points with no context.
- **Manual Mapping**: Correlating threats to the MITRE ATT&CK framework takes hours of manual research.
- **Reactive Defense**: Most tools tell you what *happened*, not what is *going to happen next*.
- **Alert Fatigue**: High-noise environments lead to missed critical signals.

## ⚡ The Solution: Sentinel AI
Sentinel AI is a production-grade threat intelligence ecosystem that uses **Large Language Models (LLMs)** to automate the heavy lifting of security analysis. 

- **Autonomous MITRE Mapping**: Instantly identifies and chains together up to 7+ adversarial techniques.
- **Predictive Kill Chain**: Projects the next stages of an attack (Persistence, Lateral Movement, Exfiltration) before they occur.
- **Interactive IOC Graphing**: A high-performance relational graph that visually links malicious infrastructure.
- **Neural Risk Scoring**: A weighted 0-100 score that combines behavioral heuristics with AI confidence.

## 📊 Approach & Design
We adopted a **"Intelligence-First" design philosophy**, focusing on rapid decision-making for analysts.
- **Architecture**: A decoupled Microservices approach with a high-performance FastAPI backend and a Next.js 15 frontend.
- **UI/UX**: A bespoke **Glassmorph SOC Dashboard** designed for low-light environments, prioritizing visibility of critical risk markers.
- **Data Integrity**: Strict Pydantic schemas ensure that AI-generated intelligence remains structured and actionable.

## 🛠️ The Technology Stack
| Component | Technology |
| :--- | :--- |
| **Neural Core** | Groq AI / Google Gemini 1.5 Pro |
| **Frontend** | Next.js 15, TypeScript, Framer Motion, Lucide |
| **Data Viz** | React Flow (Interactive Graphs), Recharts |
| **Backend** | FastAPI, Python 3.11, Pydantic v2 |
| **Persistence** | MongoDB (Motor Async Driver) |

## 🧠 Challenges Faced & Solved
- **Real-Time Synthesis**: Balancing AI latency with the need for immediate analysis. **Solution**: Implemented a heuristic cache for known high-fidelity scenarios.
- **Hydration & Build Stability**: Solved complex React 18+ hydration mismatches in Next.js by using client-side mounting guards for dynamic SOC telemetry.
- **Scaleable Graphs**: Managing complex IOC relationships without performance degradation. **Solution**: Optimized React Flow node-clustering logic.

---

## 📺 60-Second "Wowed" Demo
1. **Navigate** to the Sentinel Dashboard.
2. **Execute Analysis**: Input `secure-loginupdate.com` or `LockBit 3.0 behavior`.
3. **Behold**: Watch as the **Neural Engine** instantly:
   - Populates a **3D-accented Risk Gauge**.
   - Generates a **7-stage MITRE Technique Matrix**.
   - Renders an **Interactive Relational Graph** of the threat infrastructure.
   - Projects the **Adversarial Kill Chain** timeline.

---
**Sentinel AI** — *Turning indicators into intuition.*
