from pydantic import BaseModel, EmailStr
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    permission: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    phone: Optional[str] = None
    city: Optional[str] = None
    company: Optional[str] = None

class UserCreate(UserBase):
    password: str
    permission: Optional[str] = "user"
    is_client: Optional[bool] = False

class UserView(UserBase):
    id: int
    permission: str

    class Config:
        orm_mode = True