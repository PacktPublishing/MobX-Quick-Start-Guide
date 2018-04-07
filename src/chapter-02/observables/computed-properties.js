import { observable } from 'mobx';

const cart = observable.object({
    items: [],
    modified: new Date(),

    get description() {
        switch (this.items.length) {
            case 0:
                return 'There are no items in the cart';
            case 1:
                return 'There is one item in the cart';
            default:
                return `There are ${this.items.length} items in the cart`;
        }
    },
});

cart.items.push({ name: 'Shoes', quantity: 1 });
console.log(cart.description);
