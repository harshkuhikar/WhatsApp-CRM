from fastapi import APIRouter, Depends
from app.auth import get_current_user
from app.database import get_database
from datetime import datetime, timedelta

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("")
async def get_analytics(current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    # Total messages
    total_messages = await db.messages.count_documents({})
    
    # Messages today
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    messages_today = await db.messages.count_documents({
        "timestamp": {"$gte": today_start}
    })
    
    # Total contacts
    total_contacts = await db.contacts.count_documents({})
    
    # Active chats (contacts with messages in last 7 days)
    week_ago = datetime.utcnow() - timedelta(days=7)
    active_chats = await db.messages.distinct("contact_id", {
        "timestamp": {"$gte": week_ago}
    })
    
    # Total agents
    total_agents = await db.users.count_documents({"role": "agent"})
    
    # Messages per day (last 7 days)
    messages_per_day = []
    for i in range(7):
        day_start = today_start - timedelta(days=i)
        day_end = day_start + timedelta(days=1)
        count = await db.messages.count_documents({
            "timestamp": {"$gte": day_start, "$lt": day_end}
        })
        messages_per_day.append({
            "date": day_start.strftime("%Y-%m-%d"),
            "count": count
        })
    
    # Top active contacts
    pipeline = [
        {"$group": {"_id": "$contact_id", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 5}
    ]
    top_contacts_data = await db.messages.aggregate(pipeline).to_list(5)
    
    top_contacts = []
    for item in top_contacts_data:
        from bson import ObjectId
        if ObjectId.is_valid(item["_id"]):
            contact = await db.contacts.find_one({"_id": ObjectId(item["_id"])})
            if contact:
                top_contacts.append({
                    "name": contact.get("name", "Unknown"),
                    "phone": contact.get("phone", ""),
                    "message_count": item["count"]
                })
    
    # Agent performance
    agent_performance = []
    agents = await db.users.find({"role": "agent"}).to_list(100)
    for agent in agents:
        agent_id = str(agent["_id"])
        message_count = await db.messages.count_documents({
            "sender": {"$in": ["agent", "admin"]},
            "contact_id": {"$in": [
                str(c["_id"]) for c in await db.contacts.find({"assigned_agent": agent_id}).to_list(1000)
            ]}
        })
        agent_performance.append({
            "name": agent.get("name", "Unknown"),
            "email": agent.get("email", ""),
            "message_count": message_count
        })
    
    return {
        "total_messages": total_messages,
        "messages_today": messages_today,
        "total_contacts": total_contacts,
        "active_chats": len(active_chats),
        "total_agents": total_agents,
        "messages_per_day": messages_per_day,
        "top_contacts": top_contacts,
        "agent_performance": agent_performance
    }
