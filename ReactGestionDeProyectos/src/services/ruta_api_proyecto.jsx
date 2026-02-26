import axios from 'axios';
import rutaApi from '../api/rutaApi';

// Funciones para Crear el proyecto
//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
export const funcion_listado_proyecto = (token) => axios.get(rutaApi()+ '/listado_proyectos', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const funcion_crear_proyecto = (data, token) => axios.post(rutaApi() + '/crear_proyecto', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_mostrar_proyecto = (id, token) => axios.get(rutaApi() + `/mostrar_proyecto/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const funcion_actualizar_proyecto = (id, data, token) => axios.put(rutaApi() + `/actualizar_proyecto/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const funcion_elimimar_proyecto = (id, token) => axios.delete(rutaApi() + `/eliminar_proyecto/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})