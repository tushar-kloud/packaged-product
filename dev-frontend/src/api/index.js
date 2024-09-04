import axios from 'axios';
const API = axios.create({
    // baseURL: import.meta.env.VITE_API_URL
    baseURL : 'https://genailabs-singlepack-haghejgxf2hwffgk.centralindia-01.azurewebsites.net'
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