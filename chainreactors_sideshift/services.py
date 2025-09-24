import httpx
from .config import BASE_URL, HEADERS

async def fetch_quote(data: dict):
    async with httpx.AsyncClient() as client:
        r = await client.post(f"{BASE_URL}/quotes", headers=HEADERS, json=data)
        r.raise_for_status()
        return r.json()

async def create_shift(data: dict):
    async with httpx.AsyncClient() as client:
        r = await client.post(f"{BASE_URL}/shifts/fixed", headers=HEADERS, json=data)
        r.raise_for_status()
        return r.json()

async def get_shift(shift_id: str):
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{BASE_URL}/shifts/{shift_id}", headers=HEADERS)
        r.raise_for_status()
        return r.json()
