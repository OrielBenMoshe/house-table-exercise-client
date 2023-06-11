import axios from 'axios';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default axios.create({
    baseURL: baseUrl,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});
