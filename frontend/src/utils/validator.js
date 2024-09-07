export function validatePage1(data){
    let errors = [];

    // Validação de fullName (não pode estar em branco ou conter números)
    if (!data.fullName || /\d/.test(data.fullName)) {
      errors.push({
        title: "Erro",
        message: "O nome não pode estar em branco ou conter números.",
        id: "fullName",
      });
    }
  
    // Validação de CPF (11 dígitos, desconsiderando pontos e hífens)
    const cpfClean = data.cpf.replace(/[^\d]/g, ''); // Remove pontos e hífens
    if (!cpfClean || cpfClean.length !== 11) {
      errors.push({
        title: "Erro",
        message: "O CPF deve conter 11 dígitos.",
        id: "cpf",
      });
    }
  
    // Validação de campos obrigatórios (position, city, state, ownership)
    if (!data.position) {
      errors.push({
        title: "Erro",
        message: "O campo Posição é obrigatório.",
        id: "position",
      });
    }
  
    if (!data.city) {
      errors.push({
        title: "Erro",
        message: "O campo Cidade é obrigatório.",
        id: "city",
      });
    }
  
    if (!data.state) {
      errors.push({
        title: "Erro",
        message: "O campo Estado é obrigatório.",
        id: "state",
      });
    }
  
    if (!data.ownership) {
      errors.push({
        title: "Erro",
        message: "O campo Titularidade é obrigatório.",
        id: "ownership",
      });
    }
  
    // Validação de areDataCorrect (deve ser igual a "Y")
    if (data.areDataCorrect !== "Y") {
      errors.push({
        title: "Erro",
        message: "Você deve confirmar que os dados estão corretos.",
        id: "areDataCorrect",
      });
    }
  
    // Validação de phone (formato correto com DDD)
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
      errors.push({
        title: "Erro",
        message: "O telefone deve estar no formato (XX) XXXXX-XXXX.",
        id: "phone",
      });
    }
  
    // Validação de email (formato correto)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push({
        title: "Erro",
        message: "O email deve estar em um formato válido.",
        id: "email",
      });
    }
  
    // Validação de birthday (não pode estar em branco)
    if (!data.birthday) {
      errors.push({
        title: "Erro",
        message: "A data de nascimento é obrigatória.",
        id: "birthday",
      });
    }
  
    // Validação de biologicalGender (não pode estar em branco)
    if (!data.biologicalGender) {
      errors.push({
        title: "Erro",
        message: "O gênero biológico é obrigatório.",
        id: "biologicalGender",
      });
    }
  
    // Validação de weight (não pode ser zero ou menor que zero)
    if (data.weight <= 0) {
      errors.push({
        title: "Erro",
        message: "O peso não pode ser zero ou negativo.",
        id: "weight",
      });
    }
  
    // Validação de height (não pode ser zero ou menor que zero)
    if (data.height <= 0) {
      errors.push({
        title: "Erro",
        message: "A altura não pode ser zero ou negativa.",
        id: "height",
      });
    }
  
    // Validação de systolicBloodPressure e diastolicBloodPressure (quando dontKnowBloodPressure for falso)
    if (!data.dontKnowBloodPressure) {
      if (!data.systolicBloodPressure) {
        errors.push({
          title: "Erro",
          message: "A pressão sistólica é obrigatória quando 'Não sei' não está marcado.",
          id: "systolicBloodPressure",
        });
      }
      if (!data.diastolicBloodPressure) {
        errors.push({
          title: "Erro",
          message: "A pressão diastólica é obrigatória quando 'Não sei' não está marcado.",
          id: "diastolicBloodPressure",
        });
      }
    }
  
    return errors;
}

export function validatePage2(data){
    let errors = [];

  // Função para validar se o array tem pelo menos um valor
  const validateArray = (fieldValue, fieldName, fieldId) => {
    if (!Array.isArray(fieldValue) || fieldValue.length === 0) {
      errors.push({
        title: "Erro",
        message: `O campo ${fieldName} deve ter pelo menos uma opção selecionada.`,
        id: fieldId,
      });
    }
  };

  // Validando cada campo da página 2
  validateArray(data.diabetes, "Diabetes", "diabetes");
  validateArray(data.hearthProblems, "Problemas Cardíacos", "hearthProblems");
  validateArray(data.highPressure, "Pressão Alta", "highPressure");
  validateArray(data.asthma, "Asma", "asthma");
  validateArray(data.depression, "Depressão", "depression");
  validateArray(data.anxiety, "Ansiedade", "anxiety");
  validateArray(data.highCholesterol, "Colesterol Alto", "highCholesterol");
  validateArray(data.backPain, "Dor nas Costas", "backPain");
  validateArray(data.jointPain, "Dor nas Articulações", "jointPain");
  validateArray(data.headPain, "Dor de Cabeça", "headPain");
  validateArray(data.cancer, "Câncer", "cancer");
  validateArray(data.std, "Doenças Sexualmente Transmissíveis", "std");

  return errors;

}

export function validatePage3(data){
    let errors = []
    if(data.markedFoodTypes.length <= 0){
        errors.push({
            title: 'Erro',
            message: "É necessário selecionar pelomenos um tipo de alimento",
            id: 'markedFoodTypes'
        })
    }
    return errors;
}
