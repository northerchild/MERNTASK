import React,{useContext} from 'react'
import TareasContext from '../../context/tareas/TareasContext';
import proyectoContext from '../../context/proyectos/ProyectoContext'
export const Tareas = ({tarea}) => {
    //Extraer si un proyecto esta activo
    const proyectosContex = useContext(proyectoContext);
    const {proyecto} = proyectosContex;

    //Obtener la función del contex de tarea
    const tareasContext = useContext(TareasContext);
    const {eliminarTarea,obtenerTareas,actualizarTarea,guardarTareaActual} = tareasContext;

    //Extraer el proyecto 
    const [proyectoActual]  = proyecto;

    //Función para eliminar la tarea
    const tareaEliminar = id =>{
        eliminarTarea(id, proyectoActual._id)
        obtenerTareas(proyectoActual.id);
    }

    //Función que modifica el estado de las tareas
    const cambiarEstado = tarea =>{
        if (tarea.estado) {
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        actualizarTarea(tarea);
    }

    //funcion para editar
    const seleccionarTarea = tarea =>{
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                ?(
                    <button type="button" 
                            className="completo" 
                            onClick={()=> cambiarEstado(tarea)}>
                        Completo
                    </button>
                )
                :(
                    <button type="button" 
                            className="incompleto"
                            onClick={()=> cambiarEstado(tarea)}>
                        Incompleto
                    </button>
                )
                }
            </div>
            <div className="acciones">
                <button type="button" 
                        className="btn btn-primario"
                        onClick={()=> seleccionarTarea(tarea)}>Editar</button>
                <button type="button" 
                        className="btn btn-secundario"
                        onClick={()=> tareaEliminar(tarea._id)}>Eliminar</button>
            </div>
        </li>
    )
}
