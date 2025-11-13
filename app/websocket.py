from fastapi import WebSocket, WebSocketDisconnect
from typing import Dict, List
from datetime import datetime
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}
    
    async def connect(self, websocket: WebSocket, contact_id: str):
        await websocket.accept()
        if contact_id not in self.active_connections:
            self.active_connections[contact_id] = []
        self.active_connections[contact_id].append(websocket)
    
    def disconnect(self, websocket: WebSocket, contact_id: str):
        if contact_id in self.active_connections:
            self.active_connections[contact_id].remove(websocket)
            if not self.active_connections[contact_id]:
                del self.active_connections[contact_id]
    
    async def send_message(self, message: dict, contact_id: str):
        if contact_id in self.active_connections:
            for connection in self.active_connections[contact_id]:
                try:
                    await connection.send_json(message)
                except:
                    pass
    
    async def broadcast(self, message: dict):
        for contact_id in self.active_connections:
            await self.send_message(message, contact_id)

manager = ConnectionManager()
