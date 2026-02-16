import axios from 'axios';
import rutaApi from '../api/rutaApi';

//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)

//FUNCIÓN PARA MOSTRAR A LOS DESARROLLADORES, PRODUCT OWNERS Y ADMINISTRADORES EN UN LISTADO
export const mostrarUsuarios = (data) => axios.get(rutaApi() + '/indexUsuarios', data)

//FUNCIÓN PARA GUARDAR A LOS NUEVOS USUARIOS
export const guardarUsuarios = (data) => axios.post(rutaApi() +'/storeUsuarios', data)

//FUNCIÓN PARA MOSTRAR A UN USUARIO ESPECIFICO
export const showUsuarios = (id, rol) => axios.get(rutaApi() + '/showUsuarios/' + rol + '/' +  id)

//FUNCIÓN PARA HACER UPDATE DE UN USUARIO
export const updateUsuarios = (data, rol, id) => axios.put(rutaApi() + '/updateUsuarios/' + rol + '/' + id , data)

//FUNCIÓN PARA ELIMINAR A LOS USUARIOS
export const eliminarUsuario = (id, rol) => axios.delete(rutaApi() + '/eliminarUsuarios/' + rol + '/' + id)