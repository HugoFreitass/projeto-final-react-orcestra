import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-type': 'application/json'
    },
    params: {
        api_key: '2f55ff53700f08b404f1f433c6b5e119',
        language: 'pt-BR'
    }
});

export default api