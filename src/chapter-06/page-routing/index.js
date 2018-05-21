import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return 'Page Routing';
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

/*
* A set of page names mapped to routes
* Using React Router: HashRouter
* Simple checkout flow: Open Cart -> Select Payment + Shipping -> Confirmation -> Tracking
* Route guards

 */
