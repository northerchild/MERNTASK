import React from 'react'
import { Barra } from '../layout/Barra'
import { Sidebar } from '../layout/Sidebar'
import { FormTarea } from '../tareas/FormTarea'
import { ListadoTarea } from '../tareas/ListadoTarea'


export const Proyectos = () => {
    return (
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        <ListadoTarea/>
                    </div>
                </main>
            </div>
        </div>
    )
}
