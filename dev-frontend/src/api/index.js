import axios from 'axios';
const API = axios.create({
    // baseURL: import.meta.env.VITE_API_URL
    baseURL : 'http://20.197.53.225:8080'
});

// Function to attach the Authorization header with the access token
API.interceptors.request.use((req) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); 
    if (userInfo && userInfo.accessToken) {
        req.headers.Authorization = `Bearer ${userInfo.accessToken}`;
    }
    return req;
});

export const fetchLabList = () => API.get('/api/training/labs');
export const fetchLabDetails = (labId) => API.get(`/api/training/labs/${labId}`);