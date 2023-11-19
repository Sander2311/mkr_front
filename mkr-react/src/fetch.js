import axiosInstance from "./axios.js";

export const fetchRegister = async (params) => {
    try {
        const { data } = await axiosInstance.post('/auth/register', params);
    return data;
    } catch (err) {
        console.error(err)
        return null;
    }
    
};

export const fetchLogin = async (params) => {
    try {
        const { data } = await axiosInstance.post('/auth/login', params);
    return data;
    } catch (err) {
        console.error(err)
        return null;
    }
    
};

export const fetchAuthMe = async () => {
    try {
        const { data } = await axiosInstance.get('/users/me');
    return data;
    } catch (err) {
        console.error(err)
        return null;
    }  
};

export const fetchTeachers = async () => {
    try {
        const { data } = await axiosInstance.get('/users/teachers');
    return data;
    } catch (err) {
        console.error(err)
        return null;
    }  
};

export const fetchCreateCourse = async (params) => {
    try {
        const { data } = await axiosInstance.post('/courses/', params);
    return data;
    } catch (err) {
        console.error(err)
        return null;
    }
    
};