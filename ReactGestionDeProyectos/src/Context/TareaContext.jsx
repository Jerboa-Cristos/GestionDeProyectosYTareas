import { createContext, useState, useEffect } from 'react';
import { mostrarMisTareas } from '../services/desarolladorService'
import { useLocation } from 'react-router-dom';

export const TareaContext = createContext();

export const TareaProvider = ({children}) => {
    const [tareas, setTareas] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token
    const location = useLocation();

    if(token) {
        useEffect(() => {
            const rutasPermitidas = ["/DashboardDesarrollador", "/TableroKanbanDesarrollador", "/MisTareasDesarrollador"]
            const rutaDesarrollador = rutasPermitidas.some( ruta => 
                location.pathname.startsWith(ruta)
            )
            if(rutaDesarrollador) {
                mostrarMisTareas(token).then(res=> {
                    setTareas(res.data);
                }).catch(err=>{
                    console.error('Error al cargar las tareas:', err)
                });
            }
        }, [location.pathname])
    }

return (
    <TareaContext.Provider value={{tareas, setTareas}}>
        {children}
    </TareaContext.Provider>
)}