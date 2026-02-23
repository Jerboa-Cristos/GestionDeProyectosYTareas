import axios from 'axios';
const APP_URL = "http://localhost/api";

// Funciones para interactuar con la API de autenticación
//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
//Administrador
export const funcion_administrador_register = (data, token) => axios.post(APP_URL + '/register_administrador', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const funcion_administrador_login = (data) => axios.post(APP_URL + '/login_administrador', data)
export const funcion_administrador_profile = (data, token) => axios.get(APP_URL + '/profile_administrador', data, {
    headers: { Authorization: `Bearer ${token}`}
})


//Product Owner
export const funcion_product_owner_login = (data) => axios.post(APP_URL + '/login_product_owner', data)
export const funcion_product_owner_profile = (token) => axios.get(APP_URL + '/profile_product_owner', {
    headers: { Authorization: `Bearer ${token}`}
})


//Desarrollador
export const funcion_desarrollador_login = (data) => axios.post(APP_URL + '/login_desarrollador', data)
export const funcion_desarrollador_profile = (data, token) => axios.post(APP_URL + '/profile_desarrollador', data, {
    headers: { Authorization: `Bearer ${token}`}
})














