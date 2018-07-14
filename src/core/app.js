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
    Button,
} from '@material-ui/core';
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
                        <BookAppBar />

                        <Grid item xs={4}>
                            <ChapterList chapters={chapters} />
                        </Grid>

                        <Grid item xs={8}>
                            <Route
                                component={EntrySplash}
                                path={'/'}
                                exact={true}
                            />
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

function BookAppBar() {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <NavLink
                    to={'/'}
                    activeStyle={{
                        textDecoration: 'none',
                    }}
                >
                    <Typography
                        variant="title"
                        style={{
                            color: 'white',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={require('./packt.jpeg')}
                            height={24}
                            style={{ marginRight: 8 }}
                        />
                        MobX QuickStart Guide
                    </Typography>
                </NavLink>

                <Button
                    style={{
                        color: 'white',
                        margin: '0 1rem',
                    }}
                    href={
                        'https://github.com/PacktPublishing/Mobx-QuickStart-Guide'
                    }
                    size={'small'}
                >
                    <img
                        src={require('./github-256.png')}
                        height={24}
                        style={{ marginRight: 10 }}
                    />
                    Source Code
                </Button>
            </Toolbar>
        </AppBar>
    );
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
                        </CardContent>

                        <CardContent>
                            <Typography
                                variant={'subheading'}
                                color={'textSecondary'}
                            >
                                <span style={{ fontSize: 36 }}>🤔</span> If you
                                don't see any visible output here, do check the
                                console logs in your <strong>DevTools</strong>.
                            </Typography>
                        </CardContent>
                    </Card>

                    <ex.component />
                </Fragment>
            )}
        />
    );
}

function EntrySplash() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <img src={require('./mobx.png')} width={256} />
            <Typography variant={'display3'}>MobX QuickStart Guide</Typography>

            <Typography variant={'headline'} style={{ marginTop: '2rem' }}>
                This is a companion web-app that includes all the executable
                examples in the book.
            </Typography>

            <Typography variant={'caption'} style={{ marginTop: '3rem' }}>
                Built using React, React Router, Material-UI and{' '}
                <strong>MobX</strong> 😇
            </Typography>
        </div>
    );
}
