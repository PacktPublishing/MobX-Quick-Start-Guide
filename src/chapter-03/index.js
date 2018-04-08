import { store } from './BookStore';
import React from 'react';
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
} from 'material-ui';
import { observer, inject, Provider } from 'mobx-react';

@inject('store')
@observer
class App extends React.Component {
    render() {
        const { searchText, searchOperation } = this.props.store;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        placeholder={'Search Books...'}
                        fullWidth={true}
                        value={searchText}
                        onChange={this.updateSearchText}
                        onKeyUp={this.searchIfEnter}
                    />

                    {searchOperation === 'pending' ? (
                        <LinearProgress variant={'query'} />
                    ) : null}
                </Grid>

                <ResultsList
                    store={this.props.store}
                    style={{ marginTop: '2rem' }}
                />
            </Grid>
        );
    }

    updateSearchText = event => {
        this.props.store.setSearchText(event.target.value);
    };

    searchIfEnter = event => {
        if (event.keyCode !== 13) {
            return;
        }

        this.props.store.search();
    };
}

const ResultsList = observer(({ store, style }) => {
    const { isSearchEmpty, searchOperation, searchResults } = store;

    return (
        <Grid spacing={16} container style={style}>
            {isSearchEmpty && searchOperation === 'completed' ? (
                <Grid item xs={12}>
                    <EmptyResults />
                </Grid>
            ) : null}

            {searchResults.map(x => (
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
        <App />
    </Provider>,
    document.getElementById('root'),
);
