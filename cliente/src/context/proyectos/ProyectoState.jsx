import React, { useReducer } from 'react';
import proyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR} from '../../types'

import clienteAxios from '../../config/axios'

const ProyectoState = props =>{

    const initialState = {
        formulario: false,
        proyectos: [],
        errorformulario:false,
        proyecto:null,
        mensaje: null
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
    const obtenerProyectos = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/proyectos')
            dispatch({
            type:OBTENER_PROYECTOS,
            payload:resultado.data.proyectos
        })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }   
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
           }
    }
    //Agregar nuevvo Proyecto
    const agregarProyecto = async proyecto =>{
        try {
            const resultado = await clienteAxios.post('/api/proyectos',proyecto);
            console.log(resultado);
            //Insertar el proyecto
            dispatch({
                type:AGREGAR_PROYECTO,
                payload: resultado.data,
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }   
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
           }
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
    const eliminarProyecto = async proyectoId =>{
        try {
            await clienteAxios.delete(`api/proyectos/${proyectoId}`)
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
         const alerta = {
             msg: 'Hubo un error',
             categoria: 'alerta-error'
         }   
         dispatch({
             type:PROYECTO_ERROR,
             payload:alerta
         })
        }
    }

    return(
     <proyectoContext.Provider value={{
         formulario:state.formulario,
         proyectos:state.proyectos,
         errorformulario:state.errorformulario,
         proyecto:state.proyecto,
         mensaje:state.mensaje,
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