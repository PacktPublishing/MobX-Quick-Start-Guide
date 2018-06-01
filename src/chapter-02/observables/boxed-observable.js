import { observable } from 'mobx';
import { asComponent } from '../../core/as-component';

export const BoxedObservableExample = asComponent(() => {
    const count = observable.box(20);

    // Get the count
    console.log(`Count is ${count.get()}`);

    // Change count
    count.set(22);
});
