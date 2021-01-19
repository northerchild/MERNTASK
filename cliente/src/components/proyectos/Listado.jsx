import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/ProyectoContext'
import { Proyecto } from './Proyecto'
import AlertaContext from '../../context/alerta/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

export const Listado = () => {
    //Extraer proyectos de State Inicial
    const proyectosContex = useContext(proyectoContext);
    const {proyectos,obtenerProyectos} = proyectosContex;
    const alertaContext = useContext(AlertaContext);
    const {mensaje, alerta, mostrarAlerta} = alertaContext;
    useEffect(()=>{
        //Si existe un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos()
        //eslint-disable-next-line
    },[mensaje])
    
    if (proyectos.length === 0) return <p>Aun no tienes ningun proyecto, prueba creando uno</p>;
    return (
       <ul className="listado-proyectos">
           {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
           <TransitionGroup>
           {proyectos.map(proyecto => (
               <CSSTransition 
                    key={proyecto._id}
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
