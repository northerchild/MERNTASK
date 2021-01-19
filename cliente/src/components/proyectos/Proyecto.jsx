import React,{useContext} from 'react'
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareasContext from '../../context/tareas/TareasContext';
export const Proyecto = ({proyecto}) => {
    //Obtener el state del proyectos
    const proyectosContex = useContext(proyectoContext);
    const {proyectoActual} = proyectosContex;
    //Obtener la funcion del contex de tarea
    const tareasContext = useContext(TareasContext);
    const {obtenerTareas} = tareasContext;
    //Función para agregar el proyecto actual
    const seleccionarProyecto = id =>{
        proyectoActual(id); //Fijar un proyecto Actual
        obtenerTareas(id); //Filtrar las tareas cuando se de click
    }
    return (
        <li>
            <button type="button" className="btn btn-blank" onClick={()=> seleccionarProyecto(proyecto._id)}>
                {proyecto.nombre}
            </button>
        </li>
    )
}
