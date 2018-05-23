import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { tracker } from './history';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
} from '@material-ui/core';
import { Provider } from 'mobx-react';
import { CheckoutWorkflow } from './CheckoutWorkflow';
import { Grid } from '@material-ui/core/es/index';

const routes = {
    cart: { path: '/', label: 'Shopping Cart' },
    payment: { path: '/payment', label: 'Make Payment' },
    confirm: { path: '/confirm', label: 'Confirm Order' },
    track: { path: '/track', label: 'Track Order' },
};

tracker.startListening(routes);

autorun(() => {
    console.log(tracker.page);
});

class App extends React.Component {
    render() {
        return (
            <Router history={tracker.history}>
                <Switch>
                    <Route exact path={'/'} component={ShowCart} />
                    <Route
                        exact
                        path={'/payment'}
                        render={props => 'Payment'}
                    />
                    <Route
                        exact
                        path={'/confirm'}
                        render={props => 'Confirmation'}
                    />
                    <Route exact path={'/track'} render={props => 'Track'} />
                </Switch>
            </Router>
        );
    }
}

@inject('store')
@observer
class ShowCart extends React.Component {
    componentDidMount() {
        this.props.store.loadCart();
    }

    render() {
        const { items } = this.props.store;

        return (
            <Fragment>
                <Typography
                    variant={'headline'}
                    style={{ textAlign: 'center' }}
                >
                    Check out
                </Typography>
                <List>
                    {items.map(item => {
                        return (
                            <ListItem key={item.title}>
                                <ListItemIcon>
                                    <item.icon
                                        style={{ height: 64, width: 64 }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    secondary={`$${item.price}`}
                                />
                            </ListItem>
                        );
                    })}
                </List>

                <Grid justify={'center'} container>
                    <Button variant={'raised'} color={'primary'}>
                        Checkout
                    </Button>
                </Grid>
            </Fragment>
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
