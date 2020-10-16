import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    //esto te permite ejecutar la funcion dispatch de lo que tengo en el store
    //redux, solito, busca que dispatch debe hacer
    const dispatch = useDispatch(); 
    const { ui: {loading}  } = useSelector( state => state );
    
    const [formValues, handleInputChange] = useForm ({
        email:'nando@pepe.com.ar',
        password:'123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch ( startLoginEmailPassword ( email, password) );
    };


    const hangleGoogleLogin = () => {
        dispatch ( startGoogleLogin());
    };

    return (
        <>
            <h3 className="auth__title">Login</h3>

            {/* {
                    (msgError) &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
            } */}

            <form onSubmit={handleLogin}>
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

                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={loading}
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={hangleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className="link" to="/auth/register">
                    Create new account
                </Link>

            </form>
      </>
    )
}