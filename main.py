from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import connect_to_mongo, close_mongo_connection
from app.routes import (
    auth_routes,
    contact_routes,
    whatsapp_routes,
    websocket_routes,
    analytics_routes,
    label_routes,
    template_routes
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

app = FastAPI(
    title="WhatsApp CRM API",
    description="A comprehensive CRM system for WhatsApp Business",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_routes.router)
app.include_router(contact_routes.router)
app.include_router(whatsapp_routes.router)
app.include_router(websocket_routes.router)
app.include_router(analytics_routes.router)
app.include_router(label_routes.router)
app.include_router(template_routes.router)

@app.get("/")
async def root():
    return {
        "message": "WhatsApp Business CRM API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
