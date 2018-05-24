import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import { tracker } from './history';
import { Provider } from 'mobx-react';
import { CheckoutWorkflow } from './CheckoutWorkflow';
import { Paper } from '@material-ui/core/es/index';
import { ShowCart } from './show-cart';
import {
    ConfirmDescription,
    PaymentDescription,
    ShoppingDescription,
    TemplateStepComponent,
    TrackOrderDescription,
} from './shared';

class App extends React.Component {
    render() {
        return (
            <Paper elevation={2} style={{ padding: 20 }}>
                <Router history={tracker.history}>
                    <Switch>
                        <Route
                            exact
                            path={'/'}
                            component={() => (
                                <TemplateStepComponent
                                    title={'MobX Shop'}
                                    renderDescription={ShoppingDescription}
                                    operationTitle={'View Cart'}
                                />
                            )}
                        />
                        <Route exact path={'/cart'} component={ShowCart} />
                        <Route
                            exact
                            path={'/payment'}
                            component={() => (
                                <TemplateStepComponent
                                    title={'Choose Payment'}
                                    renderDescription={PaymentDescription}
                                    operationTitle={'Confirm'}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={'/confirm'}
                            component={() => (
                                <TemplateStepComponent
                                    title={'Your order is confirmed'}
                                    operationTitle={'Track Order'}
                                    renderDescription={ConfirmDescription}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={'/track'}
                            component={() => (
                                <TemplateStepComponent
                                    title={'Track your order'}
                                    operationTitle={'Continue Shopping'}
                                    renderDescription={TrackOrderDescription}
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
