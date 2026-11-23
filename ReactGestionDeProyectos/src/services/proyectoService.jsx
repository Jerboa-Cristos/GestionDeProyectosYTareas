import axios from 'axios';
import rutaApi from '../api/rutaApi';

// Funciones para Crear el proyecto
//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
export const listadoProyecto = (token) => axios.get(rutaApi()+ '/listadoProyectos', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const crearProyecto = (data, token) => axios.post(rutaApi() + '/crearProyecto', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const mostrarProyecto = (id, token) => axios.get(rutaApi() + `/mostrarProyecto/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const actualizarProyecto = (id, data, token) => axios.put(rutaApi() + `/actualizarProyecto/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const elimimarProyecto = (id, token) => axios.delete(rutaApi() + `/eliminarProyecto/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})