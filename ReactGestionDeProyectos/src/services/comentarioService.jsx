import axios from 'axios';
import rutaApi from '../api/rutaApi';

//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)

//FUNCIÓN PARA LISTAR COMENTARIOS
export const mostrarComentarios = (data) => axios.get(rutaApi() + '/indexComentario', data)
//FUNCIÓN PARA MOSTRAR COMENTARIO
export const showComentario = (id) => axios.get(rutaApi() + '/showComentario/' + id)
//FUNCIÓN PARA ELIMINAR COMENTARIO
export const eliminarComentario = (id) => axios.get(rutaApi() + '/eliminarComentario/' + id)
//FUNCIÓN PARA GUARDAR COMENTARIO
export const guardarComentario = (data) => axios.get(rutaApi() + '/guardarComentario', data)
//FUNCIÓN PARA HACER UPDATE DEL COMENTARIO
export const updateComentario = (id, data) => axios.get(rutaApi() + '/updateComentario/' + id, data)