from groq import AsyncGroq
import json
from app.core.config import settings

class GeminiService:
    def __init__(self):
        self.client = AsyncGroq(api_key=settings.GEMINI_API_KEY)
        self.model = "llama-3.3-70b-versatile"

    async def generate_json(self, prompt: str) -> dict:
        if not settings.GEMINI_API_KEY:
            return self._fallback("Groq API key not configured")

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a cybersecurity threat intelligence analyst. Always respond with valid JSON only. No markdown, no commentary, no backticks."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.3,
                max_tokens=2048,
            )
            raw = response.choices[0].message.content.strip()
            # Strip markdown if model adds it anyway
            if raw.startswith("```"):
                raw = raw.split("```")[1]
                if raw.startswith("json"):
                    raw = raw[4:]
            
            # Additional safety for Llama-3 parsing
            raw = raw.strip()
            return json.loads(raw)
        except Exception as e:
            print(f"Groq Service Error: {e}")
            return self._fallback(str(e))

    def _fallback(self, reason: str) -> dict:
        return {"error": reason}