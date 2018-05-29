import { action, observable, configure } from 'mobx';
import { asComponent } from '../core/as-component';

export const Chapter05AsyncAction = asComponent(() => {
    configure({ enforceActions: 'strict' });

    class ShoppingCart {
        @observable asyncState = '';

        @observable.shallow items = [];

        @action.bound
        async submit() {
            this.asyncState = 'pending';
            try {
                const response = await this.purchaseItems(this.items);

                this.asyncState = 'completed';
            } catch (ex) {
                console.error(ex);
                this.asyncState = 'failed';
            }
        }

        purchaseItems(items) {
            /* ... */
            return Promise.resolve({});
        }
    }

    const cart = new ShoppingCart();

    cart.submit();

    configure({ enforceActions: false });
});
