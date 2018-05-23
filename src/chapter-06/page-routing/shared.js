import React, { Fragment } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { inject, observer, Observer } from 'mobx-react';

export function OperationStatus({ state, render }) {
    switch (state) {
        case 'pending':
            return <CircularProgress variant={'indeterminate'} />;

        case 'completed':
            return render();
        case 'failed':
            return <Typography color={'accent'}>Operation Failed</Typography>;
        default:
            return null;
    }
}

@inject('store')
@observer
export class StepComponent extends React.Component {
    static defaultProps = {
        title: 'Step Title',
        operationTitle: 'Operation',
    };

    render() {
        const { title, operationTitle } = this.props;
        const {
            step: { items, itemTotal, loadState, operationState, perform },
        } = this.props.store;

        return (
            <Fragment>
                <Typography
                    variant={'headline'}
                    style={{ textAlign: 'center' }}
                >
                    {title}
                </Typography>

                <Observer>
                    {() => (
                        <OperationStatus
                            state={loadState}
                            render={() => (
                                <Typography>Details of {title}</Typography>
                            )}
                        />
                    )}
                </Observer>

                <Grid justify={'center'} container>
                    <Observer>
                        {() => (
                            <Button
                                variant={'raised'}
                                color={'primary'}
                                disabled={operationState === 'pending'}
                                onClick={perform}
                            >
                                {operationTitle}
                                {operationState === 'pending' ? (
                                    <CircularProgress
                                        variant={'indeterminate'}
                                        size={20}
                                        style={{
                                            color: 'black',
                                            marginLeft: 10,
                                        }}
                                    />
                                ) : null}
                            </Button>
                        )}
                    </Observer>
                </Grid>
            </Fragment>
        );
    }
}
