from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models import Label, LabelCreate
from app.auth import get_current_user
from app.database import get_database
from bson import ObjectId

router = APIRouter(prefix="/labels", tags=["Labels"])

@router.post("", response_model=Label)
async def create_label(label: LabelCreate, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    label_dict = label.model_dump()
    result = await db.labels.insert_one(label_dict)
    created_label = await db.labels.find_one({"_id": result.inserted_id})
    
    return Label(**created_label)

@router.get("", response_model=List[Label])
async def get_labels(current_user: dict = Depends(get_current_user)):
    db = await get_database()
    labels = await db.labels.find().to_list(1000)
    return [Label(**label) for label in labels]

@router.delete("/{label_id}")
async def delete_label(label_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    if not ObjectId.is_valid(label_id):
        raise HTTPException(status_code=400, detail="Invalid label ID")
    
    result = await db.labels.delete_one({"_id": ObjectId(label_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Label not found")
    
    return {"message": "Label deleted successfully"}
