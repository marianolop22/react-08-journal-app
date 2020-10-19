import '@testing-library/jest-dom';
import React from 'react';
import { shallow } from 'enzyme';
import { setError, removeError, startLoading, finishLoading } from "../actions/ui";
import { types } from '../types/types';

describe ('pruebas en ui.test', ()=> {

    test('todas las acciones debem de funcionar', () => {
        
        const action = setError ('Ayuda');
        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'Ayuda'
        });

        const removeErrorAction = removeError ();
        const startLoadingAction = startLoading ();
        const finishLoadingAction = finishLoading ();

        expect (removeErrorAction).toEqual({
            type:types.uiRemoveError
        });
        expect (startLoadingAction).toEqual({
            type:types.uiStartLoading
        });
        expect (finishLoadingAction).toEqual({
            type:types.uiFinishLoading
        });



    });

});
