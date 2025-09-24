import os
from dotenv import load_dotenv

load_dotenv()  # load from .env

SIDESHIFT_API_KEY = os.getenv("SIDESHIFT_API_KEY")
BASE_URL = "https://api.sideshift.ai/v2"

HEADERS = {
    "Authorization": f"Bearer {SIDESHIFT_API_KEY}",
    "Content-Type": "application/json"
}
