from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()


def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)


class Car(db.Model):
    __tablename__ = "cars"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    carName = db.Column(db.String(250), nullable=False)
    automatic = db.Column(db.String(250), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    price = db.Column(db.String(100), nullable=False)
    speed = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.String(11), db.ForeignKey("users.id"), nullable=False)

    def __init__(
        self, carName, automatic, model, price, speed, description, image_url, user_id
    ):
        self.carName = carName
        self.automatic = automatic
        self.model = model
        self.price = price
        self.speed = speed
        self.description = description
        self.image_url = image_url
        self.user_id = user_id  # Asigna el valor del parámetro al campo user_id
