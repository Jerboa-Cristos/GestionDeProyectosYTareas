import { createContext, useState, useEffect } from 'react';
import { mostrarMisTareas } from '../services/desarolladorService'

export const TareaContext = createContext();

export const TareaProvider = ({children}) => {
    const [tareas, setTareas] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    if(token) {
        useEffect(() => {
            const fetchTarea = async () => {
            mostrarMisTareas(token).then(res=> {
                setTareas(res.data);
            }).catch(err=>{
                console.error('Error al cargar las tareas:', err)
            });
        }
        fetchTarea();
        }, [])
    }

return (
    <TareaContext.Provider value={{tareas, setTareas}}>
        {children}
    </TareaContext.Provider>
)}