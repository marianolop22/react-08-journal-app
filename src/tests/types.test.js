import '@testing-library/jest-dom';
import { types } from "../types/types";

describe ('Pruebas sobre types', ()=> {


    const typesTest = {
        login:'[Auth] Login',
        logout: '[Auth] Logout',
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',
    
        notesAddNew: '[Notes] New Note',
        notesActive: '[Notes] Set Active note',
        notesLoad: '[Notes] Load notes',
        notesUpdated: '[Notes] Updated note',
        notesFileUrl: '[Notes] Updated image url',
        notesDelete: '[Notes] Delete notes',
        notesLogoutCleaning: '[Notes] Loagout Cleaning'
    };


    test('debe conicidir el types', () => {
        
        expect(typesTest).toEqual(types);

    });

});