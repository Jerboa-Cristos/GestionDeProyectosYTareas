import axios from 'axios';
import rutaApi from '../api/rutaApi';
import { data } from 'react-router-dom';

//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)

//FUNCIÓN PARA MOSTRAR A LOS DESARROLLADORES, PRODUCT OWNERS Y ADMINISTRADORES EN UN LISTADO
export const mostrarUsuarios = (token) => axios.get(rutaApi() + '/indexUsuarios', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

//FUNCIÓN PARA GUARDAR A LOS NUEVOS USUARIOS
export const guardarUsuarios = (data, token) => axios.post(rutaApi() +'/storeUsuarios', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

//FUNCIÓN PARA MOSTRAR A UN USUARIO ESPECIFICO
export const showUsuarios = (id, rol, token) => axios.get(rutaApi() + '/showUsuarios/' + rol + '/' +  id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

//FUNCIÓN PARA HACER UPDATE DE UN USUARIO
export const updateUsuarios = (data, rol, id ,token) => axios.put(rutaApi() + '/updateUsuarios/' + rol + '/' + id , data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

//FUNCIÓN PARA ELIMINAR A LOS USUARIOS
export const eliminarUsuario = (id, rol, token) => axios.delete(rutaApi() + '/eliminarUsuarios/' + rol + '/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const mostrarProyectos = (token) => axios.get(rutaApi() + '/indexProyectosAdmin', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})