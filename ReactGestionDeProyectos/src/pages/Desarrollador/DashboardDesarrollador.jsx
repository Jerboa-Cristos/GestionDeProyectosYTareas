import React from 'react';
import { ClipboardList, Calendar, AlertCircle } from 'lucide-react';

import MenuTop from '../../Components/MenuTop';
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';

function DashboardDesarrollador() {
    return(
        <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blueDark mb-6">Dashboard</h1>

                    {/* Grid Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                        {/* Tarjetas de Tareas */}
                        <div className="grid grid-cols-1 gap-4">
                            {/* Tareas Asignadas */}
                            <div className="bg-blueblue rounded-xl p-6 flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                                <ClipboardList size={80} />
                                <span className="text-xl font-semibold leading-tight">Tareas Asignadas</span>
                            </div>
                            <span className="text-4xl font-bold">Tareas asignadas</span>
                            </div>

                            {/* Tareas Deadline */}
                            <div className="bg-warning rounded-xl p-6 flex items-center justify-between text-white relative">
                            <div className="flex items-center gap-4">
                                <Calendar size={60} />
                                <span className="text-xl font-semibold leading-tight">Tareas Asignadas Deadline</span>
                            </div>
                            <span className="text-4xl font-bold mr-4">Deadline</span>
                            <AlertCircle className="absolute bottom-4 right-4 text-warningDark bg-white rounded-full" size={30} />
                            </div>
                        </div>

                        {/* Tipo de Trabajo MONTARLO TODO */}
                        <div className="bg-blueBase rounded-xl p-6">
                            <h3 className="text-center text-xl font-semibold text-blueDark mb-4">Tipo de trabajo</h3>
                            <div className="space-y-1">
                            {[
                                { label: 'Desarrollo Frontend', width: '90%' },
                                { label: 'Desarrollo Backend', width: '85%' },
                                { label: 'Diseño UI/UX', width: '15%' },
                                { label: 'Calidad', width: '20%' },
                                { label: 'Gestión proyecto', width: '5%' },
                            ].map((item) => (
                                <div key={item.label}>
                                <p className="text-sm text-blueDark mb-1">{item.label}</p>
                                    <div className="w-full bg-transparent border-l-2 h-6">
                                        <div className="bg-blueblue h-full" style={{ width: item.width }}></div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Últimos Cambios */}
                        <div className="bg-blueBase rounded-xl p-6 shadow-sm">
                            <h3 className="text-center text-xl font-semibold text-blueDark mb-6">Últimos Cambios</h3>
                            <div className="space-y-3">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="bg-turquesa rounded-lg p-3 flex items-center gap-4 text-white text-sm">
                                {/*Aquí debe estar la imagen del usuario*/}
                                    <div className="grid grid-cols-3 w-full text-center">
                                        {/*Modificarlo para que salga la última información en el proyecto donde se participa*/}
                                        <span>Nombre</span>
                                        <span>Tarea</span>
                                        <span>Proyecto</span>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Resumen del Estado (Gráfico Circular) */}
                        <div className="bg-blueBase rounded-xl p-6 shadow-sm flex flex-col items-center">
                            <h3 className="text-xl font-semibold text-blueDark mb-6">Resumen del Estado</h3>
                            <div className="relative w-48 h-48">
                            {/* Representación visual simple del gráfico de pay */}
                                <svg viewBox="0 0 32 32" className="w-full h-full rotate-[-90deg]">
                                    <circle r="16" cx="16" cy="16" fill="#184E77" />
                                </svg>
                            </div>

                            {/* Leyenda */}
                            <div className="flex gap-4 mt-8 text-xs font-semibold text-blueDark">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blueblue rounded-full"></div> Tareas Completadas
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#0f6a85] rounded-full"></div> Tareas sin completar
                                </div>
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