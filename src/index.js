// import './chapter-02';
// import './chapter-03';
//
// import './chapter-04';
// import './chapter-05';
// import './chapter-06';
//
// import './chapter-09';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { Grid, List, ListItem, Typography } from '@material-ui/core/es/index';
import { Chapter06 } from './chapter-06';
import { Chapter03 } from './chapter-03';
import { Chapter05AsyncAction } from './chapter-05/async-action';

const chapters = [
    { title: 'Chapter 03', path: '/ch03', component: Chapter03 },
    {
        title: 'Chapter 05 (async action)',
        path: '/ch05/01',
        component: Chapter05AsyncAction,
    },
    { title: 'Chapter 06', path: '/ch06', component: Chapter06 },
];
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Grid container>
                    <Grid item xs={4}>
                        <List>
                            {chapters.map(ch => (
                                <ListItem
                                    key={ch.path}
                                    button
                                    divider
                                    component={Link}
                                    to={ch.path}
                                >
                                    <Typography>{ch.title}</Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={8}>
                        {chapters.map(ch => (
                            <Route
                                key={ch.path}
                                path={ch.path}
                                component={ch.component}
                            />
                        ))}
                    </Grid>
                </Grid>
            </BrowserRouter>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
