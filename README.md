# AI-Powered Threat Intelligence & Attack Mapping Platform

Advanced production-ready platform for automated threat analysis, IOC extraction, and MITRE ATT&CK mapping.

**Live Deployment:** [https://sentinel-ai-powered-threat-intellig-one.vercel.app/](https://sentinel-ai-powered-threat-intellig-one.vercel.app/)

## Features

- **Multi-Vector Input**: Support for raw text, CVE IDs, URLs, and file uploads (PDF, DOCX, TXT, CSV).
- **Automated IOC Extraction**: Uses high-performance regex to identify IPs, domains, hashes, and more.
- **Threat Enrichment**: Correlates IOCs with local intelligence databases (CVE, MITRE).
- **AI-Driven Analysis**: Leverages Google Gemini for behavioral mapping and executive reporting.
- **Risk Scoring Engine**: Sophisticated weighted scoring based on CVSS, exploit availability, and actor association.
- **Detection Engineering**: Automates the generation of Sigma, Splunk, Sentinel, and Elastic rules.
- **Interactive Visualization**: Real-time relationship graphs and risk gauges.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, Recharts, React Flow.
- **Backend**: FastAPI, Python 3.11, MongoDB (Motor).
- **AI**: GROQ AI.

## Project Structure

```text
/backend/           - FastAPI server and intelligence services
/frontend/          - Next.js 15 dashboard
/backend/app/data/  - Local intelligence datasets (JSON)
```

## Quick Start

### Backend

1. Navigate to `/backend`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Configure `.env` with your `GEMINI_API_KEY` and `MONGODB_URL`.
4. Start server: `python -m app.main`.

### Frontend

1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Start development server: `npm run dev`.

---
*Created by **Ullas** - AI-Powered Threat Intelligence Platform*


