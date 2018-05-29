// import './chapter-02';
// import './chapter-03';
//
// import './chapter-04';
// import './chapter-05';
// import './chapter-06';
//
// import './chapter-09';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Chapter06 } from './chapter-06';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Route path={'/ch06'} component={Chapter06} />

                    <Link to={'/ch06'}>Chapter 06</Link>
                </Fragment>
            </BrowserRouter>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
