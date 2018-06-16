import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import {
    AppBar,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListSubheader,
    Toolbar,
    Typography,
} from '@material-ui/core/es/index';
import { allExamples, chapters } from './chapters';
import theme from '@material-ui/core/colors/indigo';
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
                                <ChapterRoute key={ex.path} ex={ex} />
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
                                background: theme['500'],
                                color: theme['50'],
                            }}
                            to={ex.path}
                        >
                            <Typography color={'inherit'} variant={'body2'}>
                                {ex.title}
                            </Typography>
                        </ListItem>
                    ))}
                </div>
            ))}
        </List>
    );
};

function ChapterRoute({ ex }) {
    window.scrollTo(0, 0); // Quick fix to scroll to top

    return (
        <Route
            path={ex.path}
            component={() => (
                <Fragment>
                    <Card
                        style={{
                            marginBottom: '2rem',
                            backgroundColor: theme['50'],
                        }}
                    >
                        <CardContent>
                            <Typography
                                color={'textSecondary'}
                                variant={'body2'}
                                align={'left'}
                            >
                                {`Chapter 0${ex.chapterIndex}: ${
                                    ex.chapterTitle
                                }`}
                            </Typography>
                            <Typography
                                color={'primary'}
                                variant={'headline'}
                                align={'left'}
                            >
                                {`Example: ${ex.title}`}
                            </Typography>
                        </CardContent>{' '}
                    </Card>

                    <ex.component />
                </Fragment>
            )}
        />
    );
}
