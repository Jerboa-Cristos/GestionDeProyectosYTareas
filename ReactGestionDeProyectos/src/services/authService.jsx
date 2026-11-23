import axios from 'axios';
import rutaApi from '../api/rutaApi';

// Funciones para interactuar con la API de autenticación
//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
//Administrador
export const administradorRegister = (data, token) => axios.post(rutaApi()+ '/registerAdministrador', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const administradorLogin = (data) => axios.post(rutaApi() + '/loginAdministrador', data)
export const administradorProfile = (data, token) => axios.post(rutaApi() + '/profileAdministrador', data, {
    headers: { Authorization: `Bearer ${token}`}
})


//Product Owner
export const productOwnerLogin = (data) => axios.post(rutaApi() + '/loginProductOwner', data)
export const actualizarProductOwnerProfile = (data, token) => axios.post(rutaApi() + '/profileProductOwner', data, {
    headers: { Authorization: `Bearer ${token}`}
})

export const obtenerDatosProductOwnerProfile = (token) => axios.get(rutaApi() + '/profileProductOwner',{
    headers: {Authorization: `Bearer ${token}`}
})


//Desarrollador
export const desarrolladorLogin = (data) => axios.post(rutaApi() + '/loginDesarrollador', data)
export const desarrolladorProfile = (data, token) => axios.post(rutaApi() + '/profileDesarrollador', data, {
    headers: { Authorization: `Bearer ${token}`}
})














