import axios from 'axios';
import rutaApi from '../api/rutaApi';

//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
//FUNCIONES PARA MOSTRAR A LOS DESARROLLADORES Y PRODUCT OWNERS
export const mostrarUsuarios = (data) => axios.get(rutaApi() + '/indexUsuarios', data)

//Funciones para mostrar el perfil de los usuarios
export const mostrarPerfilDesarrollador = (id) => axios.get(rutaApi() + '/show_Admin_Desarrollador/' + id)
export const mostrarPerfilProductOwner = (id) => axios.get(rutaApi() + '/show_Admin_ProductOwner/' + id)

//FUNCIONES PARA ELIMINAR A LOS USUARIOS
export const eliminarUsuario = (id, rol) => axios.delete(rutaApi() + '/eliminarUsuarios/' + id, { data: { rol: rol } })