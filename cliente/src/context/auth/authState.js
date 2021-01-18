import React,{useReducer,useContext} from 'react';
import authContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {REGISTRO_EXITOSO,
    REGISTO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION} from '../../types';



const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado:null,
        usuario:null,
        mensaje: null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    //las funciones
    const registrarUsuario = async datos =>{
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta);
            dispatch({
                type:REGISTRO_EXITOSO,
                payload:respuesta.data
            })
            //obtener el usuario
            usuarioAutenticado()
        } catch (error) {
            const alerta ={
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type:REGISTO_ERROR,
                payload:alerta
            })
        }
    }
    //Retorna el usuario autenticado
    const usuarioAutenticado = async()=>{
        const token = localStorage.getItem('token');
        if(token){
            //Funcion que envia el token a los headers
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            });
        } catch (error) {
            console.log(error.response)
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }
    return(
        <authContext.Provider value={{
            token:state.token,
            autenticado:state.autenticado,
            usuario:state.usuario,
            mensaje:state.mensaje,
            registrarUsuario
        }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;