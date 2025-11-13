from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models import Reminder, ReminderCreate
from app.auth import get_current_user
from app.database import get_database
from bson import ObjectId

router = APIRouter(prefix="/reminders", tags=["Reminders"])

@router.post("", response_model=Reminder)
async def create_reminder(reminder: ReminderCreate, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    reminder_dict = reminder.model_dump()
    reminder_dict["completed"] = False
    result = await db.reminders.insert_one(reminder_dict)
    created_reminder = await db.reminders.find_one({"_id": result.inserted_id})
    
    return Reminder(**created_reminder)

@router.get("", response_model=List[Reminder])
async def get_reminders(current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    if current_user.get("role") == "admin":
        reminders = await db.reminders.find({"completed": False}).to_list(1000)
    else:
        reminders = await db.reminders.find({
            "assigned_agent": str(current_user["_id"]),
            "completed": False
        }).to_list(1000)
    
    return [Reminder(**reminder) for reminder in reminders]

@router.put("/{reminder_id}/complete")
async def complete_reminder(reminder_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    if not ObjectId.is_valid(reminder_id):
        raise HTTPException(status_code=400, detail="Invalid reminder ID")
    
    result = await db.reminders.update_one(
        {"_id": ObjectId(reminder_id)},
        {"$set": {"completed": True}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Reminder not found")
    
    return {"message": "Reminder marked as complete"}
