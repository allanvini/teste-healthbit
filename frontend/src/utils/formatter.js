export function formatFormForSubmission(formData){
    let formattedData = {
        ...formData,
        cpf: formData.cpf.replace(/[.-]/g, ''),
        phone: "+55"+formData.phone.replace(/[()\s-]/g, ''),
        diabetes: formData.diabetes[0],
        hearthProblems: formData.hearthProblems[0],
        highPressure: formData.highPressure[0],
        asthma: formData.asthma[0],
        depression: formData.depression[0],
        anxiety: formData.anxiety[0],
        highCholesterol: formData.highCholesterol[0],
        backPain: formData.backPain[0],
        jointPain: formData.jointPain[0],
        headPain: formData.headPain[0],
        cancer: formData.cancer[0],
        std: formData.std[0],
        markedFoodTypes: formData.markedFoodTypes.map(item => Number(item)),
        birthday: formData.birthday.split('-').reverse().join('/'),
        weight: Number(formData.weight),
        height: Number(formData.height),
        typeOfFood: formData.selectedFoodCategory,
        selectedFoods: formData.markedFoodTypes
    }
    Object.keys(formattedData).forEach(key => {
        if (formattedData[key] === "" || formattedData[key] === null || formattedData[key] === undefined) {
            delete formattedData[key];
        }
    });
    console.log(formattedData.birthday)
    return formattedData
}