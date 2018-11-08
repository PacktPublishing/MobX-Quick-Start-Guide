import { action, configure, observable, runInAction } from 'mobx';
import { asComponent } from '../core/as-component';

export const RunInActionExample = asComponent(() => {
    configure({ enforceActions: 'always' });

    class ShoppingCart {
        @observable
        asyncState = '';

        @observable.shallow
        items = [];

        @action
        async submit() {
            this.asyncState = 'pending';
            try {
                const response = await this.purchaseItems(this.items);

                runInAction(() => {
                    this.asyncState = 'completed';
                });
            } catch (ex) {
                console.error(ex);

                runInAction(() => {
                    this.asyncState = 'failed';
                });
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
