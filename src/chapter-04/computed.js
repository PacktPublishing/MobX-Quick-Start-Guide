import { computed, decorate, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const ComputedDecoratorExample = asComponent(() => {
    // 1. Using @computed
    class Cart {
        @observable.shallow items = [];

        @computed
        get hasItems() {
            return this.items.length > 0;
        }
    }

    // 2. Using decorate()
    class Cart2 {
        items = [];

        get hasItems() {
            return this.items.length > 0;
        }
    }

    decorate(Cart2, {
        items: observable.shallow,
        hasItems: computed,
    });

    // 3. Using computed()
    const cart = new Cart();

    const isCartEmpty = computed(() => {
        return cart.items.length === 0;
    });

    const disposer = isCartEmpty.observe(change =>
        console.log(change.newValue),
    );

    console.log(isCartEmpty.get());
});
