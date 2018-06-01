import { computed, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const ComputedErrorExample = asComponent(() => {
    const x = observable.box(3);
    const y = observable.box(1);

    const divided = computed(() => {
        if (y.get() === 0) {
            throw new Error('Division by zero');
        }

        return x.get() / y.get();
    });

    divided.get(); // returns 3

    y.set(0); // OK

    try {
        divided.get(); // Throws: Division by zero
    } catch (ex) {
        // Recover to a safe state
        y.set(2);
    }

    divided.get(); // Recovered; Returns 1.5
});
