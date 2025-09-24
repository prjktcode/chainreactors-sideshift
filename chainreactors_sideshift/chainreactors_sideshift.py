from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os

# Load secrets from environment variables
SIDESHIFT_API_URL = "https://sideshift.ai/api/v2"
SIDESHIFT_SECRET = os.getenv("SIDESHIFT_SECRET")  # your API key
AFFILIATE_ID = os.getenv("AFFILIATE_ID")

app = FastAPI(title="AI Portfolio Manager - SideShift Prototype")

# ---------- Models ----------
class QuoteRequest(BaseModel):
    depositCoin: str
    settleCoin: str
    depositNetwork: str = None
    settleNetwork: str = None
    depositAmount: str = None
    settleAmount: str = None

class ShiftRequest(BaseModel):
    quoteId: str
    settleAddress: str

# ---------- API Calls ----------
async def call_sideshift(endpoint: str, method="GET", data=None):
    headers = {
        "Content-Type": "application/json",
        "x-sideshift-secret": SIDESHIFT_SECRET,
    }
    url = f"{SIDESHIFT_API_URL}{endpoint}"

    async with httpx.AsyncClient() as client:
        try:
            if method == "POST":
                resp = await client.post(url, headers=headers, json=data)
            else:
                resp = await client.get(url, headers=headers)
            resp.raise_for_status()
            return resp.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"SideShift API error: {str(e)}")

# ---------- Endpoints ----------
@app.post("/quote")
async def get_quote(req: QuoteRequest):
    """Request a SideShift quote."""
    data = req.dict(exclude_none=True)
    data["affiliateId"] = AFFILIATE_ID
    return await call_sideshift("/quotes", method="POST", data=data)

@app.post("/shift")
async def create_shift(req: ShiftRequest):
    """Create a fixed-rate shift from a quote."""
    data = {
        "quoteId": req.quoteId,
        "settleAddress": req.settleAddress,
        "affiliateId": AFFILIATE_ID,
    }
    return await call_sideshift("/shifts/fixed", method="POST", data=data)

@app.get("/status/{shift_id}")
async def get_status(shift_id: str):
    """Check the status of a shift by ID."""
    return await call_sideshift(f"/shifts/{shift_id}", method="GET")

