from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from . import utils, schemas, crud
from .database import get_db

router = APIRouter()

@router.post("/login", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, form_data.username)
    if not user or not utils.verify_password(form_data.password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome de usuário ou senha incorretos")

    access_token_expires = timedelta(minutes=utils.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = utils.create_access_token(
        data={"sub": user.email, "permission": user.permission},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login/json", response_model=schemas.Token)
async def login_json(login: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, login.username)
    if not user or not utils.verify_password(login.password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome de usuário ou senha incorretos")

    access_token_expires = timedelta(minutes=utils.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = utils.create_access_token(
        data={"sub": user.email, "permission": user.permission},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/verify")
async def verify_token(current_user = Depends(utils.get_current_user)):
    return {"username": current_user.email, "permission": current_user.permission}

@router.post("/user", response_model=schemas.UserView)
async def create_new_user(user: schemas.UserCreate, db: Session = Depends(get_db), admin_user = Depends(utils.check_admin_permission)):
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email já existe.")
    hashed_password = utils.get_password_hash(user.password)
    new_user = crud.create_user(db, user, hashed_password)
    return new_user

@router.get("/users", response_model=list[schemas.UserView])
async def get_all_users(db: Session = Depends(get_db), admin_user = Depends(utils.check_admin_permission)):
    return crud.get_all_users(db)

@router.put("/user/{email}")
async def update_user_permission(email: str, permission: str, db: Session = Depends(get_db), admin_user = Depends(utils.check_admin_permission)):
    user = crud.get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    user.permission = permission
    db.add(user)
    db.commit()
    return {"message": f"Permissão atualizada para {email}"}