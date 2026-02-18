import axios from 'axios';
const APP_URL = "http://localhost/api";

// Funciones para Crear el proyecto
//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
export const funcion_crear_proyecto = (data) => axios.post(APP_URL + '/crear_proyecto', data)
export const listado_proyecto = () => axios.get(APP_URL + '/listado_proyectos')