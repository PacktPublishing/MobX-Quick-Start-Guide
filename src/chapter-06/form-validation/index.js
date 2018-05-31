import React from 'react';
import { UserEnrollmentData } from './store';
import { Provider } from 'mobx-react';
import { App } from './components';

export class FormValidationExample extends React.Component {
    constructor(props) {
        super(props);

        this.store = new UserEnrollmentData();
    }

    render() {
        return (
            <Provider store={this.store}>
                <App />
            </Provider>
        );
    }

    componentWillUnmount() {
        this.store.cleanup();
        this.store = null;
    }
}
