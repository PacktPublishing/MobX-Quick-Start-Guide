import React, { Fragment } from 'react';
import { inject, Observer, observer } from 'mobx-react';
import {
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { CircularProgress, Divider, Grid } from '@material-ui/core/es/index';
import { OperationStatus } from './shared';

function CartItem({ item }) {
    return (
        <ListItem>
            <ListItemIcon>
                <item.icon
                    style={{
                        height: 64,
                        width: 64,
                    }}
                />
            </ListItemIcon>
            <ListItemText primary={item.title} secondary={`$${item.price}`} />
        </ListItem>
    );
}

@inject('store')
@observer
export class ShowCart extends React.Component {
    render() {
        const { step } = this.props.store;
        if (!step) {
            return null;
        }

        const { items, itemTotal, loadState, operationState, perform } = step;

        return (
            <Fragment>
                <Typography
                    variant={'headline'}
                    style={{ textAlign: 'center' }}
                >
                    Your Cart
                </Typography>

                <Observer>
                    {() => (
                        <OperationStatus
                            state={loadState}
                            render={() => (
                                <List>
                                    {items.map(item => (
                                        <CartItem
                                            key={item.title}
                                            item={item}
                                        />
                                    ))}

                                    <Divider />

                                    <ListItem>
                                        <ListItemIcon style={{ width: 64 }}>
                                            <Typography variant={'headline'}>
                                                Total
                                            </Typography>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`$${itemTotal}`}
                                        />
                                    </ListItem>
                                </List>
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
                                Checkout
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
