import { action, autorun, observable } from 'mobx';
import { asComponent } from '../../core/as-component';

export const AutorunExample = asComponent(() => {
    class Cart {
        @observable modified = new Date();
        @observable.shallow items = [];

        cancelAutorun = null;

        constructor() {
            this.cancelAutorun = autorun(() => {
                console.log(`Items in Cart: ${this.items.length}`);
            });
        }

        @action
        addItem(name, quantity) {
            this.items.push({ name, quantity });
            this.modified = new Date();
        }
    }

    const cart = new Cart();
    cart.addItem('Power Cable', 1);
    cart.addItem('Shoes', 1);

    cart.cancelAutorun();

    cart.addItem('Power Cable', 1);
    cart.addItem('Shoes', 1);

    // Prints:
    // Items in Cart: 0
    // Items in Cart: 1
    // Items in Cart: 2
});
