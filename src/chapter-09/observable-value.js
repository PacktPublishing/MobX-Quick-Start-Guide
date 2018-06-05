import { observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const ObservableValueExample = asComponent(() => {
    class ObservableValue {
        value;

        get() {
            /* ... */
            this.reportObserved();
        }

        set(value) {
            /* ... */
            this.reportChanged();
        }

        intercept(handler) {}

        observe(listener, fireImmediately) {}
    }

    // Creating an observable-value
    const count = observable.box(0);

    count.intercept(change => {
        console.log('Intercepted:', change);

        return change; // No change
        // Prints
        // Intercepted: {object: ObservableValue$$1, type: "update", newValue: 1}
        // Intercepted: {object: ObservableValue$$1, type: "update", newValue: 2}
    });

    count.observe(change => {
        console.log('Observed:', change);
        // Prints
        // Observed: {object: ObservableValue$$1, type: "update", newValue: 1}
        // Observed: {object: ObservableValue$$1, type: "update", newValue: 2, oldValue: 1}
    });

    // Increment
    count.set(count.get() + 1);

    count.set(count.get() + 1);
});
