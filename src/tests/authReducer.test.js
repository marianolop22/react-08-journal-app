import '@testing-library/jest-dom';
import { authReducer } from '../reducers/authReducer';
import { types } from '../types/types';

describe ('Pruebas de authReducer', ()=> {


    test('debe de devolver un login', () => {

        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid:'123',
                displayName: 'mariano'
            }
        };
        const state = authReducer (initState, action);
        expect(state).toEqual({uid:action.payload.uid, name:action.payload.displayName});

    });

    test('debe de devolver un objeto vacio', () => {

        const initState = {
            uid:'123',
            name: 'mariano'
        };
        const action = {
            type: types.logout
            };
        const state = authReducer (initState, action);
        expect(state).toEqual({});
    });

    test('debe de devolver el initstate', () => {

        const initState = {};
        const action = {
            type: 'frula'
            };
        const state = authReducer (initState, action);
        expect(state).toEqual(initState);
    });

});