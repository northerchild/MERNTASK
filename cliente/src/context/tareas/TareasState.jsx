import React, { useReducer } from 'react';
import TareaContext from './TareasContext';
import TareaReducer from './TareasReducer';
import {TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        ESTADO_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA} from '../../types';

import { v4 as uuidv4 } from 'uuid';

const TareasState = props =>{
    const initialState = {
        tareas:[
            {id:1,nombre:'Elegir Plataforma',estado:true, proyectoId:1},
            {id:2,nombre:'Elegir Colores',estado:false, proyectoId:2},
            {id:3,nombre:'Elegir Plataforma de pago',estado:false, proyectoId:3},
            {id:4,nombre:'Elegir hosting',estado:true, proyectoId:4},
            {id:5,nombre:'Elegir Plataforma',estado:true, proyectoId:2},
            {id:6,nombre:'Elegir Colores',estado:false, proyectoId:3},
            {id:7,nombre:'Elegir Plataforma de pago',estado:false, proyectoId:1},
            {id:8,nombre:'Elegir hosting',estado:true, proyectoId:4},
            {id:9,nombre:'Elegir Plataforma',estado:true, proyectoId:4},
            {id:10,nombre:'Elegir Colores',estado:false, proyectoId:3},
            {id:11,nombre:'Elegir Plataforma de pago',estado:false, proyectoId:2},
            {id:12,nombre:'Elegir hosting',estado:true, proyectoId:1},
        ],
        tareasproyecto:null,
        errortarea:false,
        tareaseleccionada:null,
    }
    //crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState)
    //Crear las funciones

    //Obtener las tareas de un proyecto 
    const obtenerTareas = proyectoId =>{
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId,
            obtenerTareas
        })
    }
    //Agregar una tarea a un proyecto seleccionado
    const agregarTarea = tarea =>{
        tarea.id = uuidv4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    //Validar y mostrar error
    const validarTarea = ()=>{
        dispatch({
            type:VALIDAR_TAREA
        })
    }
    //Eliminar tarea por id
    const eliminarTarea = id =>{
        dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
    }
    //Cambiar el estado de cada tarea
    const cambiarEstadoTarea = tarea =>{
        dispatch({
            type:ESTADO_TAREA,
            payload: tarea
        })
    }
    //Extrae una tarea para edición
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    
    // Editar o midificar una tarea
    const actualizarTarea = tarea =>{
        dispatch({
            type:ACTUALIZAR_TAREA,
            payload:tarea
        })
    }
    //Elimina la tarea Seleccionada
    const limpiarTarea = ()=>{
        dispatch({
            type:LIMPIAR_TAREA
        })
    }
    return(
        <TareaContext.Provider value={{
            tareas: state.tareas,
            tareasproyecto: state.tareasproyecto,
            errortarea:state.errortarea,
            tareaseleccionada: state.tareaseleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            cambiarEstadoTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
        }}>
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareasState;