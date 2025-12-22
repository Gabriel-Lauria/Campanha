from .database import engine, SessionLocal
from .models_db import Base, UserDB
from .utils import get_password_hash
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

def seed_admin():
    db: Session = SessionLocal()
    try:
        admin = db.query(UserDB).filter(UserDB.email == "admin@campads.com").first()
        if not admin:
            admin_user = UserDB(
                first_name="Admin",
                last_name="User",
                email="admin@campads.com",
                password=get_password_hash("admin123"),
                permission="admin",
                is_client=False,
            )
            db.add(admin_user)
            db.commit()
            print("Admin criado: admin@campads.com / admin123")
        else:
            print("Admin já existe")
    finally:
        db.close()

if __name__ == '__main__':
    seed_admin()