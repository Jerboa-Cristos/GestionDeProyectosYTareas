import axios from 'axios';
import rutaApi from '../api/rutaApi';

export const funcion_listado_tarea = (id_sprint, token) => axios.get(rutaApi() + `/listado_tarea/${id_sprint}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_crear_tarea = (data, id_sprint, token) => axios.post(rutaApi() + `/crear_tarea/${id_sprint}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_mostrar_tarea = (id_sprint, id_tarea , token) => axios.get(rutaApi() + `/mostrar_tarea/${id_sprint}/${id_tarea}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_actualizar_tarea = (id_sprint , id_tarea,  data, token) => axios.put(rutaApi() + `/actualizar_tarea/${id_sprint}/${id_tarea}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const funcion_eliminar_tarea = (id_sprint, id_tarea, token) => axios.delete(rutaApi() + `/eliminar_tarea/${id_sprint}/${id_tarea}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})


//para mostrar todas las tareas de todos los proyectos
export const funcion_listado_tareas_product_owner = (token) => axios.get(rutaApi() + `/tareas_product_owner`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})