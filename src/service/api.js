import axios from "axios";

const url = 'https://viacep.com.br/ws/'

const api = axios.create({
    baseURL: `${url}`
})

export default api