from sqlalchemy.orm import Session
from . import models_db, schemas

def get_user_by_email(db: Session, email: str):
    return db.query(models_db.UserDB).filter(models_db.UserDB.email == email).first()

def create_user(db: Session, user: schemas.UserCreate, hashed_password: str):
    db_user = models_db.UserDB(
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone,
        city=user.city,
        company=user.company,
        password=hashed_password,
        is_client=bool(user.is_client),
        permission=user.permission or "user",
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_users(db: Session):
    return db.query(models_db.UserDB).all()