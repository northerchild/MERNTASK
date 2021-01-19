import React,{useContext,useEffect,useState} from 'react'
import proyectoContext from '../../context/proyectos/ProyectoContext'
import TareasContext from '../../context/tareas/TareasContext';
export const FormTarea = () => {
    //Extraer si un proyecto esta activo
    const proyectosContex = useContext(proyectoContext);
    const {proyecto} = proyectosContex;

    //Obtener la funcion del contex de tarea
    const tareasContext = useContext(TareasContext);
    const {tareaseleccionada,errortarea,agregarTarea,validarTarea, 
           obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;
    //Effect que detecta si hay una tarea seleccionada
    useEffect(()=>{
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaseleccionada])


    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre:''
    })
    //Extraer nombre de la tarea
    const {nombre} = tarea
    //Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto que quieras trabajar</h2>
    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;
    //Leer los valores del form
    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name]:e.target.value
        })
    }
    //Crear la nueva tarea
    const onSubmit = e =>{
        e.preventDefault();
        //validar
        if (nombre.trim() === '') {
            validarTarea()
            return;
        }
        //Si es edición o si es nueva tarea
        if(tareaseleccionada === null){
            //agregar un nueva tarea al state
            tarea.proyecto = proyectoActual._id;
            tarea.estado = false;
            agregarTarea(tarea);
        }else{
            //Actualizar tarea
            actualizarTarea(tarea);
            //Eliminar tarea selecciona del state
            limpiarTarea();
        }
        //obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id)
        //reiniciar el form
        guardarTarea({
            nombre:''
        })
    }

    
    return (
        <div className="formulario">
            <form action="" onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input type="text" 
                           className="input-text"
                           placeholder="Nombre Tarea..."
                           name="nombre"
                           value={nombre}
                           onChange={handleChange}/>
                </div>
                <div className="contenedor-input">
                    <input type="submit" 
                           className="btn btn-primario btn-submit btn-block"
                           value={tareaseleccionada ? 'Editar Tarea': 'Agregar Tarea'}/>
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre es obligatorio</p> : null}
        </div>
    )
}
