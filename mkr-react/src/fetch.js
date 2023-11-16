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