import React, {useContext, useEffect} from 'react'
import { Barra } from '../layout/Barra'
import { Sidebar } from '../layout/Sidebar'
import { FormTarea } from '../tareas/FormTarea'
import { ListadoTarea } from '../tareas/ListadoTarea'
import AuthContext from '../../context/auth/authContext';


export const Proyectos = () => {
    //Extraer la información de autenticación
    const authContext = useContext(AuthContext)
    const {usuarioAutenticado}  = authContext;
    useEffect(()=>{
        usuarioAutenticado();
    },[])

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
