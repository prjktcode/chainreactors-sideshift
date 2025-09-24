from fastapi import FastAPI
from routers import shifts

app = FastAPI(title="SideShift API Demo")

# Register routers
app.include_router(shifts.router)

@app.get("/")
def root():
    return {"msg": "🚀 SideShift API Demo is running"}
