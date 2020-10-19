import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk'; 
import { startDelete, startLoadingNotes, startNewNote, startSaveNote, startUploading } from "../actions/notes";
import { types } from '../types/types';
import { db } from "../firebase/firebase-config";
// import { fileUpload } from "../helpers/fileUpload";

jest.mock('../helpers/fileUpload', () => ({
    fileUpload: jest.fn( ()=> {
        // return 'https://holamundo.com/cosa.jpg'
        return Promise.resolve('https://holamundo.com/cosa.jpg');
    })
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid:'TESTING'
    },
    notes: {
        active: {
            id: 'Y8mUpJUaiUAOy32ddWYV',
            title: 'Hola',
            body: 'mundo'
        }
    }
}


//configuracion del store al momento de la prueba
let store = mockStore (initState);

beforeEach ( ()=>{
    store = mockStore (initState);
})

describe ('Pruebas con las acciones de notes.test', ()=> {

    test('debe de crear una nueva nota', async () => {
        
        //este dispatch es el que está en el return dentro de acions con cualquiera de lo archivos
        await store.dispatch ( startNewNote() );
        const actions = store.getActions();

        // console.log(actions[0].payload.id);

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        //await store.dispatch ( startDelete (actions[0].payload.id) );
        await db.doc(`TESTING/journal/notes/${(actions[0].payload.id)}`).delete();

    });

    test('startLoadingNotes debe de cargar las notas ', async () => {
        
        await store.dispatch ( startLoadingNotes('TESTING') );
        const actions = store.getActions();
        // console.log(actions[0]);

        expect ( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            date: expect.any(Number),
            title: expect.any(String),
            body: expect.any(String)
        };

        expect( actions[0].payload[0]).toMatchObject(expected);

    })
    
    test('startSvaeNote debe de guardar la nota ', async () => {
        
        const note = {
            id: 'xUZjVAqvRj2BXaK3fssA',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch ( startSaveNote(note) );
        const actions = store.getActions();
        // console.log(actions[0]);

        expect ( actions[0].type ).toBe(types.notesUpdated);

        const doc = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        expect( doc.data().title ).toBe(note.title);

    });

    test('startLoading debe de actualizar el url del entry', async() => {

        const file = new File([],'foto.jpg');
        await store.dispatch ( startUploading(file) );
        // const actions = store.getActions();
        const doc = await db.doc(`TESTING/journal/notes/Y8mUpJUaiUAOy32ddWYV`).get();

        expect (doc.data().url).toBe('https://holamundo.com/cosa.jpg');
        
    })
    



});
