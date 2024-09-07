import re

def validate_cpf(cpf):
    return re.fullmatch(r'\d{11}', cpf) is not None

def validate_name(name):
    return not bool(re.search(r'\d', name))

def validate_phone(phone):
    # Valida se o número está no formato internacional completo: +55 seguido de 9 dígitos
    return re.fullmatch(r'^\+\d{1,3}\d{10,11}$', phone) is not None

def validate_email(email):
    # Valida se o email está no formato correto
    return re.fullmatch(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email) is not None
