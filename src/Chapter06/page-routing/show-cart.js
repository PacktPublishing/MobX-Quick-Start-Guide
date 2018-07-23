import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { TemplateStepComponent } from './shared';

export class ShowCart extends React.Component {
    render() {
        return (
            <TemplateStepComponent
                title={'Your Cart'}
                operationTitle={'Checkout'}
                renderDetails={step => {
                    const { items, itemTotal } = step;

                    return (
                        <List>
                            {items.map(item => (
                                <CartItem key={item.title} item={item} />
                            ))}

                            <Divider />

                            <TotalItem total={itemTotal} />
                        </List>
                    );
                }}
            />
        );
    }
}

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

function TotalItem({ total }) {
    return (
        <ListItem>
            <ListItemIcon style={{ width: 64 }}>
                <Typography variant={'headline'}>Total</Typography>
            </ListItemIcon>
            <ListItemText primary={`$${total}`} />
        </ListItem>
    );
}
