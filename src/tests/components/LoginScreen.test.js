import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from '../../components/auth/LoginScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk'; 
import { MemoryRouter } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

jest.mock('../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

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
store.dispatch = jest.fn(); //esto es para simular la funcion dispatch

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>
);

describe ('pruebas en el  LoginScreen', ()=> {

    beforeEach ( ()=> {
        store = mockStore (initState);
        jest.clearAllMocks();
    })

    test('debe de renderizar', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de dispara la accion de login de google', () => {

        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('debe de dispara el login', () => {

        // wrapper.find('form').simulate('submit');
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });
        
        expect(startLoginEmailPassword).toHaveBeenCalledWith( 'nando@pepe.com.ar','123456');

    });

});