from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

class Database:
    client: AsyncIOMotorClient = None
    
db = Database()

async def get_database():
    return db.client[settings.DATABASE_NAME]

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(settings.MONGODB_URI)
    print(f"Connected to MongoDB at {settings.MONGODB_URI}")

async def close_mongo_connection():
    db.client.close()
    print("Closed MongoDB connection")
