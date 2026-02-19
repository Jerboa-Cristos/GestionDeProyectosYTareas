import axios from 'axios';
const APP_URL = "http://localhost/api"

// Funciones para Crear el proyecto
//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
export const funcion_listado_proyecto = (token) => axios.get(APP_URL + '/listado_proyectos', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const funcion_crear_proyecto = (data, token) => axios.post(APP_URL + '/crear_proyecto', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_mostrar_proyecto = (id, token) => axios.get(APP_URL + `/mostrar_proyecto/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const funcion_actualizar_proyecto = (id, data, token) => axios.put(APP_URL + `/actualizar_proyecto/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const funcion_elimimar_proyecto = (id, token) => axios.delete(APP_URL + `/eliminar_proyecto/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})