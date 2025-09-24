from sqlalchemy import create_engine, Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///./shifts.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class ShiftHistory(Base):
    __tablename__ = "shift_history"

    id = Column(String, primary_key=True, index=True)  # SideShift shift ID
    depositCoin = Column(String, nullable=False)
    settleCoin = Column(String, nullable=False)
    depositAmount = Column(String, nullable=False)
    settleAddress = Column(String, nullable=False)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)
