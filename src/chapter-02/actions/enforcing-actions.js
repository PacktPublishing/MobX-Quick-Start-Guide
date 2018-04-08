import { configure, observable, autorun } from 'mobx';

configure({
    enforceActions: true,
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
