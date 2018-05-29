import React from 'react';
import { enrollment } from './store';
import { Provider } from 'mobx-react';
import { App } from './components';

export function FormValidationExample() {
    return (
        <Provider store={enrollment}>
            <App />
        </Provider>
    );
}
