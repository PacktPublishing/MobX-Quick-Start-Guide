import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { tracker } from './history';
import { autorun } from 'mobx';

const routes = {
    cart: { path: '/', label: 'Shopping Cart' },
    payment: { path: '/payment', label: 'Make Payment' },
    confirm: { path: '/confirm', label: 'Confirm Order' },
    track: { path: '/track', label: 'Track Order' },
};

window.tracker = tracker;
tracker.startListening(routes);

autorun(() => {
    console.log(tracker.currentRoute);
});

class App extends React.Component {
    render() {
        return (
            <Router history={tracker.history}>
                <Switch>
                    <Route exact path={'/'} component={ShowLinks} />
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

function ShowLinks() {
    return (
        <Fragment>
            {Object.keys(routes).map(route => {
                const info = routes[route];
                return (
                    <Link key={info.path} to={info.path}>
                        {info.label}
                    </Link>
                );
            })}
        </Fragment>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

/*
* A set of page names mapped to routes
* Using React Router: HashRouter
* Simple checkout flow: Open Cart -> Select Payment + Shipping -> Confirmation -> Tracking
* Route guards

 */
