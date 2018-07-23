import { action, computed, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const ObservableDecorateExample = asComponent(() => {
    const cart = observable(
        {
            items: [],
            modified: new Date(),
            get hasItems() {
                return this.items.length > 0;
            },
            addItem(name, quantity) {
                /* ... */
            },
            removeItem(name) {
                /* ... */
            },
        },
        {
            items: observable.shallow,
            modified: observable,

            hasItems: computed,
            addItem: action.bound,
            removeItem: action.bound,
        },
    );
});
