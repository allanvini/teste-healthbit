from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class FormRecord(db.Model):
    __tablename__ = 'form_record'

    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(11), nullable=False, unique=True)
    position = db.Column(db.String(100), nullable=False, unique=False)
    city = db.Column(db.String(100), nullable=False, unique=False)
    state = db.Column(db.String(2), nullable=False, unique=False)
    ownership = db.Column(db.String(20), nullable=False, unique=False)
    phone = db.Column(db.String(14), nullable=False, unique=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    birthday = db.Column(db.Date, nullable=False, unique=False)
    biologicalGender = db.Column(db.String(9), nullable=False, unique=False)
    weight = db.Column(db.Float, nullable=False, unique=False)
    height = db.Column(db.Float, nullable=False, unique=False)
    systolicBloodPressure = db.Column(db.String(20), nullable=True, unique=False)
    diastolicBloodPressure = db.Column(db.String(20), nullable=True, unique=False)
    dontKnowBloodPressure = db.Column(db.Boolean, nullable=True, unique=False, default=False)
    diabetes = db.Column(db.String(10), nullable=False, unique=False)
    hearthProblems = db.Column(db.String(20), nullable=False, unique=False)
    highPressure = db.Column(db.String(20), nullable=False, unique=False)
    asthma = db.Column(db.String(20), nullable=False, unique=False)
    depression = db.Column(db.String(20), nullable=False, unique=False)
    anxiety = db.Column(db.String(20), nullable=False, unique=False)
    highCholesterol = db.Column(db.String(20), nullable=False, unique=False)
    backPain = db.Column(db.String(20), nullable=False, unique=False)
    jointPain = db.Column(db.String(20), nullable=False, unique=False)
    headPain = db.Column(db.String(20), nullable=False, unique=False)
    cancer = db.Column(db.String(20), nullable=False, unique=False)
    std = db.Column(db.String(20), nullable=False, unique=False)
    others = db.Column(db.String(100), nullable=True, unique=False)
    typeOfFood = db.Column(db.Integer, db.ForeignKey('food_types.id'), nullable=False)

class FoodTypes(db.Model):
    __tablename__ = 'food_types'

    id = db.Column(db.Integer, primary_key=True)
    foodCategory = db.Column(db.String(100), nullable=False, unique=True)

    # Relacionamento para os alimentos
    foods = db.relationship('Foods', backref='category', lazy=True)

class Foods(db.Model):
    __tablename__ = 'foods'

    id = db.Column(db.Integer, primary_key=True)
    categoryId = db.Column(db.Integer, db.ForeignKey('food_types.id'), nullable=False)
    food = db.Column(db.String(200), nullable=False)

class SelectedFoods(db.Model):
    __tablename__ = 'selected_foods'

    id = db.Column(db.Integer, primary_key=True)
    formId = db.Column(db.Integer, db.ForeignKey('form_record.id'), nullable=False)
    foodId = db.Column(db.Integer, db.ForeignKey('foods.id'), nullable=False)
    
