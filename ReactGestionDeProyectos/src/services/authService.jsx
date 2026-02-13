import axios from 'axios';
const APP_URL = "http://localhost/api";

// Funciones para interactuar con la API de autenticación
//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
export const register = (data) => axios.post(APP_URL + '/register', data)
export const register_product_owner = (data) => axios.post(APP_URL + '/register_product_owner', data)

export const login = (data) => axios.post(APP_URL + '/login', data)

export const profile = (data, token) => axios.post(APP_URL + '/profile', data, { 
    headers: { Authorization: `Bearer ${token}` } 
})

// Funciones para Crear el proyecto
//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
export const crear_proyecto = (data) => axios.post(APP_URL + '/proyecto', data)


