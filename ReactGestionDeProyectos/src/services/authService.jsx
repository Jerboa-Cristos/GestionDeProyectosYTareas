import axios from 'axios';
const APP_URL = "http://localhost/api";


export const register = (data) => axios.post(APP_URL + '/register', data)
export const login = (data) => axios.post(APP_URL + '/login', data)
export const profile = (data, token) => axios.post(APP_URL + '/profile', data, { 
    headers: { Authorization: `Bearer ${token}` } 
})

