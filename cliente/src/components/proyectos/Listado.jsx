import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/ProyectoContext'
import { Proyecto } from './Proyecto'
import {CSSTransition, TransitionGroup} from 'react-transition-group';

export const Listado = () => {
    //Extraer proyectos de State Inicial
    const proyectosContex = useContext(proyectoContext);
    const {proyectos,obtenerProyectos} = proyectosContex;
    useEffect(()=>{
        obtenerProyectos()
        //eslint-disable-next-line
    },[])
    
    if (proyectos.length === 0) return <p>Aun no tienes ningun proyecto, prueba creando uno</p>;
    return (
       <ul className="listado-proyectos">
           <TransitionGroup>
           {proyectos.map(proyecto => (
               <CSSTransition 
                    key={proyecto.id}
                    timeout={200}
                    classNames="proyecto" >
                   <Proyecto 
                         proyecto={proyecto}/>
               </CSSTransition>
           ))}
           </TransitionGroup>
       </ul>
    )
}
