import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import proyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO} from '../../types'



const ProyectoState = props =>{
    const proyectos = [
        {id:1,nombre: 'Tienda Virtual'},
        {id:2,nombre: 'Intranet'},
        {id:3,nombre: 'Diseño de Sitio Web'},
        {id:4, nombre: 'MERN'}
    ]

    const initialState = {
        formulario: false,
        proyectos: [],
        errorformulario:false,
        proyecto:null
    }
    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProyectoReducer, initialState)
    //Serie de funciones para el CRUD
    const mostarFormulario = ()=>{
        dispatch({
            type:FORMULARIO_PROYECTO,
        })
    }
    //Obeneter los proyectos
    const obtenerProyectos = () =>{
        dispatch({
            type:OBTENER_PROYECTOS,
            payload:proyectos,
        })
    }
    //Agregar nuevvo Proyecto
    const agregarProyecto = proyecto =>{
        proyecto.id = uuidv4();
        //Insertar el proyecto
        dispatch({
            type:AGREGAR_PROYECTO,
            payload: proyecto,
        })
    }
    //Validar Fomulario
    const mostrarError = ()=>{
        dispatch({
            type:VALIDAR_FORMULARIO
        })
    }
    //Selecciona el Proyecto que el usuario dio click
    const proyectoActual = proyectoId =>{
        dispatch({
            type:PROYECTO_ACTUAL,
            payload:proyectoId
        })
    }
    //Eliminar proyecto
    const eliminarProyecto = proyectoId =>{
        dispatch({
            type:ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return(
     <proyectoContext.Provider value={{
         formulario:state.formulario,
         proyectos:state.proyectos,
         errorformulario:state.errorformulario,
         proyecto:state.proyecto,
         mostarFormulario,
         obtenerProyectos,
         agregarProyecto,
         mostrarError,
         proyectoActual,
         eliminarProyecto
     }}>
         {props.children}
     </proyectoContext.Provider>   
    )
}

export default ProyectoState;