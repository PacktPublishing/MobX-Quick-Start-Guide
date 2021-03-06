import { action, observable, when } from 'mobx';
import { asComponent } from '../../core/as-component';

export const WhenWithPromiseExample = asComponent(() => {
    class Inventory {
        @observable items = [];

        cancelTracker = null;

        async trackAvailability(name) {
            await when(() => {
                const item = this.items.find(x => x.name === name);
                return item ? item.quantity > 0 : false;
            });

            console.log(`${name} is now available`);
        }

        @action
        addItem(name, quantity) {
            const item = this.items.find(x => x.name === name);
            if (item) {
                item.quantity += quantity;
            } else {
                this.items.push({ name, quantity });
            }
        }
    }

    const inventory = new Inventory();

    inventory.addItem('Shoes', 0);
    inventory.trackAvailability('Shoes');

    inventory.addItem('Shoes', 2);
    inventory.addItem('Shoes', 1);
});
