import { store } from './BookStore';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
    Grid,
    Card,
    CardContent,
    TextField,
    LinearProgress,
    CardMedia,
    Typography,
    Divider,
    AppBar,
    Toolbar,
} from 'material-ui';
import { observer, inject, Provider } from 'mobx-react';

import DevTools from 'mobx-react-devtools';

@inject('store')
@observer
class App extends React.Component {
    render() {
        const { store } = this.props;

        return (
            <Fragment>
                <AppBar
                    position="static"
                    color="default"
                    style={{ marginBottom: 20 }}
                >
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            MobX QuickStart Book Store
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <Grid item xs={12}>
                        <SearchTextField
                            store={store}
                            onChange={this.updateSearchText}
                            onEnter={store.search}
                        />
                    </Grid>

                    <ResultsList store={store} style={{ marginTop: '2rem' }} />
                </Grid>
            </Fragment>
        );
    }

    updateSearchText = event => {
        this.props.store.setTerm(event.target.value);
    };
}

const SearchTextField = observer(({ store, onChange, onEnter }) => {
    const { term, state } = store;
    return (
        <Fragment>
            <TextField
                placeholder={'Search Books...'}
                fullWidth={true}
                value={term}
                onChange={onChange}
                onKeyUp={event => {
                    if (event.keyCode !== 13) {
                        return;
                    }

                    onEnter();
                }}
            />

            {state === 'pending' ? <LinearProgress variant={'query'} /> : null}
        </Fragment>
    );
});

const ResultsList = observer(({ store, style }) => {
    const { isEmpty, results } = store;

    return (
        <Grid spacing={16} container style={style}>
            {isEmpty ? (
                <Grid item xs={12}>
                    <EmptyResults />
                </Grid>
            ) : null}

            {results.map(x => (
                <Grid item xs={12} key={x.id}>
                    <BookItem book={x} />
                    <Divider />
                </Grid>
            ))}
        </Grid>
    );
});

function EmptyResults() {
    return (
        <Card>
            <CardContent>
                <Typography variant={'headline'}>No Results</Typography>
            </CardContent>
        </Card>
    );
}

function BookItem({ book }) {
    return (
        <Card
            elevation={0}
            style={{
                flexDirection: 'row',
                display: 'flex',
                padding: '1rem',
            }}
        >
            <CardMedia
                src={book.image}
                component={'img'}
                style={{ height: 200, width: 'auto' }}
            />
            <CardContent>
                <Typography variant={'headline'}>{book.title}</Typography>
                <Typography variant={'subheading'}>{book.author}</Typography>
                <Typography
                    variant={'subheading'}
                    style={{ color: 'darkorange' }}
                >
                    {book.rating}★<span style={{ color: 'black' }}>
                        <span>
                            {' from '}
                            <strong>{book.totalRatings}</strong> ratings.
                        </span>
                    </span>
                </Typography>
            </CardContent>
        </Card>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <Fragment>
            <DevTools />
            <App />
        </Fragment>
    </Provider>,
    document.getElementById('root'),
);
