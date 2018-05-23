import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import { tracker } from './history';
import { autorun } from 'mobx';
import { Provider } from 'mobx-react';
import { CheckoutWorkflow } from './CheckoutWorkflow';
import { Paper } from '@material-ui/core/es/index';
import { ShowCart } from './show-cart';
import { StepComponent } from './shared';

class App extends React.Component {
    render() {
        return (
            <Paper elevation={2} style={{ padding: 20 }}>
                <Router history={tracker.history}>
                    <Switch>
                        <Route exact path={'/'} component={ShowCart} />
                        <Route
                            exact
                            path={'/payment'}
                            render={props => (
                                <StepComponent
                                    title={'Payment'}
                                    operationTitle={'Confirm'}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={'/confirm'}
                            render={props => (
                                <StepComponent
                                    title={'Confirmation'}
                                    operationTitle={'Track Order'}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={'/track'}
                            render={props => (
                                <StepComponent
                                    title={'Track your order'}
                                    operationTitle={'Continue Shopping'}
                                />
                            )}
                        />
                    </Switch>
                </Router>
            </Paper>
        );
    }
}

ReactDOM.render(
    <Provider store={new CheckoutWorkflow()}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

/*
* A set of page names mapped to routes
* Using React Router: HashRouter
* Simple checkout flow: Open Cart -> Select Payment + Shipping -> Confirmation -> Tracking
* Route guards

 */
