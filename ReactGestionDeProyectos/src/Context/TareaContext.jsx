import { createContext, useState, useEffect } from 'react';
import { mostrarMisTareas } from '../services/desarolladorService'

export const TareaContext = createContext();

export const TareaProvider = ({children}) => {
    const [tareas, setTareas] = useState([])

useEffect(() => {
    const fetchTarea = async () => {
        const user = JSON.parse(localStorage.getItem('user')) //después en el mostrarMisTareas se debe poner el user.id
        mostrarMisTareas(1).then(res=> {
            setTareas(res.data);
        }).catch(err=>{
            console.error('Error al cargar las tareas:', err)
        });
    }
    fetchTarea();
}, [])

return (
    <TareaContext.Provider value={{tareas, setTareas}}>
        {children}
    </TareaContext.Provider>
)}