import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import {
    AppBar,
    Button,
    Grid,
    List,
    ListItem,
    ListSubheader,
    Toolbar,
    Typography,
    withStyles,
} from '@material-ui/core/es/index';
import { allExamples, chapters } from './chapters';
import theme from '@material-ui/core/colors/blueGrey';
import DevTools from 'mobx-react-devtools';

export class MobXBookApp extends React.Component {
    render() {
        return (
            <Fragment>
                <DevTools />
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
            </Fragment>
        );
    }
}

const ChapterList = ({ chapters }) => {
    return (
        <List dense>
            {chapters.map(({ examples, chapter, title }) => (
                <div key={chapter} style={{ marginBottom: '2rem' }}>
                    <ListSubheader disableSticky>
                        <Typography
                            color={'primary'}
                            variant={'title'}
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
                            divider
                            button
                            component={NavLink}
                            activeStyle={{
                                background: theme['A100'],
                            }}
                            to={ex.path}
                        >
                            <Typography>{ex.title}</Typography>
                        </ListItem>
                    ))}
                </div>
            ))}
        </List>
    );
};
