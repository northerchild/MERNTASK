import React, { useContext, useState} from 'react'
import proyectoContext from '../../context/proyectos/ProyectoContext';
export const NuevoProyectos = () => {
    //Obtener el state del formulario
    const proyectosContex = useContext(proyectoContext);
    const {formulario, errorformulario, mostarFormulario,agregarProyecto, mostrarError} = proyectosContex;
    //State para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    })
    //Extraer nombre del proyecto
    const {nombre} = proyecto;
    //Leer los contenidos del input
    const onChangeProyecto = e =>{
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value,
        })
    }
    //Cuando el usuario envia un proyecto
    const onSubmitProyecto = e =>{
        e.preventDefault();
        //Validar el proyecto 
        if(nombre === ''){
            mostrarError();
            return;
        }
        //Agregar al state
        agregarProyecto(proyecto)
    }
    //Mostar Formulario
    const onclick = ()=>{
        mostarFormulario()
    }
    return (
        <>
        <button className="btn btn-block btn-primario" onClick={onclick}>
            Nuevo Proyecto
        </button>
        {
            formulario
            ?
            (
                <form className="formulario-nuevo-proyecto" 
                        onSubmit={onSubmitProyecto}>
                    <input type="text" 
                            className="input-text" 
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}/>
                    <input type="submit" 
                            className="btn btn-primario btn-block"
                            value="Agregar proyecto"/>       
                </form>
            )
            : null
        }
        {errorformulario ? <p className="mensaje error">El nombre del proyecto debe ser obligatorio</p> : null}
        </>
    )
}
