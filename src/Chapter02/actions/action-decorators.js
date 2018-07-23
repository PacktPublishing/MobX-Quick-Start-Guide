import { action, observable } from 'mobx';
import { asComponent } from '../../core/as-component';

export const ActionDecoratorExample = asComponent(() => {
    class Cart {
        @observable modified = new Date();
        @observable.shallow items = [];

        @action
        addItem(name, quantity) {
            this.items.push({ name, quantity });
            this.modified = new Date();
        }

        @action.bound
        removeItem(name) {
            const item = this.items.find(x => x.name === name);
            if (item) {
                item.quantity -= 1;

                if (item.quantity <= 0) {
                    this.items.remove(item);
                }
            }
        }

        @action
        removeItem2 = name => {
            const item = this.items.find(x => x.name === name);
            if (item) {
                item.quantity -= 1;

                if (item.quantity <= 0) {
                    this.items.remove(item);
                }
            }
        };
    }
});
