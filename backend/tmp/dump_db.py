import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import json
from datetime import datetime

async def dump_last_analyses():
    # URL from the .env file
    url = "mongodb+srv://ullasshetty11_db_user:Ullas%40100@cluster0.hkysoiq.mongodb.net/?appName=Cluster0"
    client = AsyncIOMotorClient(url)
    db = client.threat_intel
    
    cursor = db.analyses.find().sort("timestamp", -1).limit(5)
    analyses = await cursor.to_list(length=5)
    
    for i, a in enumerate(analyses):
        a["_id"] = str(a["_id"])
        if "timestamp" in a and isinstance(a["timestamp"], datetime):
            a["timestamp"] = a["timestamp"].isoformat()
        
        print(f"--- Analysis {i+1} ---")
        print(f"ID: {a.get('analysis_id')}")
        print(f"Time: {a.get('timestamp')}")
        print(f"Risk: {a.get('risk_score')} ({a.get('risk_level')})")
        print(f"MITRE Count: {len(a.get('mitre_mapping', []))}")
        print(f"Graph Nodes: {len(a.get('graph', {}).get('nodes', []))}")
        print(f"Graph Edges: {len(a.get('graph', {}).get('edges', []))}")
        print("----------------------\n")

if __name__ == "__main__":
    asyncio.run(dump_last_analyses())
