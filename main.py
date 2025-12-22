from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import routes as auth_routes

app = FastAPI(title="CampAds API")

origins = [
    "http://localhost",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to CampAds Backend API"}