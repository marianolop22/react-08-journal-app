import React from 'react'
import { Provider } from "react-redux";

import {AppRouter} from './routers/AppRouter'
import { store } from './store/store';

//Con esto se configura de forma total el redux en toda la aplicacion
export const JournalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}
