import { observable, toJS } from 'mobx';
import { asComponent } from '../../core/as-component';

export const ObservableArrayExample = asComponent(() => {
    const items = observable.array(); // Start with empty array

    console.log(items.length); // Prints: 0

    items.push({
        name: 'hats',
        quantity: 40,
    });

    // Add one in the front
    items.unshift({ name: 'Ribbons', quantity: 2 });

    // Add at the back
    items.push({ name: 'balloons', quantity: 1 });

    console.log(items.length); // Prints: 3

    // Plain Array
    const plainArray = toJS(items);
    console.log(plainArray);
});
