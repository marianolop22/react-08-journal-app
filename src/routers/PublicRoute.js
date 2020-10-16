import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isAuthenticated,
    component:Component,
    ...rest //tengo el resto de las properties
}) => {
    return (
        <Route
            {...rest}
            component={ (props)=> (
                ( !isAuthenticated ) 
                    ? <Component {...props} /> //si está autenticado, mando el componente al que quiero ingresar con todas las propiedades
                    : ( <Redirect to="/"/>)
            )}
        
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
