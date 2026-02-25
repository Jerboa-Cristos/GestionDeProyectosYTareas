//Código
import { useNavigate } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { TareaContext } from '../../Context/TareaContext';
//Componentes visuales
import { ClipboardList, Calendar, AlertCircle } from 'lucide-react';
//Para instalar este modulo se debe hacer npm install recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart, Legend } from 'recharts';
import MenuTop from '../../Components/MenuTop';
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';

function DashboardDesarrollador() {
    const navigate = useNavigate();
    const {tareas} = useContext(TareaContext);

    //#region NAVIGACIÓN A OTRAS PÁGINAS
    function gotoTareas() {
        navigate('/MisTareasDesarrollador');
    }
    //#endregion

//#region FUNCIONES DEL DASHBOARD

    //#region TAREAS ASIGNADAS Y DEADLINE
    const tareasDeadline = tareas.filter(tarea=> {
        const fechaLimiteTarea = new Date(tarea.fecha_fin)
        const fechaActual = new Date()
        const diasRestantes = Math.abs((fechaLimiteTarea - fechaActual) / 86400000)
        return diasRestantes > 0 && diasRestantes <= 4
    }).length
    //#endregion

    //#region ULTIMOS CAMBIOS
    const UltCambios = tareas.filter(tarea => {
        const updatesTarea = new Date(tarea.updated_at)
        const fechaActual = new Date()
        const diasDeLosCambios = Math.abs((updatesTarea - fechaActual) / 86400000)
        return diasDeLosCambios <= 2
    })
    //#endregion

    //#region GRÁFICOS RESUMEN ESTADO
    const COLORS_BAR = ['#34A0A4', '#184E77', '#1A759F', '#168AAD']
    const grfResumenEstado = useMemo(() => {
        const arrEstados = {}

        tareas.forEach(tarea => {
            const estados = tarea.estado
            arrEstados[estados] = (arrEstados[estados] || 0) + 1
        })

        return Object.keys(arrEstados).map((key, i)=> ({
            estados: key,
            cantidad: arrEstados[key],
            fill: COLORS_BAR[i % COLORS_BAR.length]
        }))
    }, [tareas])

    //#endregion

    //#region GRÁFICOS TIPO TRABAJO
    const grfTipoTrabajo = useMemo(() => {
        const arrtipo = {}

        tareas.forEach(tarea => {
            const tipo = tarea.tipo
            arrtipo[tipo] = (arrtipo[tipo] || 0) + 1
        })

        return Object.keys(arrtipo).map((key, i)=> ({
            tipo: key,
            cantidad: arrtipo[key],
            fill: COLORS_BAR[i % COLORS_BAR.length]
        }))
    }, [tareas])
    //#endregion

//#endregion


    return(
        <div className="min-h-screen bg-blueDark p-2 md:p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/desarrollador_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 md:pb-0">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-4 md:p-8 overflow-y-auto flex flex-col gap-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-2 md:mb-6 text-center md:text-left">Dashboard</h1>

                    {/* Grid Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                        {/* Tarjetas de Tareas */}
                        <div className="grid grid-cols-1 gap-4">
                            {/* Tareas Asignadas */}
                            <button 
                            onClick={gotoTareas} 
                            className="bg-blueDashboard rounded-xl p-4 md:p-6 flex items-center justify-between text-white hover:shadow-lg hover:bg-blueblue transition-all group" 
                            >
                                <div className="flex items-center gap-3 md:gap-4">
                                    <ClipboardList size={50} md:size={12} className="transition-transform group-hover:scale-110" />
                                    <span className="text-lg md:text-xl font-semibold leading-tight text-left">Tareas Asignadas</span>
                                </div>
                                <span className="text-3xl md:text-4xl font-bold">{tareas.length}</span>
                            </button>

                            {/* Tareas Deadline */}
                            <button onClick={gotoTareas} 
                           className="bg-warning rounded-xl p-4 md:p-6 flex items-center justify-between text-white relative hover:shadow-lg hover:bg-warningDark transition-all group">
                            <div className="flex items-center gap-3 md:gap-4">
                                <Calendar size={12} md:size={16} className="w-12 h-12 md:w-16 md:h-16"/>
                                <span className="text-lg md:text-xl font-semibold leading-tight text-left">Tareas Asignadas Deadline</span>
                            </div>
                            <span className="text-3xl md:text-4xl font-bold md:mr-4">{tareasDeadline}</span>
                            <AlertCircle className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-warningDark bg-white rounded-full p-1" size={24} />
                            </button>
                        </div>

                        {/* Tipo de Trabajo MONTARLO TODO */}
                        <div className="bg-blueBase rounded-xl p-4 md:p-6 flex flex-col items-center">
                            <h3 className="text-center text-lg md:text-xl font-semibold text-blueDark mb-4">Tipo de trabajo</h3>
                            <div className="w-full h-64 max-w-xs md:max-w-none">
                                <ResponsiveContainer width="100%" height="100%" margin={{ left: 40, right: 20 }}>
                                    <BarChart data={grfTipoTrabajo} layout='vertical'>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                        <XAxis type="number" hide /> 
                                        <YAxis 
                                            dataKey="tipo" 
                                            type="category" 
                                            tick={{fontSize: 12, fontWeight: 'bold', fill:'#0B4068'}}
                                            width={100}
                                        />
                                        <Bar dataKey='cantidad' radius={[0, 5, 5, 0]} barSize={20}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Últimos Cambios */}
                        <div className="bg-blueBase rounded-xl p-4 md:p-6 shadow-sm">
                            <h3 className="text-center text-lg md:text-xl font-semibold text-blueDark mb-6">Últimos Cambios</h3>
                            <div className="space-y-3">
                            {UltCambios.slice(0, 3).map((tarea) => (
                                <div key={tarea.id} className="bg-turquesa rounded-lg p-3 text-white">
                                {/*Aquí debe estar la imagen del usuario*/}
                                    <div className="grid grid-cols-3 md:grid-cols-4 w-full text-center gap-2 text-xs md:text-sm font-medium">
                                        <span className="font-bold md:font-normal">{tarea.desarrollador.nombre}</span>
                                        <span className="truncate">{tarea.nombre}</span>
                                        <span className="rounded px-1">{tarea.estado}</span>
                                        <span className="hidden md:block italic">{tarea.sprint.nombre}</span>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Resumen del Estado (Gráfico Circular) */}
                        <div className="bg-blueBase rounded-xl p-4 md:p-6 shadow-sm flex flex-col items-center">
                            <h3 className="text-lg md:text-xl font-semibold text-blueDark mb-6">Resumen del Estado</h3>
                            <div className="w-full h-64 max-w-xs">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie 
                                        data={grfResumenEstado} 
                                        dataKey='cantidad'
                                        nameKey='estados'
                                        cx="50%"
                                        cy="45%"
                                        outerRadius={80}
                                        stroke="none"
                                        />
                                        <Tooltip />
                                        <Legend 
                                            verticalAlign="bottom" 
                                            iconType="circle"
                                            formatter={(value) => <span className="text-sm font-semibold">{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>    
            </main>
            </div>
        </div>    
    )
}

export default DashboardDesarrollador