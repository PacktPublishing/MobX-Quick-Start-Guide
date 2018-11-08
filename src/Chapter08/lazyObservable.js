import { lazyObservable } from 'mobx-utils';
import { observer } from 'mobx-react';

import React, { Fragment } from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';

class ExpensiveWorker {
    operation = null;

    constructor() {
        this.operation = lazyObservable(async sink => {
            sink(null);
            const result = await this.performOperation();
            sink(result);
        });
    }

    performOperation() {
        return new Promise(resolve => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                resolve('200 OK');
            }, 1000);
        });
    }
}

@observer
class LazyObservableExample extends React.Component {
    worker;

    constructor(props) {
        super(props);

        this.worker = new ExpensiveWorker();
    }

    render() {
        const { operation } = this.worker;
        const result = operation.current();
        if (!result) {
            return (
                <Fragment>
                    <CircularProgress size={50} color={'primary'} />
                    <Typography variant={'title'}>
                        Operation in Progress
                    </Typography>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Typography variant={'title'} color={'primary'}>
                    Operation completed with result: {result}
                </Typography>
                <Button
                    variant={'raised'}
                    color={'primary'}
                    onClick={() => operation.refresh()}
                >
                    Redo Operation
                </Button>
            </Fragment>
        );
    }
}

export { LazyObservableExample };
