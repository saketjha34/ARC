from dotenv import load_dotenv 
import os

load_dotenv()

FRONTEND_URL=os.getenv("FRONTEND_URL")
print(FRONTEND_URL)