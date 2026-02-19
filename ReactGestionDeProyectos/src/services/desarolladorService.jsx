import axios from 'axios';
import rutaApi from '../api/rutaApi';

//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)

//FUNCIÓN PARA LISTAR LAS TAREAS DE UN DESARROLLADOR SOLO
export const mostrarMisTareas = (data) => axios.get(rutaApi() + '/indexUsuarios', data)
//FUNCIÓN PARA MOSTRAR SOLO UNA TAREA DEL DESARROLLADOR
export const showMiTarea = (data) => axios.get(rutaApi() + '/indexUsuarios', data)
//FUNCIÓN PARA HACER UPDATE DE UNA TAREA DEL DESARROLLADOR
export const updateTarea = (data) => axios.get(rutaApi() + '/indexUsuarios', data)