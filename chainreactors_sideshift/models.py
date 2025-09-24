from pydantic import BaseModel

class QuoteRequest(BaseModel):
    depositCoin: str
    settleCoin: str
    depositAmount: str

class ShiftRequest(BaseModel):
    depositCoin: str
    settleCoin: str
    depositAmount: str
    settleAddress: str
