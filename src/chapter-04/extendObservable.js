import { action, extendObservable, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const ExtendObservableExample = asComponent(() => {
    const cart = observable({
        /* ... */
    });

    function applyFestiveOffer(cart) {
        extendObservable(
            cart,
            {
                coupons: ['OFF50FORU'],
                get hasCoupons() {
                    return this.coupons && this.coupons.length > 0;
                },
                addCoupon(coupon) {
                    this.coupons.push(coupon);
                },
            },
            {
                coupons: observable.shallow,
                addCoupon: action,
            },
        );
    }
});
