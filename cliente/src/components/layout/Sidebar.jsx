import React from 'react'
import { Listado } from '../proyectos/Listado'
import { NuevoProyectos } from '../proyectos/NuevoProyectos'

export const Sidebar = () => {
    return (
        <aside>
            <h1>MERN <span>Task</span></h1>
            <NuevoProyectos/>
            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <Listado/>
            </div>
        </aside>
    )
}
