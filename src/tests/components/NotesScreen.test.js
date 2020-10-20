import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk'; 
import { NoteScreen } from '../../components/notes/NoteScreen';
import { activeNote } from "../../actions/notes";

jest.mock('../../actions/notes', () => ({
    activeNote: jest.fn(),
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
        active:{
            id:'123',
            title: 'un titulo',
            body:'un body',
            date: 0
        }
    }
}

let store = mockStore (initState);
store.dispatch = jest.fn(); //esto es para simular la funcion dispatch

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen/>
    </Provider>
);


describe ('Pruebas de NotesScreen', ()=> {

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de dispar el activenote', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name:'title',
                value:'nuevo valor'
            }
        });


        expect(activeNote).toHaveBeenLastCalledWith( 
            initState.notes.active.id,
            {
                ...initState.notes.active,
                title: 'nuevo valor'
            } );

    });

});