import axios from "axios";

const PythonAPI = axios.create({
    baseURL: 'http://localhost:3000'
})

export default PythonAPI