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
import { BrowserRouter, Link, Route } from 'react-router-dom';
import {
    Grid,
    List,
    ListItem,
    Typography,
    ListSubheader,
    Button,
} from '@material-ui/core/es/index';
import { FormValidationExample, PageRoutingExample } from './chapter-06';
import { Chapter03 } from './chapter-03';
import { Chapter05AsyncAction } from './chapter-05/async-action';

const chapters = applyPathPrefix([
    {
        chapter: 3,
        examples: [
            {
                title: 'Book Search with Goodreads',
                path: '/',
                component: Chapter03,
            },
        ],
    },
    {
        chapter: 5,
        examples: [
            {
                title: 'Async Action',
                path: '/01',
                component: Chapter05AsyncAction,
            },
        ],
    },
    {
        chapter: 6,
        examples: [
            {
                title: 'Form Validation',
                path: '/form',
                component: FormValidationExample,
            },
            {
                title: 'Page Routing',
                path: '/routing',
                component: PageRoutingExample,
            },
        ],
    },
]);

const allExamples = chapters.reduce((list, ch) => {
    return list.concat(ch.examples);
}, []);

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Grid container spacing={16}>
                    <Grid item xs={4}>
                        <List dense>
                            {chapters.map(({ examples, chapter }) => (
                                <Fragment key={chapter}>
                                    <ListSubheader>
                                        <Button
                                            variant={'raised'}
                                            disabled
                                            fullWidth
                                            size={'small'}
                                            color={'primary'}
                                        >{`Chapter 0${chapter}`}</Button>
                                    </ListSubheader>
                                    {examples.map(ex => (
                                        <ListItem
                                            key={ex.path}
                                            button
                                            divider
                                            component={Link}
                                            to={ex.path}
                                        >
                                            <Typography>{ex.title}</Typography>
                                        </ListItem>
                                    ))}
                                </Fragment>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={8}>
                        {allExamples.map(ex => (
                            <Route
                                key={ex.path}
                                path={ex.path}
                                component={ex.component}
                            />
                        ))}
                    </Grid>
                </Grid>
            </BrowserRouter>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

function applyPathPrefix(chapters) {
    return chapters.map(ch => {
        ch.examples.forEach(ex => {
            const exPath = ex.path.replace(/^\/+/, '');
            ex.path = `/ch0${ch.chapter}/${exPath}`;
        });

        return ch;
    });
}
