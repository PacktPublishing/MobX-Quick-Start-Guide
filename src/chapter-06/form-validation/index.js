import React from 'react';
import ReactDOM from 'react-dom';
import { enrollment } from './store';
import { Provider } from 'mobx-react';
import { App } from './components';

ReactDOM.render(
    <Provider store={enrollment}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
