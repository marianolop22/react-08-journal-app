import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk'; 
import { JournalEntry } from '../../components/journal/JournalEntry';
// import { types } from '../../types/types';
import { activeNote } from '../../actions/notes';

//saco este mock y me muestra los parámetros con los que se llama el active note.
// jest.mock('../../actions/notes', () => ({
//     activeNote: jest.fn(),
// }));

//todo esto es para generar un estado para poder utilizar el redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const note = {
    id:'123',
    title: 'un titulo',
    body:'un body',
    date: 0,
    url:'https://hola.min/hola.jpg'
}

const initState = {}


let store = mockStore (initState);
store.dispatch = jest.fn(); //esto es para simular la funcion dispatch

const wrapper = mount(
    <Provider store={store}>
        <JournalEntry { ...note}  />
    </Provider>
);


describe ('Pruebas de Journal Screen', ()=> {

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de dispar el activenote', () => {

        wrapper.find('.journal__entry').prop('onClick')();
        // .simulate('click');
        // expect(activeNote).toHaveBeenLastCalledWith( 
        //     note.id,
        //     {
        //         ...note,
        //     } );

        expect(store.dispatch).toHaveBeenCalledWith(activeNote (
                note.id,
                {
                    ...note,
                }));

    });

});