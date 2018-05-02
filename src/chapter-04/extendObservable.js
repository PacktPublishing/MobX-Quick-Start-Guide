import { observable, action, extendObservable } from 'mobx';

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
