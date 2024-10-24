import axios from 'axios'

export const registerAxios = async (data) => {

    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, data, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    });
    return res


  };


