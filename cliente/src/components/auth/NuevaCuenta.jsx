import React, { useState,useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alerta/alertaContext';
import AuthContext from '../../context/auth/authContext';

export const NuevaCuenta = (props) => {
    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext

    //Validación del registro del usuario
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos');
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
    },[mensaje, autenticado, props.history])
    //State para iniciar sesión
    const [usuario,guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })
    //extraer de usuario
    const {nombre, email, password,confirmar} = usuario;

    const onChange = (e) =>{
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value,
        })
    }
    //Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault()
        //validar que no hayan campos vacios
        if(nombre.trim() === '' || email.trim() === '' ||
        password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }
        //Si el password es menor a 6 letras
        if (password.length < 6) {
            mostrarAlerta('El password debe contar on minimo 6 caracteres', 'alerta-error')
            return
        }
        //Validar que los dos password sean iguales
        if(password !== confirmar){
            mostrarAlerta('Los passwords deben ser iguales', 'alerta-error')
            return
        }
        //Pasarlo al action 
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return (
        <div>
            <div className="form-usuario">
                {alerta ?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null}
                <div className="contenedor-form sombra-dark">
                    <h1>Crea una cuenta</h1>
                    <form onSubmit={onSubmit}>
                        <div className="campo-form">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" 
                                   id="nombre" 
                                   name="nombre"
                                   value={nombre}
                                   placeholder="Ingresa tu nombre"
                                   onChange={onChange}/>
                        </div>
                        <div className="campo-form">
                            <label htmlFor="email">Email</label>
                            <input type="email" 
                                   id="email" 
                                   name="email"
                                   value={email}
                                   placeholder="Ingresa tu email"
                                   onChange={onChange}/>
                        </div>
                        <div className="campo-form">
                            <label htmlFor="password">Password</label>
                            <input type="password" 
                                   id="password" 
                                   name="password"
                                   value={password}
                                   placeholder="******"
                                   onChange={onChange}/>
                        </div>
                        <div className="campo-form">
                            <label htmlFor="confirmar">Confirmar Password</label>
                            <input type="password" 
                                   id="confirmar" 
                                   name="confirmar"
                                   value={confirmar}
                                   placeholder="Repite tú password"
                                   onChange={onChange}/>
                        </div>
                        <div className="campo-form">
                            <input type="submit" className="btn btn-primario btn-block" value="Registrarme"/>
                        </div>
                    </form>
                    <Link to={'/'} className="enlace-cuenta">Iniciar Sesión</Link>
                </div>
            </div>
        </div>
    )
}
