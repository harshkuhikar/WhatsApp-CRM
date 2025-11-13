from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models import Contact, ContactCreate
from app.auth import get_current_user
from app.database import get_database
from bson import ObjectId

router = APIRouter(prefix="/contacts", tags=["Contacts"])

@router.post("", response_model=Contact)
async def create_contact(contact: ContactCreate, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    existing = await db.contacts.find_one({"phone": contact.phone})
    if existing:
        raise HTTPException(status_code=400, detail="Contact with this phone already exists")
    
    contact_dict = contact.model_dump()
    result = await db.contacts.insert_one(contact_dict)
    created_contact = await db.contacts.find_one({"_id": result.inserted_id})
    
    return Contact(**created_contact)

@router.get("", response_model=List[Contact])
async def get_contacts(current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    if current_user.get("role") == "admin":
        contacts = await db.contacts.find().to_list(1000)
    else:
        contacts = await db.contacts.find({"assigned_agent": str(current_user["_id"])}).to_list(1000)
    
    return [Contact(**contact) for contact in contacts]

@router.get("/{contact_id}", response_model=Contact)
async def get_contact(contact_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    if not ObjectId.is_valid(contact_id):
        raise HTTPException(status_code=400, detail="Invalid contact ID")
    
    contact = await db.contacts.find_one({"_id": ObjectId(contact_id)})
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return Contact(**contact)

@router.put("/{contact_id}", response_model=Contact)
async def update_contact(contact_id: str, contact: ContactCreate, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    if not ObjectId.is_valid(contact_id):
        raise HTTPException(status_code=400, detail="Invalid contact ID")
    
    contact_dict = contact.model_dump()
    result = await db.contacts.update_one(
        {"_id": ObjectId(contact_id)},
        {"$set": contact_dict}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    updated_contact = await db.contacts.find_one({"_id": ObjectId(contact_id)})
    return Contact(**updated_contact)

@router.delete("/{contact_id}")
async def delete_contact(contact_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    if not ObjectId.is_valid(contact_id):
        raise HTTPException(status_code=400, detail="Invalid contact ID")
    
    result = await db.contacts.delete_one({"_id": ObjectId(contact_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return {"message": "Contact deleted successfully"}
