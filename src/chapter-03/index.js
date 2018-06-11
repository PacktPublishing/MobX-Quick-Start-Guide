import { store } from './book-store';
import React, { Fragment } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { inject, observer, Provider } from 'mobx-react';

import { ResultsList, SearchTextField } from './components';

@inject('store')
@observer
class App extends React.Component {
    render() {
        const { store } = this.props;

        return (
            <Fragment>
                <Header />

                <Grid container>
                    <Grid item xs={12}>
                        <Paper elevation={2} style={{ padding: '1rem' }}>
                            <SearchTextField
                                onChange={this.updateSearchText}
                                onEnter={store.search}
                            />
                        </Paper>
                    </Grid>

                    <ResultsList style={{ marginTop: '2rem' }} />
                </Grid>
            </Fragment>
        );
    }

    updateSearchText = event => {
        this.props.store.setTerm(event.target.value);
    };
}

function Header() {
    return (
        <Typography
            variant="title"
            color="inherit"
            style={{ marginBottom: 20, textAlign: 'center' }}
        >
            MobX QuickStart Book Store
        </Typography>
    );
}

export function BookSearchExample() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
