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
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export class SearchTextField extends React.Component {
    render() {
        // trace(true);

        const { store, onChange } = this.props;
        const { term } = store;

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
                    onKeyUp={this.onKeyUp}
                />

                <SearchStatus />
            </Fragment>
        );
    }

    onKeyUp = event => {
        if (event.keyCode !== 13) {
            return;
        }

        this.props.onEnter();
    };
}

export const SearchStatus = inject('store')(
    observer(({ store }) => {
        const { status, term } = store;

        return (
            <Fragment>
                {status === 'pending' ? (
                    <LinearProgress variant={'query'} />
                ) : null}

                {status === 'failed' ? (
                    <Typography
                        variant={'subheading'}
                        style={{ color: 'red', marginTop: '1rem' }}
                    >
                        {`Failed to fetch results for "${term}"`}
                    </Typography>
                ) : null}
            </Fragment>
        );
    }),
);

// export const ResultsList = inject(({ store }) => ({ searchStore: store }))(
//     observer(({ searchStore, style }) => {
//         const { isEmpty, results, totalCount, status } = searchStore;
//         return (
//             <Grid spacing={16} container style={style}>
//                 {isEmpty && status === 'completed' ? (
//                     <Grid item xs={12}>
//                         <EmptyResults />
//                     </Grid>
//                 ) : null}
//
//                 {!isEmpty && status === 'completed' ? (
//                     <Grid item xs={12}>
//                         <Typography>
//                             Showing <strong>{results.length}</strong> of{' '}
//                             {totalCount} results.
//                         </Typography>
//                         <Divider />
//                     </Grid>
//                 ) : null}
//
//                 {results.map(x => (
//                     <Grid item xs={12} key={x.id}>
//                         <BookItem book={x} />
//                         <Divider />
//                     </Grid>
//                 ))}
//             </Grid>
//         );
//     }),
// );

@inject(({ store }) => ({ searchStore: store }))
@observer
export class ResultsList extends React.Component {
    render() {
        const { searchStore, style } = this.props;
        const { isEmpty, results, totalCount, status } = searchStore;

        return (
            <Grid spacing={16} container style={style}>
                {isEmpty && status === 'completed' ? (
                    <Grid item xs={12}>
                        <EmptyResults />
                    </Grid>
                ) : null}

                {!isEmpty && status === 'completed' ? (
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
    }
}

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
