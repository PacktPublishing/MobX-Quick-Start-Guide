import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import {
    AppBar,
    Grid,
    List,
    ListItem,
    ListSubheader,
    Toolbar,
    Typography,
} from '@material-ui/core/es/index';
import { allExamples, chapters } from './chapters';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Grid container spacing={16}>
                    <AppBar position="sticky" color="primary">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                MobX QuickStart Guide
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Grid item xs={4}>
                        <ChapterList chapters={chapters} />
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

function ChapterList({ chapters }) {
    return (
        <List dense>
            {chapters.map(({ examples, chapter, title }) => (
                <Fragment key={chapter}>
                    <ListSubheader
                        disableSticky
                        style={{ marginBottom: '1rem', marginTop: '0.5rem' }}
                    >
                        <Typography
                            color={'primary'}
                            variant={'title'}
                            style={{
                                backgroundColor: '#EEE',
                                padding: '0.25rem 0.5rem',
                            }}
                        >{`Chapter 0${chapter}`}</Typography>
                        <Typography
                            variant={'subheading'}
                            color={'textSecondary'}
                        >
                            {title}
                        </Typography>
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
    );
}
