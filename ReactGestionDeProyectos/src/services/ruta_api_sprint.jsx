import axios from 'axios';
import rutaApi from '../api/rutaApi';

export const listadoSprint = (id_proyecto, token) => axios.get(rutaApi() + `/listadoSprint/${id_proyecto}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const crearSprint = (data, id_proyecto, token) => axios.post(rutaApi() + `/crearSprint/${id_proyecto}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const mostrarSprint = (id_proyecto, id_sprint, token) => axios.get(rutaApi() + `/mostrarSprint/${id_proyecto}/${id_sprint}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const actualizarSprint = (id_proyecto, id_sprint, data, token) => axios.put(rutaApi() + `/actualizarSprint/${id_proyecto}/${id_sprint}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const eliminarSprint = (id_proyecto, id_sprint, token) => axios.delete(rutaApi() + `/eliminarSprint/${id_proyecto}/${id_sprint}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})