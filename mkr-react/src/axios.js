import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3333'
});


export default instance;

// instance.interceptors.request.use((config) => {
//     config.headers.Authorization = window.localStorage.getItem('token');
//     return config;
// });
