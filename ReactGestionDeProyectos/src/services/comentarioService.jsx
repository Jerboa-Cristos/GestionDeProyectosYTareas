import axios from 'axios';
import rutaApi from '../api/rutaApi';

//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)

//FUNCIÓN PARA LISTAR COMENTARIOS
export const mostrarComentarios = (id, token) => axios.get(rutaApi() + '/indexComentario/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
//FUNCIÓN PARA ELIMINAR COMENTARIO
export const eliminarComentario = (id, token) => axios.delete(rutaApi() + '/eliminarComentario/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
//FUNCIÓN PARA GUARDAR COMENTARIO
export const guardarComentario = (data, token) => axios.post(rutaApi() + '/guardarComentario', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
//FUNCIÓN PARA HACER UPDATE DEL COMENTARIO
export const updateComentario = (id, data, token) => axios.put(rutaApi() + '/updateComentario/' + id, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})