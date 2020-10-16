import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from "../../actions/auth";


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { ui: {msgError}  } = useSelector( state => state );

    const [formValues, handleInputChange] = useForm ({
        name: 'nando',
        email:'nando@pepe.com.ar',
        password:'123456',
        password2:'123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch (  startRegisterWithEmailPasswordName(email, password, name) );
        } 
    };

    const isFormValid = () => {

        if (name.trim().length === 0 ) {
            dispatch ( setError ('Debe ingresar un nombre'));
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch ( setError ('Email invalido'));
            return false;
        } else if ( password !== password2 || password < 5) {
            dispatch ( setError ('Los pass deben ser iguales y de mas de  6  caracteres'));
            return false;
        }

        dispatch ( removeError ());
        return true;    
    };




    return (
        <>
            <h3 className="auth__title">Register</h3>  
            <form onSubmit={handleRegister}>

                {
                    (msgError) &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }

                <input
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                <Link className="link" to="/auth/login">
                    Already registered?
                </Link>

            </form>
        </>
    )
}
