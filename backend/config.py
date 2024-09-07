import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://root:VzCyLwUKjHWNqS763Qgfeb@localhost:5432/hbitforms')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
