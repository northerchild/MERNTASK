import {REGISTRO_EXITOSO,
        REGISTO_ERROR,
        OBTENER_USUARIO,
        LOGIN_EXITOSO,
        LOGIN_ERROR,
        CERRAR_SESION} from '../../types';

export default (state,action) =>{
    switch(action.type){
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                autenticado:true,
                mensaje:null
            }
        case LOGIN_ERROR:   
        case REGISTO_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                mensaje: action.payload
            }    
        default:
            return state;
    }
}