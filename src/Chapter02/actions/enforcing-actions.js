import { autorun, configure, observable } from 'mobx';
import { asComponent } from '../../core/as-component';

export const EnforcingActionsExample = asComponent(() => {
    configure({
        enforceActions: 'observed',
    });

    const cart = observable({
        items: [],
        modified: new Date(),
    });

    autorun(() => {
        console.log(cart.items, cart.modified);
    });

    // Modifying outside of an action
    // cart.items.push({ name: 'test', quantity: 1 });
    // cart.modified = new Date();

    configure({
        enforceActions: 'never',
    });
});
