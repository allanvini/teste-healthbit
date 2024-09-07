from flask import Flask, request, jsonify
from models import db, FormRecord, FoodTypes, Foods, SelectedFoods
from flask_migrate import Migrate
from flask_cors import CORS
from utils.validators import validate_cpf, validate_name, validate_phone, validate_email
from datetime import datetime

app = Flask(__name__)
app.config.from_object('config.Config')

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/getAlimentacao', methods=['GET'])
def get_food_categories():
    category_id = request.args.get('categoryId')
    
    if category_id:
        # Se "categoryId" for fornecido, buscar todos os alimentos relacionados à categoria
        foods = Foods.query.filter_by(categoryId=category_id).all()
        if foods:
            result = [{'id': food.id, 'food': food.food} for food in foods]
            return jsonify(result), 200
        else:
            return jsonify({'message': 'Category not found or no foods available'}), 404
    else:
        # Se "categoryId" não for fornecido, retornar todas as categorias
        categories = FoodTypes.query.all()
        result = [{'id': category.id, 'foodCategory': category.foodCategory} for category in categories]
        return jsonify(result), 200


@app.route('/submitFormulario', methods=['POST'])
def submit_form():
    data = request.get_json()

    # Extraindo dados do JSON
    fullName = data.get('fullName')
    cpf = data.get('cpf')
    position = data.get('position')
    city = data.get('city')
    state = data.get('state')
    ownership = data.get('ownership')
    phone = data.get('phone')
    email = data.get('email')
    birthday = data.get('birthday')
    biologicalGender = data.get('biologicalGender')
    weight = data.get('weight')
    height = data.get('height')
    systolicBloodPressure = data.get('systolicBloodPressure')
    diastolicBloodPressure = data.get('diastolicBloodPressure')
    dontKnowBloodPressure = data.get('dontKnowBloodPressure')
    diabetes = data.get('diabetes')
    hearthProblems = data.get('hearthProblems')
    highPressure = data.get('highPressure')
    asthma = data.get('asthma')
    depression = data.get('depression')
    anxiety = data.get('anxiety')
    highCholesterol = data.get('highCholesterol')
    backPain = data.get('backPain')
    jointPain = data.get('jointPain')
    headPain = data.get('headPain')
    cancer = data.get('cancer')
    std = data.get('std')
    typeOfFood = data.get('typeOfFood')
    selectedFoods = data.get('selectedFoods')

    # Validações
    errors = {}

    if not validate_name(fullName):
        errors['fullName'] = 'O nome não pode conter números.'

    if not validate_cpf(cpf):
        errors['cpf'] = 'O CPF deve ter 11 digitos.'

    if not validate_phone(phone):
        errors['phone'] = 'O campo de telefone deve estar em um formato internacional +55xxxxxxxxxx.'

    if not validate_email(email):
        errors['email'] = 'Formato invalido de email.'
        
    # Verificando duplicidade de CPF ou email
    existing_cpf = FormRecord.query.filter_by(cpf=cpf).first()
    existing_email = FormRecord.query.filter_by(email=email).first()

    if existing_cpf:
        errors['cpf'] = 'O CPF informado já foi cadatrado.'

    if existing_email:
        errors['email'] = 'O email informado já foi cadastrado.'

    if errors:
        return jsonify({"errors": errors}), 400

    try:
        # Convertendo a data de aniversário para o formato correto
        birthday = datetime.strptime(birthday, '%d/%m/%Y').date()
    except ValueError:
        return jsonify({"errors": "Formato de data invalido para o dia de nascimento, deve estar no formato DD/MM/YYYY."}), 400

    # Criando o novo registro de formulárioa
    new_record = FormRecord(
        fullName=fullName,
        cpf=cpf,
        position=position,
        city=city,
        state=state,
        ownership=ownership,
        phone=phone,
        email=email,
        birthday=birthday,
        biologicalGender=biologicalGender,
        weight=weight,
        height=height,
        systolicBloodPressure=systolicBloodPressure,
        diastolicBloodPressure=diastolicBloodPressure,
        dontKnowBloodPressure=dontKnowBloodPressure,
        diabetes=diabetes,
        hearthProblems=hearthProblems,
        highPressure=highPressure,
        asthma=asthma,
        depression=depression,
        anxiety=anxiety,
        highCholesterol=highCholesterol,
        backPain=backPain,
        jointPain=jointPain,
        headPain=headPain,
        cancer=cancer,
        std=std,
        typeOfFood=typeOfFood
    )

    db.session.add(new_record)
    db.session.commit()

    # Adicionando os alimentos selecionados (selectedFoods)
    if selectedFoods:
        for food_id in selectedFoods:
            selected_food = SelectedFoods(formId=new_record.id, foodId=food_id)
            db.session.add(selected_food)

    db.session.commit()

    # Retornando o formulário com os relacionamentos (typeOfFood e selectedFoods)
    form_data = {
        "id": new_record.id,
        "fullName": new_record.fullName,
        "cpf": new_record.cpf,
        "position": new_record.position,
        "city": new_record.city,
        "state": new_record.state,
        "ownership": new_record.ownership,
        "phone": new_record.phone,
        "email": new_record.email,
        "birthday": new_record.birthday.strftime('%d/%m/%Y'),
        "biologicalGender": new_record.biologicalGender,
        "weight": new_record.weight,
        "height": new_record.height,
        "systolicBloodPressure": new_record.systolicBloodPressure,
        "diastolicBloodPressure": new_record.diastolicBloodPressure,
        "dontKnowBloodPressure": new_record.dontKnowBloodPressure,
        "typeOfFood": {
            "id": new_record.typeOfFood,
            "foodCategory": FoodTypes.query.get(new_record.typeOfFood).foodCategory
        },
        "selectedFoods": [
            {
                "id": food.id,
                "food": Foods.query.get(food.foodId).food
            } for food in SelectedFoods.query.filter_by(formId=new_record.id).all()
        ]
    }

    return jsonify(form_data), 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)
