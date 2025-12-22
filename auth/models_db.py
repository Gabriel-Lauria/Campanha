from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    city = Column(String, nullable=True)
    company = Column(String, nullable=True)
    password = Column(String, nullable=False)
    is_client = Column(Boolean, default=False)
    permission = Column(String, default="user")