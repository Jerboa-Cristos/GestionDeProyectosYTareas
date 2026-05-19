import { createContext, useState, useEffect } from 'react';
import { mostrarMisTareas } from '../services/desarolladorService'
import { useLocation } from 'react-router-dom';

export const TareaContext = createContext();

export const TareaProvider = ({children}) => {
    const [tareas, setTareas] = useState([])
    const token = localStorage.getItem('token');
    const location = useLocation();
    const [loading, setLoading] = useState(true);


        useEffect(() => {
            if(!token) return;

            const rutasPermitidas = ["/DashboardDesarrollador", "/TableroKanbanDesarrollador", "/MisTareasDesarrollador"]
            const rutaDesarrollador = rutasPermitidas.some( ruta => 
                location.pathname.startsWith(ruta)
            )
            if(rutaDesarrollador) {
                setLoading(true);
                mostrarMisTareas(token).then(res=> {
                    setTareas(res.data);
                    console.log(res.data)
                }).catch(err=>{
                    console.error('Error al cargar las tareas:', err)
                }).finally(()=>{
                    setLoading(false);
                })
            }
        }, [location.pathname])

return (
    <TareaContext.Provider value={{tareas, setTareas, loading}}>
        {children}
    </TareaContext.Provider>
)}