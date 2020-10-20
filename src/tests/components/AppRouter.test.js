import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk'; 
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';
import { act } from 'react-dom/test-utils';
import { firebase } from "../../firebase/firebase-config";

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

//todo esto es para generar un estado para poder utilizar el redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes:[],
        active: null
    }
}

let store = mockStore (initState);
store.dispatch = jest.fn(); //esto es para simular la funcion dispatch



describe ('pruebas en AppRouter', ()=> {

    test('debe de llamar al login si estoy autenticado', async () => {
        
        let user;
        await act( async ()=> {
            
            const userCred = await firebase.auth().signInWithEmailAndPassword('testing@yahoo.com.ar', '123456');
            user = userCred.user;            

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter/>
                    </MemoryRouter>
                </Provider>
            );
        })

        // console.log(user.uid);
        expect(login).toHaveBeenCalledWith(user.uid, user.displayName);

    });

});