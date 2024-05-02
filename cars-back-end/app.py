from flask import Flask, request, jsonify, session
from flask_bcrypt import (
    Bcrypt,
)

from flask_cors import CORS
from models import db, User, Car
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
import cloudinary
import cloudinary.uploader
from uuid import uuid4
import os


cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)
app = Flask(__name__)

app.config["SECRET_KEY"] = "cairocoders-ednalan"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"


SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db.init_app(app)
migrate = Migrate(app, db)
ma = Marshmallow(app)

with app.app_context():
    db.create_all()


def get_uuid():
    return uuid4().hex


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/inscribirse", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
    name = request.json["name"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, name=name)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({"id": new_user.id, "email": new_user.email, "name": new_user.name})


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id
    print("User logged in. User ID:", user.id)
    return jsonify({"id": user.id, "email": user.email})


@app.route("/logout", methods=["GET"])
def logout_user():
    session.pop("user_id", None)  # Elimina la sesión del usuario
    return jsonify({"message": "Logged out successfully"}), 200


class CarsSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "carName",
            "model",
            "automatic",
            "price",
            "speed",
            "description",
            "image_url",
            "user_id",
        )


cars_schema = CarsSchema()
car_schema = CarsSchema(many=True)


@app.route("/listusers", methods=["GET"])
def listusers():
    all_cars = Car.query.all()
    results = car_schema.dump(all_cars)
    return jsonify(results)


@app.route("/publicarautos", methods=["POST"])
def publicar_autos():
    data = request.json
    carName = data.get("carName")
    automatic = data.get("automatic")
    model = data.get("model")
    price = data.get("price")
    speed = data.get("speed")
    description = data.get("description")
    image_url = request.json["image_url"]
    user_id = data.get("user_id")

    new_car = Car(
        carName=carName,
        automatic=automatic,
        model=model,
        price=price,
        speed=speed,
        description=description,
        image_url=image_url,
        user_id=user_id,
    )

    db.session.add(new_car)
    db.session.commit()

    return jsonify({"message": "Auto publicado exitosamente"}), 200


@app.route("/cars/<string:car_id>", methods=["GET"])
def get_car_details(car_id):
    car = Car.query.filter_by(id=car_id).first()
    if car:
        car_details = {
            "id": car.id,
            "carName": car.carName,
            "model": car.model,
            "automatic": car.automatic,
            "price": car.price,
            "speed": car.speed,
            "description": car.description,
            "image_url": car.image_url,
            "user_id": car.user_id,
        }
        return jsonify(car_details)
    else:
        return jsonify({"error": "Car not found"}), 404


@app.route("/cars/<string:car_id>", methods=["DELETE"])
def delete_car(car_id):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"error": "Missing Authorization header"}), 401

    parts = auth_header.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return jsonify({"error": "Invalid Authorization header"}), 401

    token = parts[1]
    user_id = token
    car_to_delete = Car.query.filter_by(id=car_id, user_id=user_id).first()

    if car_to_delete:
        db.session.delete(car_to_delete)
        db.session.commit()
        return jsonify({"message": "Car deleted successfully"}), 200
    else:
        return jsonify({"error": "Car not found or unauthorized"}), 404


if __name__ == "__main__":
    app.run(host="localhost", port=5000)
