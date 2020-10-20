import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk'; 
import { Sidebar } from '../../components/journal/Sidebar';
import { startLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";

jest.mock('../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

jest.mock('../../actions/notes', () => ({
    startNewNote: jest.fn(),
}));



//todo esto es para generar un estado para poder utilizar el redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid:'1',
        name:'Mariano'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        notes:[],
        active:null
    }
}

let store = mockStore (initState);
store.dispatch = jest.fn(); //esto es para simular la funcion dispatch

const wrapper = mount(
    <Provider store={store}>
        <Sidebar/>
    </Provider>
);


describe ('Pruebas en el  SideBar', ()=> {

    beforeEach ( ()=> {
        store = mockStore (initState);
        jest.clearAllMocks();
    });


    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();

    });

    test('debe de llamar el logout', () => {
        
        wrapper.find('button').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();

    });

    test('debe de llamar startNewNote', () => {

        wrapper.find('.journal__new-entry').simulate('click');
        expect( startNewNote).toHaveBeenCalled();


    });

});