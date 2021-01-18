import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const Login = () => {
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
    }

    return (
        <div>
            <div className="form-usuario">
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
