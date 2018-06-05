import { BrowserRouter, Link, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
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
import themeColor from '@material-ui/core/colors/blueGrey';

export class MobXBookApp extends React.Component {
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

function ChapterList({ chapters }) {
    return (
        <List dense>
            {chapters.map(({ examples, chapter, title }) => (
                <Fragment key={chapter}>
                    <ListSubheader
                        disableSticky
                        style={{ borderLeft: `5px solid ${themeColor['400']}` }}
                    >
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
