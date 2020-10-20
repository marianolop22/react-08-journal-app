import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';

import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk'; 
import { RegisterScreen } from '../../components/auth/RegisterScreen';
import { types } from '../../types/types';

//todo esto es para generar un estado para poder utilizar el redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore (initState);

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen/>
        </MemoryRouter>
    </Provider>
);


describe ('Pruebas de RegisterScreen', ()=> {

    test('debe de renderizar', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de tirar error en input', () => {

        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name:'email'
            }
        });

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });

        const actions = store.getActions();
        // console.log(actions);

        expect( actions[0] ).toEqual({
            type:types.uiSetError,
            payload: 'Email invalido'
        });
    });

    test('debe de mostrar la caja de alerta con un error', () => {
        
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto'
            }
        }
        
        let store = mockStore (initState);
        
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen/>
                </MemoryRouter>
            </Provider>
        );
        
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);

    })
    


});