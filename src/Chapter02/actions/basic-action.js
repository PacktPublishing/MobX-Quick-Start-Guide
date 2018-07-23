import { action, observable } from 'mobx';
import { asComponent } from '../../core/as-component';

export const BasicActionExample = asComponent(() => {
    const cart = observable({
        items: [],
        modified: new Date(),
    });

    // Create the actions
    const addItem = action((name, quantity) => {
        const item = cart.items.find(x => x.name === name);
        if (item) {
            item.quantity += 1;
        } else {
            cart.items.push({ name, quantity });
        }

        cart.modified = new Date();
    });

    const removeItem = action(name => {
        const item = cart.items.find(x => x.name === name);
        if (item) {
            item.quantity -= 1;

            if (item.quantity <= 0) {
                cart.items.remove(item);
            }

            cart.modified = new Date();
        }
    });

    // Invoke actions
    addItem('balloons', 2);
    addItem('paint', 2);
    removeItem('paint');
});
