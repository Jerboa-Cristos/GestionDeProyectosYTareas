import axios from 'axios';
import rutaApi from '../api/rutaApi';

export const funcion_listado_sprint = (id_proyecto, token) => axios.get(rutaApi() + `/listado_sprint/${id_proyecto}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_crear_sprint = (data, id_proyecto, token) => axios.post(rutaApi() + `/crear_sprint/${id_proyecto}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_mostrar_sprint = (id_proyecto, id_sprint, token) => axios.get(rutaApi() + `/mostrar_sprint/${id_proyecto}/${id_sprint}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_actualizar_sprint = (id_proyecto, id_sprint, data, token) => axios.put(rutaApi() + `/actualizar_sprint/${id_proyecto}/${id_sprint}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_eliminar_sprint = (id_proyecto, id_sprint, token) => axios.delete(rutaApi() + `/eliminar_sprint/${id_proyecto}/${id_sprint}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})