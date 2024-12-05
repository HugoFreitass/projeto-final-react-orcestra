import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-type': 'application/json'
    },
    params: {
        api_key: 'c0bd589456566d556432e707be797008',
        language: 'pt-BR'
    }
});

export default api