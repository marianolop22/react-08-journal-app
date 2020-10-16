/* 
el state estará vacio cuando no esté autenticado
{
    uid: 'sdkjfhalksjdhflasd'
    name:'Mariano
}
 */

import { types } from "../types/types";

 /**
  * 
  * @param {{}} state estado que vamos a manejar
  * @param {{type,payload}} action acciones a realizar
  */
export const authReducer = (state = {}, action) => {
    
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.logout:
            return {}
    
        default:
            return state;
    }

};