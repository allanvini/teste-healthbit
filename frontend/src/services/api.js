import PythonAPI from "../config/axios";

export async function getFoodCategories(){
    const results = await PythonAPI.get('/getAlimentacao')
    return results.data;
}

export async function getFoodTypesByCategory(categoryId){
    const results = await PythonAPI.get('/getAlimentacao', {
        params: {
            categoryId
        }
    })

    return results.data;
}

export async function sendForm(formData){
    try {
        const response = await PythonAPI.post('/submitFormulario', formData);
        
        if (response.status === 201) {
            return {
                success: true,
                data: response.data
            };
        }
    } catch (error) {

        if (error.response && error.response.data) {
            return {
                success: false,
                errors: error.response.data.errors
            };
        }

        return {
            success: false,
            errors: { message: 'Ocorreu um erro ao enviar o formulário.' }
        };
    }
}