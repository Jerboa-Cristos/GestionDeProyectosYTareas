import axios from 'axios';
import rutaApi from '../api/rutaApi';

//export const funcion = (data) => axios.post(APP_URL + '/ruta_del_backend', data)
//FUNCIONES PARA MOSTRAR A LOS DESARROLLADORES Y PRODUCT OWNERS
export const mostrarUsuarios = (data) => axios.get(rutaApi() + '/indexUsuarios', data)


//Funciones para mostrar el perfil de los usuarios
export const mostrarPerfilDesarrollador = (id) => axios.get(rutaApi() + '/show_Admin_Desarrollador/' + id)
export const mostrarPerfilProductOwner = (id) => axios.get(rutaApi() + '/show_Admin_ProductOwner/' + id)

//FUNCIONES PARA ELIMINAR A LOS USUARIOS
export const eliminarDesarrollador = (id) => axios.delete(rutaApi() + '/delete_Admin_Desarrolladors/' + id)
export const eliminarProductOwner = (id) => axios.delete(rutaApi() + '/delete_Admin_ProductOwner/' + id)