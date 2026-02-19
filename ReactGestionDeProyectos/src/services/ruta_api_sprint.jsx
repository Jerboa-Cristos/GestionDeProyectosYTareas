import axios from 'axios';
const APP_URL = "http://localhost/api"

export const funcion_listado_sprint = (token) => axios.get(APP_URL + '/listado_sprints', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_crear_sprint = (data, id_proyecto, token) => axios.post(APP_URL + `/crear_sprint/${id_proyecto}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_mostrar_sprint = (id,token) => axios.get(APP_URL + `/mostrar_sprint/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_actualizar_sprint = (id, data, token) => axios.put(APP_URL + `/actualizar_sprint/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_eliminar_sprint = (id, token) => axios.delete(APP_URL + `/eliminar_sprint/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})