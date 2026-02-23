import axios from 'axios';
import rutaApi from '../api/rutaApi';

//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)

//FUNCIÓN PARA LISTAR COMENTARIOS
export const mostrarComentarios = (data, token) => axios.get(rutaApi() + '/indexComentario', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
//FUNCIÓN PARA MOSTRAR COMENTARIO
export const showComentario = (id, token) => axios.get(rutaApi() + '/showComentario/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
//FUNCIÓN PARA ELIMINAR COMENTARIO
export const eliminarComentario = (id, token) => axios.get(rutaApi() + '/eliminarComentario/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
//FUNCIÓN PARA GUARDAR COMENTARIO
export const guardarComentario = (data, token) => axios.get(rutaApi() + '/guardarComentario', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
//FUNCIÓN PARA HACER UPDATE DEL COMENTARIO
export const updateComentario = (id, data, token) => axios.get(rutaApi() + '/updateComentario/' + id, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})