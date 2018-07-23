import {
    autorun,
    observable,
    onBecomeObserved,
    onBecomeUnobserved,
} from 'mobx';
import { asComponent } from '../core/as-component';

export const BecomeObservedExample = asComponent(() => {
    const obj = observable.box(10);
    const cart = observable({
        items: [],
        totalPrice: 0,
    });

    onBecomeObserved(obj, () => {
        console.log('Started observing obj');
    });

    onBecomeUnobserved(obj, () => {
        console.log('Stopped observing obj');
    });

    // onBecomeObserved(cart.totalPrice, () => {
    //     console.log('Started observing cart.totalPrice');
    // });
    // Error: [mobx] Cannot obtain atom from 0

    onBecomeObserved(cart, 'totalPrice', () => {
        console.log('Started observing cart.totalPrice');
    });
    onBecomeUnobserved(cart, 'totalPrice', () => {
        console.log('Stopped observing cart.totalPrice');
    });

    const disposer = autorun(() => {
        console.log(obj.get(), `Cart total: ${cart.totalPrice}`);
    });
    setTimeout(disposer);

    obj.set(20);
    cart.totalPrice = 100;
});

/*
Console output:

Started observing obj
Started observing cart.totalPrice
10 "Cart total: 0"
20 "Cart total: 0"
20 "Cart total: 100"
Stopped observing cart.totalPrice
Stopped observing obj
 */
