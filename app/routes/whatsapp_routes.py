from fastapi import APIRouter, Request, HTTPException, Depends
from app.config import settings
from app.database import get_database
from app.auth import get_current_user
from datetime import datetime
import httpx
from bson import ObjectId

router = APIRouter(prefix="/whatsapp", tags=["WhatsApp"])

@router.get("/webhook")
async def verify_webhook(request: Request):
    """Verify webhook for WhatsApp Cloud API"""
    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")
    
    if mode == "subscribe" and token == settings.VERIFY_TOKEN:
        return int(challenge)
    
    raise HTTPException(status_code=403, detail="Verification failed")

@router.post("/webhook")
async def receive_message(request: Request):
    """Receive incoming messages from WhatsApp"""
    db = await get_database()
    body = await request.json()
    
    try:
        entry = body.get("entry", [])[0]
        changes = entry.get("changes", [])[0]
        value = changes.get("value", {})
        messages = value.get("messages", [])
        
        if messages:
            message = messages[0]
            from_number = message.get("from")
            message_body = message.get("text", {}).get("body", "")
            message_type = message.get("type", "text")
            
            # Find or create contact
            contact = await db.contacts.find_one({"phone": from_number})
            if not contact:
                contact_data = {
                    "name": from_number,
                    "phone": from_number,
                    "tags": ["New Lead"],
                    "notes": "",
                    "assigned_agent": None
                }
                result = await db.contacts.insert_one(contact_data)
                contact_id = str(result.inserted_id)
            else:
                contact_id = str(contact["_id"])
            
            # Store message
            message_data = {
                "contact_id": contact_id,
                "sender": "client",
                "message": message_body,
                "timestamp": datetime.utcnow(),
                "status": "received"
            }
            await db.messages.insert_one(message_data)
            
        return {"status": "ok"}
    except Exception as e:
        print(f"Error processing webhook: {e}")
        return {"status": "error", "message": str(e)}

from pydantic import BaseModel

class SendMessageRequest(BaseModel):
    phone: str
    message: str
    contact_id: str = None

@router.post("/send_message")
async def send_message(
    request: SendMessageRequest,
    current_user: dict = Depends(get_current_user)
):
    """Send message via WhatsApp Cloud API"""
    db = await get_database()
    phone = request.phone
    message = request.message
    contact_id = request.contact_id
    
    url = f"{settings.WHATSAPP_API_URL}/{settings.PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "messaging_product": "whatsapp",
        "to": phone,
        "type": "text",
        "text": {"body": message}
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)
        
        if response.status_code == 200:
            # Store sent message
            if contact_id:
                message_data = {
                    "contact_id": contact_id,
                    "sender": current_user.get("role", "agent"),
                    "message": message,
                    "timestamp": datetime.utcnow(),
                    "status": "sent"
                }
                await db.messages.insert_one(message_data)
            
            return {"status": "success", "data": response.json()}
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Failed to send message: {response.text}"
            )

@router.get("/messages/{contact_id}")
async def get_messages(contact_id: str, current_user: dict = Depends(get_current_user)):
    """Get all messages for a contact"""
    db = await get_database()
    
    if not ObjectId.is_valid(contact_id):
        raise HTTPException(status_code=400, detail="Invalid contact ID")
    
    messages = await db.messages.find({"contact_id": contact_id}).sort("timestamp", 1).to_list(1000)
    
    return [
        {
            "id": str(msg["_id"]),
            "contact_id": msg["contact_id"],
            "sender": msg["sender"],
            "message": msg["message"],
            "timestamp": msg["timestamp"].isoformat(),
            "status": msg.get("status", "sent")
        }
        for msg in messages
    ]
