import axios from 'axios';
import rutaApi from '../api/rutaApi';

//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)

//FUNCIÓN PARA LISTAR LAS TAREAS DE UN DESARROLLADOR SOLO
export const mostrarMisTareas = (data, id) => axios.get(rutaApi() + '/indexTareasEspecificas', data, id)
//FUNCIÓN PARA MOSTRAR SOLO UNA TAREA DEL DESARROLLADOR
export const showMiTarea = (id, data) => axios.get(rutaApi() + '/showTarea/' + id, data)
//FUNCIÓN PARA HACER UPDATE DE UNA TAREA DEL DESARROLLADOR
export const updateTarea = (id, data) => axios.put(rutaApi() + '/updateTarea/' + id, data)