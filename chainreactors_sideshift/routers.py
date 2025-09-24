from fastapi import APIRouter, HTTPException
from ..models import QuoteRequest, ShiftRequest
from .. import services

router = APIRouter(prefix="/shift", tags=["Shift"])

@router.post("/quote")
async def get_quote(req: QuoteRequest):
    try:
        return await services.fetch_quote(req.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_shift(req: ShiftRequest):
    try:
        return await services.create_shift(req.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{shift_id}")
async def get_shift_status(shift_id: str):
    try:
        return await services.get_shift(shift_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
