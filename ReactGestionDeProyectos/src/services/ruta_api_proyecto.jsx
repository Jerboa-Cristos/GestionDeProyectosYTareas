import axios from 'axios';
const APP_URL = "http://localhost/api";

// Funciones para Crear el proyecto
//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
export const crear_proyecto = (data) => axios.post(APP_URL + '/proyecto', data)
export const listado_proyecto = () => axios.get(APP_URL + '/listado_proyectos')