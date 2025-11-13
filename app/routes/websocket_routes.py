from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket import manager
from app.database import get_database
from datetime import datetime
from bson import ObjectId
import json

router = APIRouter()

@router.websocket("/ws/chat/{contact_id}")
async def websocket_chat(websocket: WebSocket, contact_id: str):
    await manager.connect(websocket, contact_id)
    db = await get_database()
    
    try:
        # Send connection confirmation
        await websocket.send_json({
            "type": "connection",
            "status": "connected",
            "contact_id": contact_id,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # Load and send message history
        messages = await db.messages.find(
            {"contact_id": contact_id}
        ).sort("timestamp", -1).limit(50).to_list(50)
        
        # Reverse to show oldest first
        messages.reverse()
        
        # Convert ObjectId to string for JSON serialization
        for msg in messages:
            msg["_id"] = str(msg["_id"])
            if isinstance(msg.get("timestamp"), datetime):
                msg["timestamp"] = msg["timestamp"].isoformat()
        
        await websocket.send_json({
            "type": "history",
            "messages": messages
        })
        
        # Listen for incoming messages
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Create message document
            message_doc = {
                "contact_id": contact_id,
                "sender": message_data.get("sender", "agent"),
                "message": message_data.get("message", ""),
                "status": message_data.get("status", "sent"),
                "timestamp": datetime.utcnow()
            }
            
            # Save to database
            result = await db.messages.insert_one(message_doc)
            message_doc["_id"] = str(result.inserted_id)
            message_doc["timestamp"] = message_doc["timestamp"].isoformat()
            
            # Broadcast to all connected clients for this contact
            await manager.send_message({
                "type": "message",
                "data": message_doc
            }, contact_id)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, contact_id)
        print(f"Client disconnected from contact {contact_id}")
    except Exception as e:
        print(f"WebSocket error for contact {contact_id}: {str(e)}")
        manager.disconnect(websocket, contact_id)
        try:
            await websocket.close()
        except:
            pass