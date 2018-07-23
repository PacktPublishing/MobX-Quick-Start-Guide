import { autorun, extendObservable, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const WhenToReactExample = asComponent(() => {
    const item = observable({
        name: 'Laptop',
        price: 999,
        quantity: 1,
    });

    // before
    autorun(() => {
        console.log(item);
    });

    // after
    autorun(() => {
        console.log(item.price);
    });

    item.name = 'A New Laptop';

    // before
    autorun(() => {
        setTimeout(() => {
            if (item.quantity > 10) {
                item.price = 899;
            }
        }, 500);
    });

    // after

    autorun(
        () => {
            if (item.quantity > 10) {
                item.price = 899;
            }
        },
        { delay: 500 },
    );

    // before
    autorun(() => {
        console.log(`Item Description: ${item.description}`);
    });

    extendObservable(item, {
        get description() {
            return `Only ${item.quantity} left at $${item.price}`;
        },
    });

    item.quantity = 10;
    // after
    // extendObservable(item, {
    //     get description() {
    //         return `Only ${item.quantity} left at $${item.price}`;
    //     },
    // });

    autorun(() => {
        console.log(`Item Description: ${item.description}`);
    });

    item.quantity = 10;

    // before/after
    const twitterUrls = observable.map({
        John: 'twitter.com/johnny',
    });

    autorun(() => {
        console.log(twitterUrls.get('Sara'));
    });
    twitterUrls.set('Sara', 'twitter.com/horsejs');
});
