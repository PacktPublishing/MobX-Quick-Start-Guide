import { action, configure, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const AsyncActionExample = asComponent(() => {
    configure({ enforceActions: 'always' });

    class ShoppingCart {
        @observable asyncState = '';

        @observable.shallow items = [];

        @action.bound
        async submit() {
            this.asyncState = 'pending';
            try {
                const response = await this.purchaseItems(this.items);

                this.asyncState = 'completed';
                console.info('Completed');
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

    configure({ enforceActions: 'never' });
});
