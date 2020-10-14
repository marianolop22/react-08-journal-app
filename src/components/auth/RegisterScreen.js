import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
    return (
        <>
            <h3 className="auth__title">Register</h3>  
            <form>
                <input
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    mame="name"
                    autoComplete="off"
                />

                <input
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    mame="mail"
                    autoComplete="off"
                />

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    mame="password"
                />
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Confirm Password"
                    mame="password2"
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                <Link className="link" to="/auth/login">
                    Already Registered?
                </Link>

            </form>
        </>
    )
}
