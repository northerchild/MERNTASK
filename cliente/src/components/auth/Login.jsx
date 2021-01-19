import React, { useState,useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alerta/alertaContext';
import AuthContext from '../../context/auth/authContext';

export const Login = (props) => {
    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext

    //En caso de que el usuario y password no existan
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos');
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    },[mensaje, autenticado, props.history])

    //State para iniciar sesión
    const [usuario,guardarUsuario] = useState({
        email:'',
        password:''
    })
    //extraer de usuario
    const {email, password} = usuario;

    const onChange = (e) =>{
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value,
        })
    }
    //Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault()
        //validar que no haya campos vacios
        if (email.trim() ===  '' || password.trim() === '') {
            mostrarAlerta('todos los campos son obligatorios', 'alerta-error')
        }
        //pasarlo al action
        iniciarSesion({email,password});
    }

    return (
        <div>
            <div className="form-usuario">
                {alerta ?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null}
                <div className="contenedor-form sombra-dark">
                    <h1>Iniciar Sesión</h1>
                    <form onSubmit={onSubmit}>
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
                            <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión"/>
                        </div>
                    </form>
                    <Link to={'/nueva-cuenta'} className="enlace-cuenta">Crear Cuenta</Link>
                </div>
            </div>
        </div>
    )
}
