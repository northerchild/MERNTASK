import React,{useContext} from 'react'
import { Tareas } from './Tareas'
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareasContext from '../../context/tareas/TareasContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

export const ListadoTarea = () => {
    //Obtener el state del proyectos
    const proyectosContex = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContex;
    //Obtener las tareas del proyecto
    const TareaContext = useContext(TareasContext);
    const {tareasproyecto} = TareaContext;
    //Si no hay proyecto seleccionado
    if(!proyecto) return null
    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;
    //Eliminar un proyecto
    const onClickEliminar = ()=>{
        eliminarProyecto(proyectoActual.id);
    }
    return (
        <>
          <h2>Proyectos: {proyectoActual.nombre}</h2>
          <ul className="listado-tareas">
              {tareasproyecto.length === 0
                ?(<li className="tarea"><p>No hay Tareas</p></li>)
                :<TransitionGroup>
                    {
                        tareasproyecto.map(tarea => (
                            <CSSTransition 
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea">
                                <Tareas tarea={tarea}/>
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup>
              }
          </ul>
          <button type="buttom" className="btn btn-eliminar" onClick={onClickEliminar}>Elimnar Proyecto &times;</button>  
        </>
    )
}
