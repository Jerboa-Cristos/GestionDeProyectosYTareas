import axios from 'axios';
import rutaApi from '../api/rutaApi';

//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)

//FUNCIÓN PARA LISTAR LAS TAREAS DE UN DESARROLLADOR SOLO
export const mostrarMisTareas = (token) => axios.get(rutaApi() + '/indexTareasDesarrollador', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

//FUNCIÓN PARA MOSTRAR SOLO UNA TAREA DEL DESARROLLADOR
export const showMiTarea = (id, token) => axios.get(rutaApi() + '/showTareaDesarrollador/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

//FUNCIÓN PARA HACER UPDATE DE UNA TAREA DEL DESARROLLADOR
export const updateTarea = (id, data, token) => axios.put(rutaApi() + '/updateTareaDesarrollador/' + id, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})