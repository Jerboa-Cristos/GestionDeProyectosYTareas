import axios from 'axios';
import rutaApi from '../api/rutaApi';

export const listadoTarea = (id_sprint, token) => axios.get(rutaApi() + `/listadoTarea/${id_sprint}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const crearTarea = (data, id_sprint, token) => axios.post(rutaApi() + `/crearTarea/${id_sprint}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const mostrarTarea = (id_sprint, id_tarea , token) => axios.get(rutaApi() + `/mostrarTarea/${id_sprint}/${id_tarea}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const actualizarTarea = (id_sprint , id_tarea,  data, token) => axios.put(rutaApi() + `/actualizarTarea/${id_sprint}/${id_tarea}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const eliminarTarea = (id_sprint, id_tarea, token) => axios.delete(rutaApi() + `/eliminarTarea/${id_sprint}/${id_tarea}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const indexDesarrolladores = (token) => axios.get(rutaApi() + `/indexDesarrolladores`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})


//para mostrar todas las tareas de todos los proyectos
export const listadoTareasProductOwner = (token) => axios.get(rutaApi() + `/tareasProductOwner`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})