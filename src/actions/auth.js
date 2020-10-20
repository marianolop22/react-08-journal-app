import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';
import { notesLogoutCleaning } from './notes'

//esto es una accion asincrona
export const startLoginEmailPassword = (email, password) => {
    return ( dispatch ) => {

        dispatch ( startLoading() );

        //se agrega el return para que ser puedan hacer las pruebas
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({user}) => {
                dispatch (login (user.uid, user.displayName) );
            })
            .catch( err => {
                Swal.fire(
                    'Fail',
                    err.message,
                    'error'
                );
            })
            .finally( ()=> {
                dispatch ( finishLoading()  );
            })
    }
};

export const startRegisterWithEmailPasswordName = (email,  password, name) => {
    
    return ( dispatch ) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({ user }) => {
                await user.updateProfile({displayName: name});
                dispatch ( login ( user.uid, user.displayName ));
            })
            .catch( err => {
                Swal.fire(
                    'Fail',
                    err.message,
                    'error'
                );
            })
    }
};


export const startGoogleLogin = () => {

    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch ( login ( user.uid, user.displayName ));
            })
    }
};



export const startLogout = () => {
    return async ( dispatch ) => {

        // dispatch ( startLoading() );

        await firebase.auth().signOut()
        dispatch ( logout () );
        dispatch ( notesLogoutCleaning ());
        // dispatch ( finishLoading() );
    }
};

export const login = (uid, displayName ) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
    })

export const logout = () => ({
    type: types.logout
})