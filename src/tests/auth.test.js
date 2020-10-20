import '@testing-library/jest-dom';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk'; 

import { startLoginEmailPassword, startLogout, startRegisterWithEmailPasswordName } from '../actions/auth';
import { firebase } from "../firebase/firebase-config";
import { types } from '../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid:'TESTING'
    }
}

let store = mockStore (initState);


describe ('Pruebas de auth', ()=> {

    beforeEach ( ()=> {
        store = mockStore (initState);
    })


    test('debe de realizar el logout', async () => {

        await store.dispatch ( startLogout() );
        const actions = store.getActions();

        // console.log(actions);
        expect (actions[0].type).toBe(types.logout);
        expect (actions[1].type).toBe(types.notesLogoutCleaning);
    })
    


    test('debe de hacer login', async () => {
        
        await store.dispatch ( startLoginEmailPassword( 'testing@yahoo.com.ar', '123456') );
        const actions = store.getActions();
        // console.log(actions);

        expect (actions[0].type ).toBe(types.uiStartLoading);
        expect (actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'zFyMLpSFyMMukmmEiyKP48ovb0b2', 
                displayName: 'TESTING'
            }
        });
        expect (actions[2].type ).toBe(types.uiFinishLoading);
    });

    test('debe de registar usuario', async () => {
        // await store.dispatch ( startRegisterWithEmailPasswordName( 'testing@yahoo.com.ar', '123456', 'TESTING') );
        // const actions = store.getActions();

        // console.log(actions);
        // const resp = await firebase.auth().createUserWithEmailAndPassword('testing@yahoo.com.ar', '123456')
        // console.log(resp);
    });



});