import React, { Fragment } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    InputAdornment,
    LinearProgress,
    TextField,
    Typography,
} from 'material-ui';
import Search from '@material-ui/icons/Search';
import { observer } from 'mobx-react';

export const SearchTextField = observer(({ store, onChange, onEnter }) => {
    const { term, state } = store;
    return (
        <Fragment>
            <TextField
                placeholder={'Search Books...'}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
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

            {state === 'failed' ? (
                <Typography
                    variant={'subheading'}
                    style={{ color: 'red', marginTop: '1rem' }}
                >
                    Something failed!
                </Typography>
            ) : null}
        </Fragment>
    );
});

export const ResultsList = observer(({ store, style }) => {
    const { isEmpty, results, totalCount, state } = store;

    return (
        <Grid spacing={16} container style={style}>
            {isEmpty && state === 'completed' ? (
                <Grid item xs={12}>
                    <EmptyResults />
                </Grid>
            ) : null}

            {!isEmpty && state === 'completed' ? (
                <Grid item xs={12}>
                    <Typography>
                        Showing <strong>{results.length}</strong> of{' '}
                        {totalCount} results.
                    </Typography>
                    <Divider />
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
