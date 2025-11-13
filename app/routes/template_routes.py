from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models import Template, TemplateCreate
from app.auth import get_current_user
from app.database import get_database
from bson import ObjectId

router = APIRouter(prefix="/templates", tags=["Templates"])

@router.post("", response_model=Template)
async def create_template(template: TemplateCreate, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    template_dict = template.model_dump()
    result = await db.templates.insert_one(template_dict)
    created_template = await db.templates.find_one({"_id": result.inserted_id})
    
    return Template(**created_template)

@router.get("", response_model=List[Template])
async def get_templates(current_user: dict = Depends(get_current_user)):
    db = await get_database()
    templates = await db.templates.find().to_list(1000)
    return [Template(**template) for template in templates]

@router.delete("/{template_id}")
async def delete_template(template_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    
    if not ObjectId.is_valid(template_id):
        raise HTTPException(status_code=400, detail="Invalid template ID")
    
    result = await db.templates.delete_one({"_id": ObjectId(template_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Template not found")
    
    return {"message": "Template deleted successfully"}
